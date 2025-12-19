export type Caterer = {
  slug: string;
  name: string;
  city: string;
  county: string;
  cuisines: string[];
  priceTier: "$" | "$$" | "$$$";
  rating: number;
  reviewCount: number;
  heroImage: string;
  tagline: string;
  services: string[];
  sampleMenu: { title: string; items: string[] }[];
  gallery: string[];
  about: string;
};

export const mockCaterers: Caterer[] = [
  {
    slug: "villa-rosa-catering",
    name: "Villa Rosa Catering",
    city: "Irvine",
    county: "Orange",
    cuisines: ["Italian", "Mediterranean"],
    priceTier: "$$",
    rating: 4.8,
    reviewCount: 124,
    heroImage: "/assets/kitchen-cali/pizza.svg",
    tagline: "Garden-inspired Italian feasts for warm, elegant celebrations.",
    services: ["Weddings", "Corporate catering", "Drop-off trays", "Staffed events"],
    sampleMenu: [
      {
        title: "Signature Bites",
        items: ["Truffle arancini", "Burrata crostini", "Rosemary focaccia"]
      },
      {
        title: "Pasta & Mains",
        items: ["Wild mushroom ravioli", "Braised short rib ragu", "Lemon herb salmon"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/pizza.svg",
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/tomato.svg"
    ],
    about:
      "Villa Rosa blends rustic Italian flavors with a refined, modern presentation. Expect seasonal menus, warm service, and elegant plating."
  },
  {
    slug: "costa-verde-kitchen",
    name: "Costa Verde Kitchen",
    city: "Newport Beach",
    county: "Orange",
    cuisines: ["Mediterranean", "Vegan"],
    priceTier: "$$$",
    rating: 4.9,
    reviewCount: 88,
    heroImage: "/assets/kitchen-cali/basil.svg",
    tagline: "Coastal Mediterranean spreads with bright, seasonal produce.",
    services: ["Private dinners", "Luxury drop-off", "Corporate retreats"],
    sampleMenu: [
      {
        title: "Mezze Table",
        items: ["Saffron hummus", "Charred eggplant dip", "Herbed olives"]
      },
      {
        title: "Sea & Field",
        items: ["Citrus harissa shrimp", "Za'atar roasted chicken", "Cauliflower shawarma"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/pizza.svg",
      "/assets/kitchen-cali/texture-linen-light.png"
    ],
    about:
      "Costa Verde is known for lush mezze tables, modern plating, and wellness-forward menus that still feel celebratory."
  },
  {
    slug: "sunset-salsa-catering",
    name: "Sunset Salsa Catering",
    city: "Santa Ana",
    county: "Orange",
    cuisines: ["Mexican"],
    priceTier: "$$",
    rating: 4.7,
    reviewCount: 140,
    heroImage: "/assets/kitchen-cali/tomato.svg",
    tagline: "Vibrant taqueria-style menus with polished event service.",
    services: ["Weddings", "Taco stations", "Family-style platters"],
    sampleMenu: [
      {
        title: "Street Favorites",
        items: ["Adobo chicken tacos", "Citrus carne asada", "Nopal salad"]
      },
      {
        title: "Sweet Finish",
        items: ["Cinnamon churros", "Cajeta flan", "Hibiscus agua fresca"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/tomato.svg",
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/texture-linen-light.png"
    ],
    about:
      "Sunset Salsa brings modern Mexican flavors with bold colors, made-from-scratch salsas, and festive presentation."
  },
  {
    slug: "harbor-collective",
    name: "Harbor Collective",
    city: "Huntington Beach",
    county: "Orange",
    cuisines: ["Seafood", "California"],
    priceTier: "$$$",
    rating: 4.6,
    reviewCount: 73,
    heroImage: "/assets/kitchen-cali/texture-linen-light.png",
    tagline: "Coastal California menus with refined seafood highlights.",
    services: ["Cocktail receptions", "Seated dinners", "Luxury events"],
    sampleMenu: [
      {
        title: "Coastal Starters",
        items: ["Citrus crudo", "Smoked trout rillette", "Mini poke cones"]
      },
      {
        title: "Main Course",
        items: ["Miso-glazed cod", "Herb roasted chicken", "Summer market risotto"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/chef.svg",
      "/assets/kitchen-cali/pizza.svg",
      "/assets/kitchen-cali/tomato.svg"
    ],
    about:
      "Harbor Collective curates ocean-forward menus with a minimal, elevated aesthetic and an emphasis on California freshness."
  },
  {
    slug: "laurel-and-fork",
    name: "Laurel & Fork",
    city: "Los Angeles",
    county: "Los Angeles",
    cuisines: ["California", "Vegan"],
    priceTier: "$$",
    rating: 4.8,
    reviewCount: 210,
    heroImage: "/assets/kitchen-cali/basil.svg",
    tagline: "Plant-forward feasts crafted for stylish LA gatherings.",
    services: ["Private events", "Film sets", "Wellness retreats"],
    sampleMenu: [
      {
        title: "Seasonal Table",
        items: ["Charred broccoli with chili oil", "Citrus quinoa salad", "Herb flatbread"]
      },
      {
        title: "Comfort Classics",
        items: ["Miso glazed tofu", "Crispy potato pavé", "Roasted carrots"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/texture-linen-light.png",
      "/assets/kitchen-cali/pizza.svg"
    ],
    about:
      "Laurel & Fork focuses on vibrant seasonal produce, modern plating, and a soft, elevated feel for gatherings of any size."
  },
  {
    slug: "golden-coast-smokehouse",
    name: "Golden Coast Smokehouse",
    city: "Pasadena",
    county: "Los Angeles",
    cuisines: ["BBQ"],
    priceTier: "$$",
    rating: 4.5,
    reviewCount: 95,
    heroImage: "/assets/kitchen-cali/pizza.svg",
    tagline: "Slow-smoked classics with a California twist.",
    services: ["Backyard events", "Corporate lunches", "Festival-style service"],
    sampleMenu: [
      {
        title: "Smokehouse Favorites",
        items: ["Oak-smoked brisket", "Citrus pulled pork", "Honey cornbread"]
      },
      {
        title: "Sides",
        items: ["Charred corn salad", "Smoky baked beans", "Pickled slaw"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/pizza.svg",
      "/assets/kitchen-cali/tomato.svg",
      "/assets/kitchen-cali/texture-linen-light.png"
    ],
    about:
      "Golden Coast Smokehouse delivers bold, slow-cooked flavors with refined service and a warm, laid-back style."
  },
  {
    slug: "marigold-banquet",
    name: "Marigold Banquet",
    city: "Santa Monica",
    county: "Los Angeles",
    cuisines: ["Mediterranean", "California"],
    priceTier: "$$$",
    rating: 4.9,
    reviewCount: 132,
    heroImage: "/assets/kitchen-cali/tomato.svg",
    tagline: "Golden hour menus designed for coastal celebrations.",
    services: ["Weddings", "Brand events", "Chef-driven tastings"],
    sampleMenu: [
      {
        title: "Bright Plates",
        items: ["Grilled halloumi", "Cucumber herb salad", "Lemon olive oil cake"]
      },
      {
        title: "Mains",
        items: ["Harissa chicken", "Seared salmon", "Wild mushroom pilaf"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/tomato.svg",
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/chef.svg"
    ],
    about:
      "Marigold Banquet pairs Mediterranean flavors with a refined coastal sensibility for memorable event dining."
  },
  {
    slug: "rosewood-feast",
    name: "Rosewood Feast Co.",
    city: "Glendale",
    county: "Los Angeles",
    cuisines: ["Middle Eastern", "Mediterranean"],
    priceTier: "$$",
    rating: 4.7,
    reviewCount: 76,
    heroImage: "/assets/kitchen-cali/basil.svg",
    tagline: "Lush mezze spreads with modern presentation.",
    services: ["Private dinners", "Corporate catering", "Family-style feasts"],
    sampleMenu: [
      {
        title: "Shared Bites",
        items: ["Pomegranate labneh", "Sumac roasted carrots", "Warm pita"]
      },
      {
        title: "Mains",
        items: ["Lamb kofta", "Herbed chicken skewers", "Saffron rice"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/texture-linen-light.png",
      "/assets/kitchen-cali/pizza.svg"
    ],
    about:
      "Rosewood Feast creates abundant tablescapes inspired by Levantine flavors, designed for sharing."
  },
  {
    slug: "bayside-gatherings",
    name: "Bayside Gatherings",
    city: "San Diego",
    county: "San Diego",
    cuisines: ["California", "Seafood"],
    priceTier: "$$$",
    rating: 4.8,
    reviewCount: 111,
    heroImage: "/assets/kitchen-cali/texture-linen-light.png",
    tagline: "Elevated coastal dining for intimate celebrations.",
    services: ["Weddings", "Oceanfront events", "Private chefs"],
    sampleMenu: [
      {
        title: "Coastal First Course",
        items: ["Citrus shrimp cocktail", "Avocado crudo", "Sea salt focaccia"]
      },
      {
        title: "Main Plates",
        items: ["Seared seabass", "Herb roasted chicken", "Truffle gnocchi"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/chef.svg",
      "/assets/kitchen-cali/tomato.svg",
      "/assets/kitchen-cali/basil.svg"
    ],
    about:
      "Bayside Gatherings mixes fresh ocean flavors with a luxe, minimal aesthetic for elevated events."
  },
  {
    slug: "salt-and-fig",
    name: "Salt & Fig",
    city: "La Jolla",
    county: "San Diego",
    cuisines: ["Mediterranean", "Dessert"],
    priceTier: "$$$",
    rating: 4.9,
    reviewCount: 67,
    heroImage: "/assets/kitchen-cali/basil.svg",
    tagline: "Mediterranean spreads finished with a dessert bar.",
    services: ["Private dinners", "Dessert stations", "Chef tables"],
    sampleMenu: [
      {
        title: "Sweet + Savory",
        items: ["Fig & honey crostini", "Olive oil cake", "Citrus panna cotta"]
      },
      {
        title: "Dinner",
        items: ["Saffron risotto", "Grilled lamb chops", "Seasonal vegetables"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/tomato.svg",
      "/assets/kitchen-cali/texture-linen-light.png"
    ],
    about:
      "Salt & Fig brings a chef-driven Mediterranean table with a signature dessert experience."
  },
  {
    slug: "mesa-roja-events",
    name: "Mesa Roja Events",
    city: "Chula Vista",
    county: "San Diego",
    cuisines: ["Mexican", "BBQ"],
    priceTier: "$$",
    rating: 4.6,
    reviewCount: 59,
    heroImage: "/assets/kitchen-cali/tomato.svg",
    tagline: "Fire-grilled menus with vibrant SoCal energy.",
    services: ["Outdoor events", "Taco bars", "Corporate lunches"],
    sampleMenu: [
      {
        title: "Grill Station",
        items: ["Adobo chicken", "Carne asada", "Grilled pineapple"]
      },
      {
        title: "Sides",
        items: ["Street corn", "Cilantro rice", "Black bean salad"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/tomato.svg",
      "/assets/kitchen-cali/pizza.svg",
      "/assets/kitchen-cali/basil.svg"
    ],
    about:
      "Mesa Roja pairs smoke and spice with warm hospitality, perfect for energetic gatherings."
  },
  {
    slug: "greenline-catering",
    name: "Greenline Catering",
    city: "Encinitas",
    county: "San Diego",
    cuisines: ["Vegan", "California"],
    priceTier: "$$",
    rating: 4.7,
    reviewCount: 52,
    heroImage: "/assets/kitchen-cali/basil.svg",
    tagline: "Fresh, plant-based menus for coastal celebrations.",
    services: ["Wellness events", "Private dinners", "Corporate catering"],
    sampleMenu: [
      {
        title: "Garden Table",
        items: ["Citrus fennel salad", "Herb quinoa bowls", "Sesame tofu"]
      },
      {
        title: "Sweet Finish",
        items: ["Lemon tart", "Seasonal fruit board", "Almond cookies"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/tomato.svg",
      "/assets/kitchen-cali/texture-linen-light.png"
    ],
    about:
      "Greenline delivers vibrant, plant-forward menus with an easygoing coastal vibe."
  },
  {
    slug: "harborlight-social",
    name: "Harborlight Social",
    city: "Long Beach",
    county: "Los Angeles",
    cuisines: ["California", "Dessert"],
    priceTier: "$$",
    rating: 4.6,
    reviewCount: 84,
    heroImage: "/assets/kitchen-cali/texture-linen-light.png",
    tagline: "Modern California menus with a polished dessert finale.",
    services: ["Brand activations", "Seated dinners", "Dessert bars"],
    sampleMenu: [
      {
        title: "Light Plates",
        items: ["Citrus shrimp cups", "Market veg skewers", "Herb focaccia"]
      },
      {
        title: "Dessert",
        items: ["Vanilla bean panna cotta", "Berry tarts", "Salted caramel bites"]
      }
    ],
    gallery: [
      "/assets/kitchen-cali/texture-linen-light.png",
      "/assets/kitchen-cali/basil.svg",
      "/assets/kitchen-cali/tomato.svg"
    ],
    about:
      "Harborlight Social crafts airy, modern menus with a signature dessert moment for celebrations."
  }
];

