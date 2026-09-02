import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) navigate('/account', { replace: true });
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Please fill all required fields');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    signup(form);
    navigate('/account', { replace: true });
  };

  return (
    <div className="pt-24 pb-20 min-h-[80vh] flex items-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">Create Account</h1>
          <p className="text-charcoal/60 text-sm">Join Ethereal for exclusive saree collections</p>
        </motion.div>

        <div className="bg-white rounded-xl border border-gold-100 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-maroon-600 bg-maroon-50 px-3 py-2 rounded-lg">{error}</p>}
            <div>
              <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Full Name *</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Email *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Phone</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 4 characters" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal/60 mb-1.5">Confirm Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input type="password" name="confirm" value={form.confirm} onChange={handleChange} placeholder="Repeat password" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gold-200 text-sm focus:outline-none focus:border-gold-400" />
              </div>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-charcoal font-semibold py-3.5 rounded-full transition-colors">
              <UserPlus size={18} /> Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-charcoal/50 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
