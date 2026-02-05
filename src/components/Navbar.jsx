import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/home', label: 'Home' }, // <--- UPDATED THIS PATH
        { path: '/clinic', label: 'Clinic' },
        { path: '/menu', label: 'Menu' },
        { path: '/about', label: 'About Us' },
        { path: '/blog', label: 'Lab Journal' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-[#1a110d] text-[#f4ebd0] shadow-2xl px-6 h-20 flex justify-between items-center border-b-4 border-[#152238] texture-wood">
            {/* Logo Area - NOW POINTS TO /home */}
            <Link to="/home" className="flex items-center space-x-3 cursor-pointer group">
                <div className="bg-[#c05621] p-2 rounded-full border-2 border-[#f4ebd0] group-hover:rotate-12 transition-transform shadow-md flame-2">
                    <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-widest uppercase text-shadow-wood">Wich Doc</span>
                    <span className="text-[9px] text-[#f4ebd0]/80 uppercase tracking-[0.2em] leading-none">Bake Shop</span>
                </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8">
                {navLinks.map((link) => (
                    <Link 
                        key={link.path} 
                        to={link.path} 
                        className={`px-2 py-1 font-bold uppercase text-xs transition-colors tracking-widest border-b-2 ${
                            isActive(link.path) 
                            ? 'text-[#c05621] border-[#c05621] flame-1' 
                            : 'text-[#f4ebd0]/60 border-transparent hover:text-[#f4ebd0] hover:border-[#f4ebd0]/30'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-[#f4ebd0]">
                {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-[#1a110d] p-6 flex flex-col space-y-6 shadow-xl z-50 animate-in border-b-4 border-[#c05621]">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.path} 
                            to={link.path} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-left font-bold text-[#f4ebd0] uppercase py-2 border-b border-dashed border-[#f4ebd0]/20 tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-left font-bold text-[#f4ebd0] uppercase py-2 border-b border-dashed border-[#f4ebd0]/20 tracking-widest">
                        Links Page
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;