import { ChefHat } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1a110d] text-[#f4ebd0]/40 py-12 text-center border-t-8 border-[#152238] texture-wood mt-auto">
            <ChefHat className="mx-auto mb-4 opacity-20" />
            <p className="text-[10px] uppercase tracking-[0.3em]">© 2026 Wich Doc Bake Shop. AI Protocol Secured.</p>
        </footer>
    );
};

export default Footer;