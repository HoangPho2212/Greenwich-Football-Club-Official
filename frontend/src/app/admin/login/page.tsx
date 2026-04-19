"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Lock, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { password });
      if (res.data.success) {
        localStorage.setItem('admin_token', res.data.token);
        router.push('/admin');
      }
    } catch (err: any) {
      setError('Incorrect password. Access Denied.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-10 rounded-[40px] border border-white/10 shadow-2xl space-y-8"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-12">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Command Center</h1>
            <p className="text-blue-300 text-sm font-bold uppercase tracking-widest">Authorized Access Only</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-blue-300 group-focus-within:text-white transition-colors">
                <Lock size={20} />
              </div>
              <input 
                type="password" 
                placeholder="Enter Secret Password" 
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 text-white font-bold placeholder:text-white/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-400 text-xs font-bold text-center animate-shake">{error}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
          >
            {isLoading ? 'AUTHENTICATING...' : 'ENTER CONTROL PANEL'}
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pt-4 text-center">
            <a href="/" className="text-white/30 hover:text-white/60 text-xs font-bold uppercase tracking-widest transition-colors">Back to Public Site</a>
        </div>
      </motion.div>
    </div>
  );
}
