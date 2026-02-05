import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import { menuData } from '../data';

const Menu = () => {
    const [activeCategory, setActiveCategory] = useState('sandwiches');

    const categoryImageMap = {
        sandwiches: '/sandwich1.png',
        sides: '/sides1.png',
        desserts: '/dessert1.png',
        breads: '/bread1.png'
    };

    const currentImage = categoryImageMap[activeCategory];
    // Example logic: Only show "Coming Soon" if you want to restrict specific categories
    // For now, let's assume all categories are available, or uncomment below if needed:
    // const isComingSoon = activeCategory === 'sandwiches'; 
    const isComingSoon = false;

    return (
        <section className="py-20 px-4 max-w-5xl mx-auto animate-in texture-burlap min-h-screen">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-[#1a110d]">The Prescriptions</h2>
                <p className="text-[#c05621] mt-2 font-bold uppercase tracking-widest text-sm flame-3">Compounded Daily</p>
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {['sandwiches', 'sides', 'desserts', 'breads'].map((cat) => (
                    <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)} 
                        className={`px-6 py-3 rounded-full font-bold capitalize transition-all border-2 ${
                            activeCategory === cat 
                            ? 'bg-[#152238] text-white border-[#152238] shadow-lg flame-2' 
                            : 'bg-transparent text-[#1a110d] border-[#1a110d] hover:bg-[#1a110d] hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {isComingSoon && (
                <div className="bg-[#c05621] text-white p-4 rounded mb-12 text-center font-bold tracking-widest flex items-center justify-center gap-4 uppercase border-2 border-white/20 flame-1 shadow-lg">
                    <AlertTriangle /> COMING SOON: BRICK & MORTAR EXCLUSIVE <AlertTriangle />
                </div>
            )}

            {/* Menu Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {menuData[activeCategory].map((item, index) => (
                    <div key={index} className="bg-white p-6 shadow-md border-2 border-[#1a110d]/10 group relative hover:shadow-xl transition-shadow">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#c05621] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-[#1a110d] font-serif">{item.name}</h3>
                                <p className="text-[#c05621] font-bold text-xs uppercase tracking-wide animate-flame">{item.subtitle}</p>
                            </div>
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed border-t border-dashed border-[#1a110d]/20 pt-2 mt-2">
                            {item.description}
                        </p>
                        <div className="mt-4 flex justify-end">
                            <span className="text-[10px] bg-[#1a110d] text-[#f4ebd0] px-2 py-1 uppercase tracking-widest font-bold">
                                {item.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Visual Evidence Section */}
            <div className="mt-12 flex justify-center">
                <div className="w-full max-w-2xl text-center">
                    <h3 className="font-bold text-[#1a110d] uppercase tracking-widest text-xs mb-6 flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-[#1a110d]/30"></span>
                        Visual Evidence
                        <span className="h-px w-12 bg-[#1a110d]/30"></span>
                    </h3>
                    <div className="aspect-video p-2 bg-white border-2 border-[#152238] shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <SmartImage src={currentImage} alt={`${activeCategory} example`} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Menu;