import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ChefHat, Lock, User, Mail } from 'lucide-react';
import { useAuth } from '../context/Authcontext';

const friendlyError = (code) => {
    const map = {
        'auth/email-already-in-use': 'An account with that email already exists.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/user-not-found': 'No account found with that email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/invalid-credential': 'Invalid email or password.',
    };
    return map[code] || 'Something went wrong. Please try again.';
};

const Portal = () => {
    const [mode, setMode] = useState('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { user, signIn, signUp } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/dashboard" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            if (mode === 'signup') {
                await signUp(name, email, password);
            } else {
                await signIn(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(friendlyError(err.code));
        } finally {
            setSubmitting(false);
        }
    };

    const switchMode = (next) => {
        setMode(next);
        setError('');
    };

    return (
        <div className="min-h-screen bg-[#1a110d] texture-wood flex flex-col items-center justify-center p-4 animate-in">
            <div className="max-w-md w-full relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex flex-col items-center gap-2">
                        <div className="bg-[#c05621] p-3 rounded-full border-2 border-[#f4ebd0] shadow-md flame-2">
                            <ChefHat className="h-7 w-7 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-widest uppercase text-[#f4ebd0] text-shadow-wood">Wich Doc</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-[#f4ebd0] rounded-3xl border-4 border-[#1a110d] shadow-2xl overflow-hidden lantern-container">
                    {/* Card header */}
                    <div className="bg-[#152238] bg-denim-patch px-8 py-5 border-b-4 border-[#c05621] text-center">
                        <h1 className="text-[#f4ebd0] font-bold uppercase tracking-widest text-sm">Patient Portal</h1>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b-2 border-[#1a110d]/20">
                        <button
                            onClick={() => switchMode('signin')}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${mode === 'signin' ? 'bg-[#c05621] text-white' : 'text-[#1a110d]/60 hover:text-[#1a110d]'}`}
                        >Sign In</button>
                        <button
                            onClick={() => switchMode('signup')}
                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${mode === 'signup' ? 'bg-[#c05621] text-white' : 'text-[#1a110d]/60 hover:text-[#1a110d]'}`}
                        >Sign Up</button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-4">
                        {mode === 'signup' && (
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1a110d]/60 mb-1">Full Name</label>
                                <div className="relative">
                                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a110d]/40" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        placeholder="Your name"
                                        className="w-full pl-9 pr-4 py-3 bg-white border-2 border-[#1a110d]/20 rounded text-[#1a110d] text-sm focus:outline-none focus:border-[#c05621] font-serif"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1a110d]/60 mb-1">Email</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a110d]/40" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-9 pr-4 py-3 bg-white border-2 border-[#1a110d]/20 rounded text-[#1a110d] text-sm focus:outline-none focus:border-[#c05621] font-serif"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1a110d]/60 mb-1">Password</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a110d]/40" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-9 pr-4 py-3 bg-white border-2 border-[#1a110d]/20 rounded text-[#1a110d] text-sm focus:outline-none focus:border-[#c05621] font-serif"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-700 text-xs font-bold bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-[#c05621] text-white font-bold uppercase tracking-widest text-sm rounded hover:bg-[#a84615] transition-colors flame-2 disabled:opacity-60 cursor-pointer"
                        >
                            {submitting ? 'One moment...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
                        </button>
                    </form>

                    <div className="px-8 pb-8 text-center">
                        <Link to="/home" className="text-[10px] text-[#1a110d]/40 uppercase tracking-widest hover:text-[#1a110d]/60 transition-colors">
                            ← Back to site
                        </Link>
                    </div>
                </div>

                <p className="text-[#f4ebd0]/30 text-[10px] mt-6 text-center">Est. 2026 • Parksville, BC</p>
            </div>
        </div>
    );
};

export default Portal;
