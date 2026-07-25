import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { query } from '../config/db';
import { sendEmail } from '../utils/email';

const generateToken = (id: number, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  });
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide name, email, and password' });
    }

    // Check if user exists
    const userExists = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const assignedRole = (role === 'pharmacy' || role === 'admin') ? role : 'patient';

    // Insert user
    const result = await query(
      'INSERT INTO users (name, email, password_hash, role, verification_token) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, passwordHash, assignedRole, verificationToken]
    );

    const user = result.rows[0];

    // Send verification email
    const frontendVerifyUrl = `http://localhost:5173/verify-email?token=${verificationToken}`; // Adjust for frontend
    
    const message = `Please verify your email by clicking the link: \n\n ${frontendVerifyUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'MediOptima - Email Verification',
        message
      });
      return res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
    } catch (err) {
      console.error('Email send error:', err);
      // In a real app we might reset the token or leave it, for now just log it.
      return res.status(500).json({ error: 'Email could not be sent' });
    }

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Server error during registration' });
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.params.token;
    
    const result = await query('SELECT id FROM users WHERE verification_token = $1', [token]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    const userId = result.rows[0].id;
    await query('UPDATE users SET is_verified = true, verification_token = NULL WHERE id = $1', [userId]);

    return res.status(200).json({ message: 'Email successfully verified. You may now log in.' });
  } catch (error) {
    console.error('Verify error:', error);
    return res.status(500).json({ error: 'Server error during verification' });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.is_verified) {
      return res.status(403).json({ error: 'Please verify your email before logging in' });
    }

    const token = generateToken(user.id, user.role);

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        pharmacy_id: user.pharmacy_id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email } = req.body;
    
    const result = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'There is no user with that email' });
    }

    const user = result.rows[0];
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hash token to save in DB for security
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Token expires in 10 minutes
    const expires = new Date(Date.now() + 10 * 60 * 1000); 
    
    await query(
      'UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id = $3',
      [resetTokenHash, expires, user.id]
    );

    const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: email,
        subject: 'MediOptima - Password Reset Token',
        message
      });
      return res.status(200).json({ message: 'Email sent' });
    } catch (err) {
      await query('UPDATE users SET reset_password_token = NULL, reset_password_expires = NULL WHERE id = $1', [user.id]);
      return res.status(500).json({ error: 'Email could not be sent' });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ error: 'Server error during forgot password' });
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const resetToken = req.params.token;
    const resetTokenHash = crypto.createHash('sha256').update(resetToken as string).digest('hex');
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Please provide a new password' });
    }

    const result = await query(
      'SELECT id FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()',
      [resetTokenHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const userId = result.rows[0].id;

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await query(
      'UPDATE users SET password_hash = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE id = $2',
      [passwordHash, userId]
    );

    return res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ error: 'Server error during password reset' });
  }
};
