import { Link } from 'react-router-dom';
import { ChefHat, Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = ({ onOpenSidebar }) => {
    const { itemCount, setCartOpen } = useCart();

    return (
        <header className="fixed top-0 left-0 right-0 h-16 z-30 bg-[#1a110d] texture-wood border-b-4 border-[#152238] flex items-center justify-between px-4">
            {/* Left: hamburger */}
            <button
                onClick={onOpenSidebar}
                className="p-2.5 text-[#f4ebd0]/60 hover:text-[#f4ebd0] hover:bg-[#f4ebd0]/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Open menu"
            >
                <Menu size={22} />
            </button>

            {/* Center: logo */}
            <Link to="/home" className="flex items-center gap-2.5 group absolute left-1/2 -translate-x-1/2">
                <div className="bg-[#c05621] p-1.5 rounded-full border-2 border-[#f4ebd0]/20 group-hover:rotate-12 transition-transform flame-2">
                    <ChefHat className="h-4 w-4 text-white" />
                </div>
                <div className="leading-none">
                    <span className="text-sm font-bold tracking-widest uppercase text-[#f4ebd0] block">Wich Doc</span>
                    <span className="text-[8px] text-[#f4ebd0]/40 uppercase tracking-[0.2em]">Bake Shop</span>
                </div>
            </Link>

            {/* Right: cart icon */}
            <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 text-[#f4ebd0]/60 hover:text-[#f4ebd0] hover:bg-[#f4ebd0]/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Open cart"
            >
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#c05621] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 flame-2">
                        {itemCount}
                    </span>
                )}
            </button>
        </header>
    );
};

export default Header;
