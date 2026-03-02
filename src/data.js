export const SOCIALS = {
    ig: "https://www.instagram.com/wichdocbakeshop/",
    fb: "https://www.facebook.com/profile.php?id=100088206555550",
    email: "chef@wichdocbakeshop.ca",
    order: "https://square.link/u/oOoK6FRG",
    membership: "https://square.link/u/lMRPXBKw"
};

export const menuData = {
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
        { name: "Cheesecake Jar", subtitle: "The Local Anesthetic", description: "Dark cocoa crumb, custard mousse, and semi-sweet ganache in a jar.", tag: "Local Fav" },
        { name: "Midnight Banoffee Loaf", subtitle: "The Midnight Shift", description: "Chocolate chip loaf with molten dulce de leche and candied walnuts.", tag: "Decadent" },
        { name: "Pecan sticky Buns", subtitle: "Caramelized Pull-Apart", description: "Yeasted buns drenched in buttery pecan caramel sauce, baked until golden and impossibly sticky.", tag: "Weekend Special" },
        { name: "Big Bad Brownie", subtitle: "Dark Chocolate Fudge", description: "Dense, intensely dark brownie with a crinkle top and fudgy center. Not for the faint of heart.", tag: "Indulgent" }
    ],
    breads: [
        { name: "Caramelized Onion & Zataar Focaccia", subtitle: "Italian Flatbread", description: "Dimpled dough layered with sweet caramelized onions and fragrant za'atar herb blend.", tag: "Fresh" },
        { name: "Red Fife & Cheddar Farmer's Loaf", subtitle: "Heritage Grain Sourdough", description: "Ancient Red Fife wheat slow-fermented with our sourdough culture and studded with aged cheddar.", tag: "Artisan" },
{ name: "Shokupan Loaf", subtitle: "Japanese Milk Bread", description: "Pillowy-soft Japanese-style white bread enriched with milk and butter — a perfect everyday loaf.", tag: "Soft" },
        { name: "Horst's Black Pumpernickel", subtitle: "Old World Rye", description: "Dense, dark German-style rye with deep earthy flavour and a long fermentation. Named for the man who inspired it.", tag: "Traditional" },
        { name: "Ancient Egyptian Aish Baladi", subtitle: "Whole Wheat Flatbread", description: "Traditional Egyptian flatbread made with whole wheat and baked at extreme heat for a classic pocket and char.", tag: "Ancient Grain" }
    ]
};

export const memberRecipes = [
    {
        id: 1,
        title: "Patient Zero Sourdough Starter",
        subtitle: "The Foundation of Every Loaf",
        category: "Bread",
        difficulty: "Advanced",
        activeTime: "30 min/day",
        totalTime: "5 days",
        yield: "1 active starter",
        image: "blog1.png",
        ingredients: [
            "200g whole wheat flour",
            "200g unbleached all-purpose flour",
            "400ml lukewarm water (80°F / 27°C)",
            "Island sea salt, to taste"
        ],
        steps: [
            { label: "Day 1", text: "Combine 100g whole wheat flour with 100ml lukewarm water in a clean jar. Stir vigorously until no dry flour remains. Cover loosely and leave at room temperature (70–75°F ideal). Resist the urge to refrigerate." },
            { label: "Day 2", text: "You may see little activity. That's normal. Discard half the mixture, add 100g all-purpose flour and 100ml water. Stir well. Cover and wait." },
            { label: "Day 3", text: "Bubbles should be forming. The starter is waking up. Discard half again, feed with 100g flour and 100ml water. You may notice a sour, almost tangy smell — good sign." },
            { label: "Day 4–5", text: "Your starter should be doubling in size within 4–6 hours of feeding. When it passes the float test (drop a spoonful in water — if it floats, it's ready), you're cleared for baking." },
            { label: "Maintenance", text: "Feed daily at room temperature, or store in the fridge and feed weekly. Always discard half before feeding to keep the culture healthy and the flavour balanced." }
        ],
        notes: "Every starter is different. Island humidity and ambient temperature will affect your timeline. Don't panic if it takes 7 days. The Patient Zero took 8. — Chef Marc"
    },
    {
        id: 2,
        title: "Maple Cold-Smoked Sockeye",
        subtitle: "The Coastal Remedy Protocol",
        category: "Protein",
        difficulty: "Intermediate",
        activeTime: "1 hour",
        totalTime: "24 hours",
        yield: "4–6 portions",
        image: "blog2.png",
        ingredients: [
            "1 side sockeye salmon, pin-boned, skin on",
            "120g kosher salt",
            "80g brown sugar",
            "1 tbsp cracked black pepper",
            "1 tsp smoked paprika",
            "Vancouver Island maple wood chips, soaked 30 min"
        ],
        steps: [
            { label: "Cure", text: "Combine salt, brown sugar, pepper, and paprika. Lay salmon skin-side down on a rack over a sheet pan. Coat flesh side evenly with cure mix. Cover loosely with plastic wrap and refrigerate for 12 hours. The cure will draw out moisture — this is what you want." },
            { label: "Rinse & Dry", text: "Rinse cure completely under cold water. Pat dry. Return to rack uncovered in the fridge for 2–4 hours until a pellicle (tacky skin) forms on the surface. This step is non-negotiable — the pellicle is what allows smoke to adhere." },
            { label: "Smoke", text: "Set up your smoker for cold smoke (below 80°F / 27°C). Use soaked maple chips. Place salmon skin-side down. Smoke for 2–4 hours depending on thickness and desired smoke intensity. Do not rush with heat — this is cold smoking, not cooking." },
            { label: "Rest", text: "Wrap tightly and refrigerate overnight. The flavour deepens significantly after resting. Slice thin against the grain on a bias for service." }
        ],
        notes: "Temperature control is everything in cold smoking. Above 80°F, you're cooking, not smoking. Use a reliable probe thermometer inside the smoker chamber. — Chef Marc"
    },
    {
        id: 3,
        title: "Whiskey Hot Honey",
        subtitle: "The Adrenaline Shot Formula",
        category: "Condiment",
        difficulty: "Easy",
        activeTime: "20 min",
        totalTime: "48 hours (infusion)",
        yield: "500ml",
        image: "blog3.png",
        ingredients: [
            "500ml raw wildflower honey",
            "60ml rye whiskey (bourbon works too)",
            "6–8 dried red chilies, crushed",
            "2 tsp apple cider vinegar",
            "1 tsp chili flakes",
            "Pinch of sea salt"
        ],
        steps: [
            { label: "Warm", text: "Gently warm honey in a small saucepan over the lowest heat possible. You want it fluid, not boiling — 150°F max. High heat destroys the enzymes and flavour compounds that make raw honey worth using." },
            { label: "Infuse", text: "Add crushed chilies and chili flakes. Stir and keep warm for 10–15 minutes. Taste as you go — pull the heat when it's 20% hotter than you think you want. It mellow on the palate as it cools." },
            { label: "Finish", text: "Remove from heat. Add whiskey and apple cider vinegar. The vinegar brightens everything and extends shelf life. Add salt. Stir well." },
            { label: "Rest", text: "Pour into a clean glass jar. Let steep at room temperature for 48 hours before straining out the solids (or leave them in for more heat — your call). Keeps refrigerated for 3 months." }
        ],
        notes: "We ferment ours for 2 weeks before adding whiskey — that's the version on the sandwich. This is the simplified take. Both are excellent. — Chef Marc"
    }
];

export const initialBlogPosts = [
    { id: 1, title: "The Alchemy of Wild Yeast", category: "Science", excerpt: "Wild yeast is an ecosystem. Our starter is a living member of the team.", date: "Oct 12, 2025", image: "blog1.png", content: "At The 'Wich Doc, we don't buy yeast by the pound; we cultivate it by the hour. Our sourdough starter, nicknamed 'The Patient Zero,' is a complex colony of wild bacteria and yeast harvested right here in Parksville. This slow fermentation process doesn't just provide rise; it predigests the gluten, creating a loaf that is easier on the gut and richer in micronutrients." },
    { id: 2, title: "Why We Smoke Our Own Salmon", category: "Ingredients", excerpt: "The difference between pre-packaged and house-smoked is the difference between a photocopy and a painting.", date: "Oct 28, 2025", image: "blog2.png", content: "When we developed the 'Coastal Remedy,' we knew standard lox wouldn't suffice. We began experimenting with cold-smoking techniques using maple wood from the island. By controlling the temperature to stay below 80°F, we preserve the delicate omega-3 fatty acids while infusing a deep, smoky resonance." },
    { id: 3, title: "The Salami Discovery", category: "Procedures", excerpt: "Why our cold-cut selection is more than just a sandwich filler.", date: "Nov 15, 2025", image: "blog3.png", memberOnly: true, content: "Building the perfect salami profile requires more than just meat and salt; it requires patience and a specific island humidity. We've been analyzing the drying rates of our locally sourced pork to ensure every 'prescription' has the exact snap and salt content needed to spike your dopamine levels." }
];