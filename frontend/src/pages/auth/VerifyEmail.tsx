import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const hasAttempted = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }

    if (hasAttempted.current) return;
    hasAttempted.current = true;

    const verify = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/auth/verifyemail/${token}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || 'Verification failed');
        }
        
        setStatus('success');
        setMessage(data.message);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl p-8 text-center">
        
        {status === 'loading' && (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Verifying Email...</h2>
            <p className="text-slate-500 dark:text-slate-400">Please wait while we confirm your token.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="text-emerald-600 w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Email Verified!</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">{message}</p>
            <Link to="/login" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
              Continue to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <XCircle className="text-red-500 w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">Verification Failed</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">{message}</p>
            <Link to="/register" className="px-8 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-bold transition-colors shadow-sm">
              Back to Sign Up
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
