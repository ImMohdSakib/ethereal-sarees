import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) navigate('/account', { replace: true });
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    login(email, password);
    navigate(from, { replace: true });
  };

  return (
    <div className="pt-24 pb-20 min-h-[80vh] flex items-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Welcome Back</h1>
          <p className="text-charcoal/60 text-sm">Sign in to view orders, wishlist and more</p>
        </motion.div>

        <div className="bg-white rounded-xl border border-gold-100 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-maroon-600 bg-maroon-50 px-3 py-2 rounded-lg">{error}</p>}
            <div>
              <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold py-3.5 rounded-full transition-colors"
            >
              <LogIn size={18} /> Sign In
            </button>
          </form>
          <p className="text-center text-sm text-charcoal/50 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-gold-600 font-medium hover:underline">
              Create one
            </Link>
          </p>
          <p className="text-center text-xs text-charcoal/40 mt-3">Demo: any email + password (4+ chars)</p>
        </div>
      </div>
    </div>
  );
}
