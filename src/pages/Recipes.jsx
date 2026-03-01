import { useState } from 'react';
import { X, Clock, ChefHat, Beaker, ArrowRight } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import { memberRecipes } from '../data';

const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in text-left">
            <div className="bg-[#f4ebd0] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col border-4 border-[#1a110d] lantern-container">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-[#1a110d] hover:bg-[#c05621] rounded-full text-white transition-colors cursor-pointer">
                    <X size={24} />
                </button>

                {/* Modal image */}
                <div className="h-48 w-full bg-[#1a110d] shrink-0">
                    <SmartImage src={`/${recipe.image}`} alt={recipe.title} className="w-full h-full object-cover opacity-80" />
                </div>

                <div className="overflow-y-auto texture-burlap">
                    {/* Modal header */}
                    <div className="bg-[#152238] bg-denim-patch px-8 py-4 border-b-4 border-[#c05621]">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#c05621] uppercase tracking-widest flame-1">{recipe.category}</span>
                            <span className="text-[10px] text-[#f4ebd0]/50 uppercase tracking-widest">{recipe.difficulty}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-[#f4ebd0] font-serif">{recipe.title}</h2>
                        <p className="text-[#f4ebd0]/60 text-xs mt-1">{recipe.subtitle}</p>
                        <div className="flex gap-6 mt-3 text-[#f4ebd0]/70 text-xs">
                            <span><span className="text-[#c05621] font-bold">Active:</span> {recipe.activeTime}</span>
                            <span><span className="text-[#c05621] font-bold">Total:</span> {recipe.totalTime}</span>
                            <span><span className="text-[#c05621] font-bold">Yield:</span> {recipe.yield}</span>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Ingredients */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#152238] mb-4 flex items-center gap-2">
                                <Beaker size={12} className="text-[#c05621]" /> Compound Analysis
                            </h3>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ing, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#1a110d]">
                                        <span className="text-[#c05621] flame-2 shrink-0">—</span>
                                        <span className="font-serif">{ing}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Steps */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#152238] mb-4 flex items-center gap-2">
                                <ChefHat size={12} className="text-[#c05621]" /> Procedure
                            </h3>
                            <ol className="space-y-5">
                                {recipe.steps.map((step, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-[#1a110d] text-[#f4ebd0] flex items-center justify-center text-xs font-bold">{i + 1}</div>
                                        <div>
                                            <p className="text-xs font-bold text-[#c05621] uppercase tracking-widest mb-1 flame-1">{step.label}</p>
                                            <p className="text-sm text-[#1a110d] leading-relaxed font-serif">{step.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Chef's note */}
                        {recipe.notes && (
                            <div className="border-l-4 border-[#c05621] pl-5 py-1">
                                <p className="text-xs font-bold text-[#c05621] uppercase tracking-widest mb-2 flame-2">Chef's Note</p>
                                <p className="text-sm italic text-stone-600 font-serif">"{recipe.notes}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Recipes = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return (
        <div className="max-w-4xl mx-auto p-12 text-center space-y-12 animate-in texture-burlap min-h-screen">
            <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />

            <div>
                <h2 className="text-4xl font-bold text-[#1a110d] mb-2">The Rx Vault</h2>
                <p className="text-[#c05621] font-mono text-xs uppercase tracking-widest flame-1">Member-Exclusive Formulas</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {memberRecipes.map(recipe => (
                    <div
                        key={recipe.id}
                        onClick={() => setSelectedRecipe(recipe)}
                        className="bg-white border-2 border-[#1a110d] p-2 hover:shadow-xl transition-all cursor-pointer group text-left"
                    >
                        <div className="border border-dashed border-[#1a110d]/30 overflow-hidden">
                            {/* Card image */}
                            <div className="h-40 bg-stone-200 relative">
                                <div className="absolute top-0 left-0 bg-[#c05621] text-white text-[10px] font-bold px-2 py-1 z-10 flame-2">{recipe.category}</div>
                                <SmartImage src={`/${recipe.image}`} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>

                            {/* Card body */}
                            <div className="p-5">
                                <p className="text-[10px] font-bold text-[#1a110d]/40 uppercase tracking-widest mb-1">{recipe.difficulty}</p>
                                <h3 className="text-lg font-serif font-bold text-[#1a110d] mb-1 group-hover:text-[#c05621] transition-colors">{recipe.title}</h3>
                                <p className="text-xs text-stone-500 mb-4">{recipe.subtitle}</p>
                                <div className="flex items-center gap-3 text-[10px] text-[#1a110d]/50 mb-4">
                                    <span className="flex items-center gap-1"><Clock size={10} /> {recipe.activeTime} active</span>
                                    <span>·</span>
                                    <span>Yields: {recipe.yield}</span>
                                </div>
                                <span className="text-[#c05621] font-bold text-xs uppercase tracking-wide flex items-center gap-2 flame-3">
                                    View Formula <ArrowRight size={12} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
