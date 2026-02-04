import React, { useState, useEffect } from 'react';
import { 
  Menu, MapPin, Clock, Instagram, Facebook, ChefHat, 
  Activity, Stethoscope, Sparkles, Loader, FlaskConical, 
  TestTube, Camera, BookOpen, Lock, X, ArrowRight, Utensils, 
  Wheat, Mail, AlertTriangle, Image 
} from 'lucide-react';

// --- CONFIGURATION ---
const getApiKey = () => {
  try {
    return import.meta.env.VITE_GOOGLE_API_KEY || "AIzaSyB4cHFBRbzHal5VcttxJBjYepuQcxhLHro";
  } catch (e) {
    return "AIzaSyB4cHFBRbzHal5VcttxJBjYepuQcxhLHro";
  }
};
const apiKey = getApiKey();

// --- GLOBAL DATA ---
const SOCIALS = {
  ig: "https://www.instagram.com/wichdocbakeshop/",
  fb: "https://www.facebook.com/profile.php?id=100088206555550",
  email: "chef@wichdocbakeshop.ca"
};

const MENU_DATA = {
  sandwiches: [
      {
          name: "The Coastal Remedy",
          subtitle: "West Coast Smoked Salmon Melt",
          description: "House-smoked sockeye salmon with sweet caramelized onion jam, jalapeno havarti, and whipped mascarpone, all grilled on thick slices of The Doc's Farmers Loaf. Served with house made ketchup.",
          tag: "Bestseller"
      },
      {
          name: "The Adrenaline Shot",
          subtitle: "Hot Honey Fried Chicken",
          description: "A spice-marinated fried chicken tender on a cheesy house-made milk bun, topped with a vibrant creamy herb slaw and a drizzle of house-fermented whiskey hot honey with crisp bread and butter pickles.",
          tag: "Spicy"
      },
      {
          name: "The Vital Transfusion",
          subtitle: "Herb & Feta Stuffed Arayes",
          description: "AAA ground beef, feta, and fresh herbs in crispy grilled pitas. Served with Muahmmara and tomato salad.",
          tag: "Chef's Choice"
      },
      {
          name: "The Parm-a-medic",
          subtitle: "The Eggplant Parmesan",
          description: "Crispy fried eggplant on house focaccia with Doc's tomato sauce, sweet peppers, Havarti, and roasted garlic aioli.",
          tag: "Vegetarian"
      }
  ],
  sides: [
      { name: "Roasted Tomato Soup", subtitle: "Velvety & Slow-Roasted", description: "Fennel-infused tomato soup with house croutons.", tag: "Comfort" },
      { name: "Fried Pickle Chips", subtitle: "Crispy & Tangy", description: "Deli-cut chips with house dill ranch.", tag: "Sharable" },
      { name: "Caesar Potatoes", subtitle: "Warning: Habit Forming", description: "Fried new potatoes tossed in Caesar dressing, bacon, and Parm.", tag: "Must Try" }
  ],
  desserts: [
      { name: "The Local Anesthetic", subtitle: "Nanaimo Bar Cheesecake", description: "Dark cocoa crumb, custard mousse, and semi-sweet ganache in a jar.", tag: "Local Fav" },
      { name: "The Midnight Shift", subtitle: "Banoffee Mini Loaf", description: "Chocolate chip loaf with molten dulce de leche and candied walnuts.", tag: "Decadent" }
  ],
  breads: [
      { name: "Garlic & Za'atar Focaccia", subtitle: "Italian Flatbread", description: "Dimpled dough with caramelized onions and roasted garlic.", tag: "Fresh" },
      { name: "Doc's Farmers Loaf", subtitle: "Signature Sourdough", description: "Thick crust, airy crumb. Six-fold mixing technique.", tag: "Artisan" },
      { name: "Cheesy Milk Buns (4-Pack)", subtitle: "Hokkaido Style", description: "Incredibly fluffy rolls enriched with cream and cheddar.", tag: "Kids Choice" }
  ]
};

const INITIAL_BLOG_POSTS = [
  { id: 1, title: "The Alchemy of Wild Yeast", category: "Science", excerpt: "Wild yeast is an ecosystem. Our starter is a living member of the team.", date: "Oct 12, 2025", image: "blog1.png", content: "At The 'Wich Doc, we don't buy yeast by the pound; we cultivate it by the hour. Our sourdough starter, nicknamed 'The Patient Zero,' is a complex colony of wild bacteria and yeast harvested right here in Parksville. This slow fermentation process doesn't just provide rise; it predigests the gluten, creating a loaf that is easier on the gut and richer in micronutrients." },
  { id: 2, title: "Why We Smoke Our Own Salmon", category: "Ingredients", excerpt: "The difference between pre-packaged and house-smoked is the difference between a photocopy and a painting.", date: "Oct 28, 2025", image: "blog2.png", content: "When we developed the 'Coastal Remedy,' we knew standard lox wouldn't suffice. We began experimenting with cold-smoking techniques using maple wood from the island. By controlling the temperature to stay below 80°F, we preserve the delicate omega-3 fatty acids while infusing a deep, smoky resonance." },
  { id: 3, title: "The Salami Discovery", category: "Procedures", excerpt: "Why our cold-cut selection is more than just a sandwich filler.", date: "Nov 15, 2025", image: "blog3.png", content: "Building the perfect salami profile requires more than just meat and salt; it requires patience and a specific island humidity. We've been analyzing the drying rates of our locally sourced pork to ensure every 'prescription' has the exact snap and salt content needed to spike your dopamine levels." }
];

// --- SECURED AI LOGIC ---
const callGemini = async (prompt) => {
  if (!apiKey || apiKey === "") {
      await new Promise(r => setTimeout(r, 1000));
      return JSON.stringify({
          dishName: "The Placebo Effect",
          diagnosis: "Acute Hunger Pangs",
          reason: "You seem hungry. This sandwich is imaginary but delicious.",
          dosage: "One large bite."
      });
  }

  const attempts = [
      { version: 'v1beta', model: 'gemini-1.5-flash' }, 
      { version: 'v1beta', model: 'gemini-pro' }
  ];

  let lastError = null;
  for (const attempt of attempts) {
      try {
          const response = await fetch(
              `https://generativelanguage.googleapis.com/${attempt.version}/models/${attempt.model}:generateContent?key=${apiKey}`,
              {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
              }
          );
          const data = await response.json();
          if (response.ok) return data.candidates[0].content.parts[0].text;
          lastError = new Error(`Model ${attempt.model} error: ${data.error?.message}`);
      } catch (e) {
          lastError = e;
      }
  }
  throw lastError || new Error("Connection failed across all endpoints.");
};

// --- SUB-COMPONENTS ---

// Robust SmartImage that hunts for the correct file extension and case
const SmartImage = ({ src, alt, className, lazy = true }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [error, setError] = useState(false);
  
  // Variations to try in sequence if the initial load fails
  // This covers lowercase, uppercase, and alternative formats
  const variations = ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.webp'];

  useEffect(() => {
    setCurrentSrc(src);
    setAttemptIndex(0);
    setError(false);
  }, [src]);

  const handleError = () => {
    // Get the base filename without extension
    const baseName = src.includes('.') ? src.substring(0, src.lastIndexOf('.')) : src;
    
    // Check if we have more variations to try
    if (attemptIndex < variations.length) {
      let nextExt = variations[attemptIndex];
      let nextSrc = `${baseName}${nextExt}`;

      // If the variation matches what we just tried, skip to the next one immediately
      // This prevents the component from "giving up" if the first guess was wrong
      let loopIndex = attemptIndex;
      while (nextSrc === currentSrc && loopIndex < variations.length - 1) {
          loopIndex++;
          nextExt = variations[loopIndex];
          nextSrc = `${baseName}${nextExt}`;
      }
      
      // Update state to trigger a re-render with the new source
      if (nextSrc !== currentSrc) {
        setCurrentSrc(nextSrc);
        setAttemptIndex(loopIndex + 1);
      } else {
        setError(true); // No more unique variations
      }
    } else {
      setError(true); // Exhausted all options
    }
  };
  
  if (error) {
      return (
          <div className={`flex flex-col items-center justify-center bg-paper text-wood-dark p-4 text-center border-2 border-dashed border-wood-dark/20 ${className}`}>
              <Image className="opacity-50 mb-2" />
              <p className="font-bold text-[10px] uppercase tracking-widest">Image Missing</p>
              <p className="font-mono text-[8px] mt-1 opacity-70 break-all">{src}</p>
          </div>
      );
  }
  
  // Ensure we are referencing root for public assets
  const finalSrc = currentSrc.startsWith('http') || currentSrc.startsWith('/') 
    ? currentSrc 
    : `/${currentSrc}`;

  return <img src={finalSrc} alt={alt} className={className} loading={lazy ? "lazy" : "eager"} onError={handleError} />;
};

const BlogModal = ({ post, onClose }) => {
  if (!post) return null;
  return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300 text-left">
          <div className="bg-paper rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col border-4 border-wood-dark lantern-container">
              <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-wood-dark hover:bg-toast rounded-full text-white transition-colors">
                  <X size={24} />
              </button>
              <div className="h-64 w-full bg-wood-dark">
                  <SmartImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 overflow-y-auto texture-burlap">
                  <div className="flex justify-between items-center mb-4 border-b border-wood-dark/20 pb-2">
                      <span className="text-xs font-bold text-toast uppercase tracking-widest">{post.category}</span>
                      <span className="text-xs text-wood-dark/60 font-mono">{post.date}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-wood-dark mb-6 font-display">{post.title}</h2>
                  <p className="text-wood-dark leading-relaxed text-lg font-serif">{post.content}</p>
              </div>
          </div>
      </div>
  );
};

// --- SECTIONS ---

const TriageSection = ({ symptomInput, setSymptomInput, handleConsultation, isDiagnosing, prescription }) => (
    <div className="bg-paper rounded-3xl shadow-xl overflow-hidden border-4 border-wood-dark animate-in max-w-2xl mx-auto relative lantern-container">
        <div className="bg-denim px-8 py-4 flex items-center justify-between text-paper bg-denim-patch border-b-4 border-toast">
            <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-toast flame-3"></div>
                Symptom Checker Active
            </h3>
            <p className="text-paper/60 text-xs font-mono">ID: PT-2026-WD</p>
        </div>
        <div className="p-8 flex flex-col gap-8 texture-burlap">
            <form onSubmit={handleConsultation} className="space-y-4">
                <label className="block text-sm font-bold text-denim uppercase tracking-wide">Patient Complaints</label>
                <textarea 
                    value={symptomInput} 
                    onChange={(e) => setSymptomInput(e.target.value)} 
                    placeholder="Describe your current state... (e.g. 'I'm hangry and need something spicy')" 
                    className="w-full h-32 p-4 rounded-xl border-2 border-denim/30 focus:border-toast focus:ring-0 transition-colors resize-none bg-white text-stone-800 shadow-inner font-serif italic" 
                />
                <button type="submit" disabled={isDiagnosing || !symptomInput} className="w-full py-4 bg-wood-dark hover:bg-wood-light disabled:bg-wood-light text-paper font-bold text-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-3 border-2 border-dashed border-white/10 texture-wood flame-1">
                    {isDiagnosing ? <Loader className="animate-spin text-toast" /> : <Activity className="text-toast" />}
                    {isDiagnosing ? "Analyzing Vitals..." : "Get Prescription"}
                </button>
            </form>
            <div className="w-full relative">
                <div className="relative bg-white p-8 border-2 border-dashed border-wood-dark/40 shadow-md min-h-[250px] flex flex-col items-center justify-center text-center transform rotate-1 lantern-glow">
                    {!prescription ? (
                        <div className="text-wood-dark/40">
                            <Stethoscope className="mx-auto mb-4 opacity-50" size={48} />
                            <p className="italic text-lg">"Tell me where it hurts...<br/>(in your stomach)"</p>
                        </div>
                    ) : (
                        <div className="w-full text-left animate-in">
                            <div className="border-b-2 border-wood-dark pb-4 mb-6 flex justify-between items-end">
                                <div>
                                    <h4 className="font-bold text-2xl text-wood-dark">Rx</h4>
                                    <p className="text-xs text-toast uppercase font-bold flame-2">The Wich Doc Clinic</p>
                                </div>
                                <div className="text-wood-dark font-bold text-sm bg-paper border border-wood-dark px-2 py-1">VALID</div>
                            </div>
                            <div className="space-y-4 mb-8">
                                <div><p className="text-xs text-denim uppercase font-bold">Diagnosis</p><p className="text-lg font-bold text-wood-dark">{prescription.diagnosis}</p></div>
                                <div><p className="text-xs text-denim uppercase font-bold">Treatment</p><p className="text-2xl font-bold text-toast flame-3">{prescription.dishName}</p></div>
                                <div><p className="text-xs text-denim uppercase font-bold">Clinical Reasoning</p><p className="italic text-stone-600">"{prescription.reason}"</p></div>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-wood-dark border-t border-dashed border-wood-dark/30 pt-4">
                                <Clock size={14} /> Dosage: {prescription.dosage}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const ResearchSection = ({ trialRequest, setTrialRequest, runClinicalTrial, isDeveloping, trialResult }) => (
    <div className="bg-wood-dark rounded-3xl shadow-2xl overflow-hidden border-4 border-toast animate-in relative max-w-5xl mx-auto texture-wood lantern-container">
        <div className="hazard-stripes h-4 w-full bg-yellow-500"></div>
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 relative z-10">
            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <h3 className="text-paper font-bold text-2xl flex items-center gap-2"><TestTube className="text-toast flame-1" /> Clinical Trials</h3>
                    <p className="text-paper/70 text-sm">Submit a craving for experimental analysis.</p>
                </div>
                <form onSubmit={runClinicalTrial} className="space-y-2">
                    <textarea value={trialRequest} onChange={(e) => setTrialRequest(e.target.value)} placeholder="e.g. I want something with kimchi and peanut butter..." className="w-full h-32 p-4 rounded-lg border-2 border-paper/20 focus:border-toast focus:ring-1 focus:ring-toast transition-colors resize-none bg-denim text-paper placeholder-white/30 font-mono text-sm bg-denim-patch" />
                    <button type="submit" disabled={isDeveloping || !trialRequest} className="w-full py-4 bg-toast hover:bg-orange-800 disabled:bg-wood-light disabled:text-paper/50 text-white rounded-lg font-bold text-lg shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-3 border-2 border-paper/10 flame-2">
                        {isDeveloping ? <Loader className="animate-spin" /> : <FlaskConical />}
                        {isDeveloping ? "Synthesizing..." : "Initiate Protocol"}
                    </button>
                </form>
            </div>
            <div className="flex-1">
                <div className="h-full min-h-[300px] bg-denim/50 rounded-xl border-2 border-dashed border-toast/50 p-6 flex flex-col relative overflow-hidden shadow-inner">
                    {!trialResult ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-paper/40">
                            <Sparkles className="opacity-50 mb-2 animate-pulse" />
                            <p className="font-mono text-xs uppercase tracking-widest text-center">Awaiting Input...</p>
                        </div>
                    ) : (
                        <div className="animate-in font-mono text-paper space-y-6">
                            <div className="border-b border-dashed border-paper/30 pb-4"><p className="text-[10px] text-toast uppercase tracking-widest mb-1 flame-1">Subject Name</p><h3 className="text-2xl font-bold text-white font-serif">{trialResult.name}</h3></div>
                            <div><p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Compound Analysis</p><p className="text-sm">{trialResult.ingredients}</p></div>
                            <div className="bg-black/20 p-4 rounded border-l-4 border-toast"><p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Procedure</p><p className="text-sm italic">"{trialResult.description}"</p></div>
                            <div className="mt-auto pt-4 flex items-start gap-3 text-toast flame-3"><AlertTriangle size={16} className="shrink-0 mt-0.5" /><p className="text-xs font-bold">{trialResult.warning}</p></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="hazard-stripes h-4 w-full bg-yellow-500"></div>
    </div>
);

// --- MAIN PAGES ---

const HomePage = ({ navigateTo, getDailyDose, isLoadingDose, dailyDose }) => (
  <div className="animate-in texture-burlap">
      <div className="relative bg-wood-dark text-white overflow-hidden border-b-8 border-denim texture-wood">
          <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 space-y-6 text-left relative z-10">
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight text-shadow-wood">
                      Prescriptions for your <span className="text-toast flame-1">Hunger.</span>
                  </h1>
                  <p className="text-xl text-paper/80">Artisan sandwiches and fresh-baked breads daily.</p>
                  <div className="flex flex-wrap gap-4 pt-4">
                      <button onClick={() => navigateTo('clinic')} className="px-8 py-4 bg-paper hover:bg-white text-wood-dark rounded-lg font-bold flex items-center gap-2 border-2 border-denim shadow-lg">
                          <Stethoscope size={20} /> Visit The Clinic
                      </button>
                      <button onClick={() => navigateTo('menu')} className="px-8 py-4 bg-toast hover:bg-orange-800 text-white rounded-lg font-bold border-2 border-white/20 shadow-lg flame-2">View Menu</button>
                  </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative z-10">
                  <div className="relative w-80 h-80 rounded-3xl flex items-center justify-center border-8 border-dashed border-paper/30 shadow-2xl overflow-hidden bg-denim lantern-container">
                      <SmartImage src="logo.png" alt="The Wich Doc Logo" className="w-full h-full object-cover" lazy={false} />
                  </div>
              </div>
          </div>
      </div>
      
      <section className="bg-denim py-12 text-center text-paper border-b-8 border-paper px-4 bg-denim-patch">
          <button onClick={getDailyDose} disabled={isLoadingDose} className="inline-flex items-center gap-2 text-toast hover:text-white font-bold uppercase tracking-widest text-sm mb-4 flame-3"><Sparkles size={16} /> {isLoadingDose ? "Consulting..." : "Daily Advice"}</button>
          <p className="text-2xl font-serif italic min-h-[4rem]">"{dailyDose || "A sandwich a day keeps the hunger away."}"</p>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-wood-dark flex items-center justify-center gap-2 uppercase tracking-tighter"><Camera className="text-toast flame-1" /> Recent Procedures</h2>
              <div className="h-1 w-24 bg-toast mx-auto mt-4 rounded-full flame-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['food1.png', 'food2.png', 'food3.png'].map((img, i) => (
                  <div key={i} className="aspect-square bg-white p-2 border-2 border-dashed border-wood-dark/20 shadow-xl transform hover:-translate-y-2 transition-transform duration-500">
                      <div className="w-full h-full overflow-hidden">
                          <SmartImage className="w-full h-full object-cover" src={img} alt={`Procedure ${i+1}`} />
                      </div>
                  </div>
              ))}
          </div>
      </section>
  </div>
);

const MenuPage = ({ activeCategory, setActiveCategory }) => {
  // Directly mapping correct file names to categories
  // bread1.jpg explicitly requested
  const categoryImageMap = {
      sandwiches: 'sandwich1.png',
      sides: 'sides1.png',
      desserts: 'dessert1.png',
      breads: 'bread1.jpg' 
  };

  const currentImage = categoryImageMap[activeCategory];
  const isComingSoon = activeCategory === 'sandwiches' || activeCategory === 'sides';

  return (
      <section className="py-20 px-4 max-w-5xl mx-auto animate-in texture-burlap">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-wood-dark">The Prescriptions</h2>
              <p className="text-toast mt-2 font-bold uppercase tracking-widest text-sm flame-3">Compounded Daily</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
              {['sandwiches', 'sides', 'desserts', 'breads'].map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-3 rounded-full font-bold capitalize transition-all border-2 ${activeCategory === cat ? 'bg-denim text-white border-denim shadow-lg flame-2' : 'bg-transparent text-wood-dark border-wood-dark hover:bg-wood-dark hover:text-white'}`}>{cat}</button>
              ))}
          </div>

          {isComingSoon && (
              <div className="bg-toast text-white p-4 rounded mb-12 text-center font-bold tracking-widest flex items-center justify-center gap-4 uppercase border-2 border-white/20 flame-1 shadow-lg">
                  <AlertTriangle /> COMING SOON: BRICK & MORTAR EXCLUSIVE <AlertTriangle />
              </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-16">
              {MENU_DATA[activeCategory].map((item, index) => (
                  <div key={index} className="bg-white p-6 shadow-md border-2 border-wood-dark/10 group relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-toast transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                      <div className="flex justify-between items-start mb-2">
                          <div>
                              <h3 className="text-xl font-bold text-wood-dark font-serif">{item.name}</h3>
                              <p className="text-toast font-bold text-xs uppercase tracking-wide flame-2">{item.subtitle}</p>
                          </div>
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed border-t border-dashed border-wood-dark/20 pt-2 mt-2">{item.description}</p>
                  </div>
              ))}
          </div>
          
          <div className="mt-12 flex justify-center">
              <div className="w-full max-w-2xl text-center">
                  <h3 className="font-bold text-wood-dark uppercase tracking-widest text-xs mb-6 flex items-center justify-center gap-4">
                      <span className="h-px w-12 bg-wood-dark/30"></span>
                      Visual Evidence
                      <span className="h-px w-12 bg-wood-dark/30"></span>
                  </h3>
                  <div className="aspect-video p-2 bg-white border-2 border-denim shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                      <SmartImage 
                        src={currentImage} 
                        alt={`${activeCategory} example`} 
                        className="w-full h-full object-cover" 
                      />
                  </div>
              </div>
          </div>
      </section>
  );
};

const AboutPage = () => (
  <div className="animate-in texture-burlap">
      <div className="relative h-96 w-full overflow-hidden border-b-8 border-wood-dark">
          {/* Vancouver Island Background with reduced opacity overlay */}
          <SmartImage src="vancouver-island-bg.png" alt="Vancouver Island Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-wood-dark/40 flex items-center justify-center">
              <div className="text-center border-4 border-dashed border-paper/30 p-8 bg-wood-dark/60 backdrop-blur-sm">
                  <h2 className="text-5xl font-bold text-paper tracking-tight font-serif italic">Roots Deep in the Island</h2>
              </div>
          </div>
      </div>

      <section className="py-20 relative text-white bg-wood-dark texture-wood">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <p className="text-paper text-lg leading-relaxed mb-8 font-serif">
                  To understand what we’re doing at The 'Wich Doc, you have to understand where we are. Nestled smack in the middle of Vancouver Island. Parksville isn't just a GPS coordinate where we clock in, it’s where we hang our hats. Being surrounded by the kind of crushing natural beauty—the ocean, the ancient timbers—the kind that forces you to check your ego at the door. Our job isn't to reinvent the wheel, We just take our cues from the ocean and the forest right outside our back door. We buy local because it tastes better, and because it supports the people keeping this community alive. We cook to reflect the landscape. No tricks. No smoke and mirrors. Just a clean, honest expression of where we are and what we love.
              </p>
              <div className="flex justify-center gap-12 text-toast">
                  <div className="flex flex-col items-center"><Utensils className="mb-2 flame-1"/><span className="text-sm font-bold text-white">Oceanside Soul</span></div>
                  <div className="flex flex-col items-center"><Wheat className="mb-2 flame-2"/><span className="text-sm font-bold text-white">Local Sourced</span></div>
              </div>
          </div>
      </section>

      <section className="py-20 bg-[#f4ebd0]">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3 p-2 bg-white border-2 border-dashed border-wood-dark shadow-xl transform -rotate-2">
                   {/* Explicitly using chef.png here */}
                   <SmartImage src="chef.png" alt="Chef Marc" className="w-full aspect-square object-cover" />
              </div>
              <div className="md:w-2/3">
                  <h2 className="text-4xl font-bold mb-4 flex items-center gap-3 text-wood-dark"><FlaskConical className="text-toast flame-3" />Meet The Alchemist</h2>
                  <h3 className="text-xl text-toast font-bold uppercase tracking-wider mb-6 flame-1">Marc Rollier</h3>
                  <div className="text-stone-700 text-lg leading-relaxed space-y-4">
                      <p>To Chef Marc, a finished dish is just the final punctuation mark on a long sentence written in sweat and logistics. They call him "The Alchemist" because he finds order in the chaos. He is a man who has spent a lifetime in the heat, mastering the transmutation of simple elements—flour, water, smoke, and meat—into something that feeds the soul.</p>
                      <p>He believes that great food is the result of a discipline that most diners will never see. His goal now is to teach the next generation that the craft isn't about ego, it's about ownership. Dedicating his time on stressing the importance of the process over the prize, he offers a simple guarantee to anyone willing to sit at his table:</p>
                  </div>
                  <p className="text-denim text-xl font-bold italic border-l-4 border-toast pl-6 my-8 font-serif">"Whether it is a five-star resort or a beachside cantina, give me a sharp knife, some fresh ingredients, and I will deliver a dining experience you would not soon forget."</p>
              </div>
          </div>
      </section>

      <section id="location" className="py-20 bg-[#f4ebd0] border-t-4 border-denim text-center">
          <div className="max-w-2xl mx-auto px-4">
              <MapPin className="mx-auto text-toast mb-4 flame-2" size={48} />
              <h2 className="text-3xl font-bold mb-8 text-wood-dark">Visit The Clinic</h2>
              <div className="bg-white p-8 border-2 border-dashed border-wood-dark shadow-lg relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-wood-dark opacity-5 pointer-events-none"></div>
                  <div className="space-y-8 relative z-10">
                      <div>
                          <p className="text-toast font-bold mb-1 tracking-wide uppercase text-xs flame-3">Our Location</p>
                          <p className="text-xl font-bold text-wood-dark font-serif">Island Roots Market</p>
                          <p className="text-stone-500 italic text-sm">Nanaimo, BC (Wednesdays Only)</p>
                      </div>
                      <div className="h-px bg-wood-dark/20 w-1/2 mx-auto"></div>
                      <div>
                          <p className="text-toast font-bold mb-1 tracking-wide uppercase text-xs flame-1">"Clinic" Announcement</p>
                          <p className="text-xl font-bold text-wood-dark font-serif">Parksville Store</p>
                          <p className="text-stone-500 italic text-sm">(Location to be announced)</p>
                      </div>
                      <div className="h-px bg-wood-dark/20 w-1/2 mx-auto"></div>
                      <div>
                          <p className="text-toast font-bold mb-1 tracking-wide uppercase text-xs flame-2">Catering Inquiry</p>
                          <p className="text-denim font-bold underline cursor-pointer hover:text-toast" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIALS.email}&su=Order%20Request%20from%20Website`, "_blank")}>{SOCIALS.email}</p>
                      </div>
                      <div className="flex justify-center space-x-6 pt-4">
                          <a href={SOCIALS.ig} target="_blank" className="text-denim hover:text-toast transition-colors"><Instagram size={24} /></a>
                          <a href={SOCIALS.fb} target="_blank" className="text-denim hover:text-toast transition-colors"><Facebook size={24} /></a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </div>
);

const BlogPage = ({ blogPosts, onPostClick }) => (
  <div className="max-w-4xl mx-auto p-12 text-center space-y-12 animate-in texture-burlap">
      <div>
          <h2 className="text-4xl font-bold text-wood-dark mb-2">Lab Journal</h2>
          <p className="text-toast font-mono text-xs uppercase tracking-widest flame-1">Field Notes from the Alchemist</p>
      </div>
      <div className="grid gap-12">
          {INITIAL_BLOG_POSTS.map(post => (
              <div key={post.id} onClick={() => onPostClick(post)} className="bg-white border-2 border-wood-dark p-2 hover:shadow-xl transition-all cursor-pointer group text-left transform hover:-rotate-1">
                  <div className="border border-dashed border-wood-dark/30 p-6 flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 h-48 md:h-auto bg-stone-200 relative">
                          <div className="absolute top-0 left-0 bg-toast text-white text-[10px] font-bold px-2 py-1 z-10 flame-2">{post.category}</div>
                          <SmartImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="md:w-2/3 flex flex-col justify-center">
                          <span className="text-[10px] font-bold text-wood-dark/50 uppercase tracking-widest mb-2">{post.date}</span>
                          <h3 className="text-2xl font-serif font-bold text-wood-dark mb-3 group-hover:text-toast transition-colors">{post.title}</h3>
                          <p className="text-stone-600 text-sm leading-relaxed mb-4">"{post.excerpt}"</p>
                          <span className="text-toast font-bold text-xs uppercase tracking-wide flex items-center gap-2 flame-3">Read Entry <ArrowRight size={14}/></span>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  </div>
);

const LinksPage = ({ navigateTo }) => (
  <div className="min-h-screen bg-wood-dark texture-wood flex flex-col items-center justify-center p-4 animate-in">
      <div className="max-w-md w-full text-center space-y-10 relative z-10">
          <div className="w-40 h-40 bg-paper rounded-3xl flex items-center justify-center border-4 border-toast mx-auto overflow-hidden shadow-2xl relative lantern-container">
              <SmartImage src="logo.png" alt="The Wich Doc Logo" className="w-full h-full object-cover" lazy={false} />
          </div>
          
          <div className="space-y-2">
              <h1 className="text-4xl font-bold text-paper tracking-widest uppercase font-serif text-shadow-wood">The 'Wich Doc</h1>
              <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-toast"></span>
                  <p className="text-toast font-bold text-xs uppercase tracking-[0.2em] flame-1">Patient Portal</p>
                  <span className="h-px w-8 bg-toast"></span>
              </div>
          </div>

          <div className="space-y-4 pt-4">
              <button onClick={() => navigateTo('home')} className="block w-full py-5 bg-toast text-white rounded font-bold text-xl hover:bg-orange-800 transition-all shadow-lg tracking-widest uppercase border-2 border-white/20 flame-2">ENTER SITE</button>
              
              <div className="grid grid-cols-2 gap-4">
                  <a href={SOCIALS.ig} target="_blank" className="py-4 bg-paper/10 text-paper rounded font-bold hover:bg-paper/20 transition-all border-2 border-dashed border-paper/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2"><Instagram size={16} /> Instagram</a>
                  <a href={SOCIALS.fb} target="_blank" className="py-4 bg-paper/10 text-paper rounded font-bold hover:bg-paper/20 transition-all border-2 border-dashed border-paper/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2"><Facebook size={16} /> Facebook</a>
              </div>

              <div className="pt-8">
                  <a href={`mailto:${SOCIALS.email}`} className="block w-full py-5 bg-denim text-paper rounded font-bold hover:bg-denim-light transition-all shadow-md border-t-4 border-wood-dark uppercase tracking-widest text-sm flex items-center justify-center gap-2 bg-denim-patch flame-3">
                      <Lock size={16} /> Order Securely
                  </a>
              </div>
          </div>
          
          <p className="text-paper/30 text-[10px] mt-8">Est. 2026 • Parksville, BC</p>
      </div>
  </div>
);

// --- MAIN APP ---

function App() {
  const [currentPage, setCurrentPage] = useState('links'); 
  const [activeCategory, setActiveCategory] = useState('sandwiches');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [symptomInput, setSymptomInput] = useState('');
  const [prescription, setPrescription] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [dailyDose, setDailyDose] = useState('');
  const [isLoadingDose, setIsLoadingDose] = useState(false);
  const [trialRequest, setTrialRequest] = useState('');
  const [trialResult, setTrialResult] = useState(null);
  const [isDeveloping, setIsDeveloping] = useState(false);
  const [clinicMode, setClinicMode] = useState('triage');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (!window.location.hash) {
      setCurrentPage('links');
    }
  }, []);

  const navigateTo = (p) => { setCurrentPage(p); setIsMobileMenuOpen(false); window.scrollTo(0, 0); };

  const handleConsultation = async (e) => {
      if (e) e.preventDefault();
      if (!symptomInput.trim()) return;
      setIsDiagnosing(true); setPrescription(null);
      const prompt = `Act as 'The Wich Doc'. Based on: "${symptomInput}", prescribe one item from: ${JSON.stringify(MENU_DATA)}. Return JSON only: {dishName, diagnosis, reason, dosage}`;
      try {
          const text = await callGemini(prompt);
          setPrescription(JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim()));
      } catch (err) { console.error(err); alert("Consultation temporarily unavailable. Please try again."); }
      finally { setIsDiagnosing(false); }
  };

  const runClinicalTrial = async (e) => {
      if (e) e.preventDefault();
      if (!trialRequest.trim()) return;
      setIsDeveloping(true); setTrialResult(null);
      const prompt = `Invent a medical-themed gourmet creation (sandwich, pastry, or dessert) based on: "${trialRequest}". Return JSON only: {name, ingredients, description, warning}`;
      try {
          const text = await callGemini(prompt);
          setTrialResult(JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim()));
      } catch (err) { console.error(err); alert("Lab temporarily offline. Please try again."); }
      finally { setIsDeveloping(false); }
  };

  const getDailyDose = async () => {
      setIsLoadingDose(true);
      try { setDailyDose(await callGemini("Short medical sandwich advice (1 sentence).")); }
      catch (err) { setDailyDose("A sandwich a day keeps the hunger away."); }
      finally { setIsLoadingDose(false); }
  };

  return (
      <div className="min-h-screen flex flex-col font-serif">
          <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
          {currentPage !== 'links' && (
              <nav className="sticky top-0 z-50 bg-wood-dark text-paper shadow-2xl px-6 h-20 flex justify-between items-center border-b-4 border-denim texture-wood">
                  <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigateTo('home')}>
                      <div className="bg-toast p-2 rounded-full border-2 border-paper group-hover:rotate-12 transition-transform shadow-md flame-2"><ChefHat className="h-6 w-6 text-white" /></div>
                      <div className="flex flex-col">
                          <span className="text-xl font-bold tracking-widest uppercase text-shadow-wood">Wich Doc</span>
                          <span className="text-[9px] text-paper/80 uppercase tracking-[0.2em] leading-none">Bake Shop</span>
                      </div>
                  </div>
                  <div className="hidden md:flex space-x-8">
                      {['home', 'clinic', 'menu', 'about', 'blog'].map(p => (
                          <button key={p} onClick={() => navigateTo(p)} className={`px-2 py-1 font-bold capitalize transition-colors tracking-widest border-b-2 ${currentPage === p ? 'text-toast border-toast flame-1' : 'text-paper/60 border-transparent hover:text-paper hover:border-paper/30'}`}>
                              {p === 'about' ? 'About Us' : p}
                          </button>
                      ))}
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-paper"><Menu className="h-8 w-8" /></button>
                  {isMobileMenuOpen && (
                      <div className="absolute top-20 left-0 w-full bg-wood-dark p-6 flex flex-col space-y-6 shadow-xl z-50 animate-in slide-in-from-top duration-300 border-b-4 border-toast">
                          {['home', 'clinic', 'menu', 'about', 'blog', 'links'].map(p => (
                              <button key={p} onClick={() => navigateTo(p)} className="text-left font-bold text-paper capitalize py-2 border-b border-dashed border-paper/20 tracking-widest">{p}</button>
                          ))}
                      </div>
                  )}
              </nav>
          )}

          <main className="flex-grow">
              {currentPage === 'home' && <HomePage navigateTo={navigateTo} getDailyDose={getDailyDose} isLoadingDose={isLoadingDose} dailyDose={dailyDose} />}
              {currentPage === 'menu' && <MenuPage activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
              {currentPage === 'clinic' && (
                  <section className="py-24 bg-paper min-h-screen px-4 texture-burlap">
                      <div className="max-w-4xl mx-auto flex justify-center gap-6 mb-12">
                          <button onClick={() => setClinicMode('triage')} className={`px-8 py-3 rounded font-bold uppercase tracking-widest border-2 transition-all ${clinicMode === 'triage' ? 'bg-wood-dark text-paper border-wood-dark shadow-lg' : 'bg-transparent text-wood-dark border-wood-dark'}`}>Triage</button>
                          <button onClick={() => setClinicMode('trials')} className={`px-8 py-3 rounded font-bold uppercase tracking-widest border-2 transition-all ${clinicMode === 'trials' ? 'bg-toast text-white border-toast shadow-lg flame-3' : 'bg-transparent text-wood-dark border-wood-dark'}`}>R&D Lab</button>
                      </div>
                      {clinicMode === 'triage' ? <TriageSection symptomInput={symptomInput} setSymptomInput={setSymptomInput} handleConsultation={handleConsultation} isDiagnosing={isDiagnosing} prescription={prescription} /> : <ResearchSection trialRequest={trialRequest} setTrialRequest={setTrialRequest} runClinicalTrial={runClinicalTrial} isDeveloping={isDeveloping} trialResult={trialResult} />}
                  </section>
              )}
              {currentPage === 'about' && <AboutPage />}
              {currentPage === 'blog' && <BlogPage blogPosts={INITIAL_BLOG_POSTS} onPostClick={setSelectedPost} />}
              {currentPage === 'links' && <LinksPage navigateTo={navigateTo} />}
          </main>

          {currentPage !== 'links' && (
              <footer className="bg-wood-dark text-paper/40 py-12 text-center border-t-8 border-denim texture-wood">
                  <ChefHat className="mx-auto mb-4 opacity-20" />
                  <p className="text-[10px] uppercase tracking-[0.3em]">© 2026 Wich Doc Bake Shop. AI Protocol Secured.</p>
              </footer>
          )}
      </div>
  );
}

export default App;