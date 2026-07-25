import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle2, User, Building2 } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['patient', 'pharmacy', 'admin'])
});

type FormData = z.infer<typeof schema>;

export const Register = () => {
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'patient'
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setServerError('');
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to register');
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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Check Your Email</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            We've sent a verification link to your email address. Please verify your account before logging in.
          </p>
          <Link to="/login" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
            Go to Login
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
            <Activity className="text-emerald-600 w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Create Account</h2>
          <p className="text-slate-500 dark:text-slate-400">Join MediOptima as a patient or partner</p>
        </div>
        
        <div className="p-8">
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                type="button"
                onClick={() => setValue('role', 'patient')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${selectedRole === 'patient' ? 'bg-emerald-50 border-emerald-500 shadow-inner' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700'}`}
              >
                <User className={`w-6 h-6 ${selectedRole === 'patient' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-bold ${selectedRole === 'patient' ? 'text-emerald-700' : 'text-slate-500 dark:text-slate-400'}`}>Patient</span>
              </button>
              <button 
                type="button"
                onClick={() => setValue('role', 'pharmacy')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${selectedRole === 'pharmacy' ? 'bg-teal-50 border-teal-500 shadow-inner' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700'}`}
              >
                <Building2 className={`w-6 h-6 ${selectedRole === 'pharmacy' ? 'text-teal-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-bold ${selectedRole === 'pharmacy' ? 'text-teal-700' : 'text-slate-500 dark:text-slate-400'}`}>Pharmacy</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name</label>
              <input 
                {...register('name')} 
                className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 transition-all placeholder-slate-400 ${selectedRole === 'pharmacy' ? 'focus:border-teal-500 focus:ring-teal-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`}
                placeholder={selectedRole === 'pharmacy' ? 'Pharmacy Name' : 'John Doe'} 
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email Address</label>
              <input 
                {...register('email')} 
                className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 transition-all placeholder-slate-400 ${selectedRole === 'pharmacy' ? 'focus:border-teal-500 focus:ring-teal-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`}
                placeholder="name@example.com" 
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
              <input 
                type="password" 
                {...register('password')} 
                className={`w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-1 transition-all placeholder-slate-400 ${selectedRole === 'pharmacy' ? 'focus:border-teal-500 focus:ring-teal-500' : 'focus:border-emerald-500 focus:ring-emerald-500'}`}
                placeholder="••••••••" 
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl ${
                selectedRole === 'pharmacy' 
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500'
              } disabled:opacity-50 mt-4`}
            >
              {isLoading ? 'Creating account...' : `Sign Up as ${selectedRole === 'pharmacy' ? 'Partner' : 'Patient'}`}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
