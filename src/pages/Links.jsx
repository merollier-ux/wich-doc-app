import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Lock } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import { SOCIALS } from '../data';

const Links = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#1a110d] texture-wood flex flex-col items-center justify-center p-4 animate-in">
            <div className="max-w-md w-full text-center space-y-10 relative z-10">
                {/* Logo Container */}
                <div className="w-40 h-40 bg-[#f4ebd0] rounded-3xl flex items-center justify-center border-4 border-[#c05621] mx-auto overflow-hidden shadow-2xl relative lantern-container">
                    <SmartImage src="/logo.png" alt="The Wich Doc Logo" className="w-full h-full object-cover" lazy={false} />
                </div>
                
                {/* Text Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-[#f4ebd0] tracking-widest uppercase font-serif text-shadow-wood">The 'Wich Doc</h1>
                    <div className="flex items-center justify-center gap-3">
                        <span className="h-px w-8 bg-[#c05621]"></span>
                        <p className="text-[#c05621] font-bold text-xs uppercase tracking-[0.2em] flame-1">Patient Portal</p>
                        <span className="h-px w-8 bg-[#c05621]"></span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-4 pt-4">
                    <button onClick={() => navigate('/home')} className="block w-full py-5 bg-[#c05621] text-white rounded font-bold text-xl hover:bg-[#a84615] transition-all shadow-lg tracking-widest uppercase border-2 border-[#fff]/20 flame-2 cursor-pointer">
                        ENTER SITE
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <a href={SOCIALS.ig} target="_blank" rel="noreferrer" className="py-4 bg-[#f4ebd0]/10 text-[#f4ebd0] rounded font-bold hover:bg-[#f4ebd0]/20 transition-all border-2 border-dashed border-[#f4ebd0]/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                            <Instagram size={16} /> Instagram
                        </a>
                        <a href={SOCIALS.fb} target="_blank" rel="noreferrer" className="py-4 bg-[#f4ebd0]/10 text-[#f4ebd0] rounded font-bold hover:bg-[#f4ebd0]/20 transition-all border-2 border-dashed border-[#f4ebd0]/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                            <Facebook size={16} /> Facebook
                        </a>
                    </div>

                    <div className="pt-8">
                        <a href={`mailto:${SOCIALS.email}`} className="block w-full py-5 bg-[#152238] text-[#f4ebd0] rounded font-bold hover:bg-[#1e293b] transition-all shadow-md border-t-4 border-[#1a110d] uppercase tracking-widest text-sm flex items-center justify-center gap-2 bg-denim-patch flame-3 cursor-pointer">
                            <Lock size={16} /> Order Securely
                        </a>
                    </div>
                </div>
                
                <p className="text-[#f4ebd0]/30 text-[10px] mt-8">Est. 2026 • Parksville, BC</p>
            </div>
        </div>
    );
};

export default Links;