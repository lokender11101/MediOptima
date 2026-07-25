import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: any) {
    const exists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new BadRequestException('User already exists');

    const password_hash = await argon2.hash(data.password);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password_hash,
        role: data.role || 'CUSTOMER'
      }
    });
    
    return { message: 'Registration successful' };
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await argon2.verify(user.password_hash, data.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, role: user.role };
    
    // Short lived access token (e.g., 15m)
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    
    // Long lived refresh token (e.g., 7d)
    const refreshTokenString = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token: refreshTokenString,
        user_id: user.id,
        expires_at: expiresAt
      }
    });

    return {
      accessToken,
      refreshToken: refreshTokenString,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  async refresh(token: string) {
    const rt = await this.prisma.refreshToken.findUnique({ where: { token } });
    if (!rt || rt.is_revoked || rt.expires_at < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({ where: { id: rt.user_id } });
    if (!user) throw new UnauthorizedException('User not found');

    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return { accessToken };
  }

  async logout(token: string) {
    await this.prisma.refreshToken.update({
      where: { token },
      data: { is_revoked: true }
    }).catch(() => {}); // Ignore if already deleted/revoked
    return { message: 'Logged out successfully' };
  }
}
