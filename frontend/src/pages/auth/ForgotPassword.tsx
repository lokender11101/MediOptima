import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { KeyRound, CheckCircle2 } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export const ForgotPassword = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setServerError('');
    try {
      const response = await fetch('http://localhost:5001/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to request password reset');
      }
      
      setSuccess(true);
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-8 text-center animate-fade-in-up">
          <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="text-emerald-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Email Sent</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            If an account exists for that email, we have sent password reset instructions.
          </p>
          <Link to="/login" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-12 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-[2rem] overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="mx-auto bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border border-emerald-200 shadow-sm">
            <KeyRound className="text-emerald-600 w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Reset Password</h2>
          <p className="text-slate-500 dark:text-slate-400">Enter your email to receive a reset link</p>
        </div>
        
        <div className="p-8">
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email Address</label>
              <input 
                {...register('email')} 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-50 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-400"
                placeholder="name@example.com" 
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl mt-4 disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Remembered your password? <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
