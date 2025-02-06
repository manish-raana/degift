export type GiftTheme = {
    id: string;
    name: string;
    description: string;
    background: string;
    borderColor: string;
    textColor: string;
    accentColor: string;
    icon: string;
  };
  
  export const occasionThemes: Record<string, GiftTheme[]> = {
    birthday: [
      {
        id: "birthday-party",
        name: "Party Time",
        description: "Vibrant celebration",
        background: "bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500",
        borderColor: "border-pink-300",
        textColor: "text-white",
        accentColor: "bg-yellow-400",
        icon: "🎂"
      },
      {
        id: "birthday-confetti",
        name: "Confetti",
        description: "Fun & playful",
        background: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400 via-pink-500 to-purple-500",
        borderColor: "border-yellow-300",
        textColor: "text-white",
        accentColor: "bg-yellow-400",
        icon: "🎉"
      },
      {
        id: "birthday-elegant",
        name: "Elegant",
        description: "Sophisticated",
        background: "bg-gradient-to-br from-rose-100 to-teal-100",
        borderColor: "border-rose-200",
        textColor: "text-gray-900",
        accentColor: "bg-rose-500",
        icon: "✨"
      },
      {
        id: "birthday-neon",
        name: "Neon Glow",
        description: "Electric vibes",
        background: "bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 via-blue-500 to-purple-600",
        borderColor: "border-blue-400",
        textColor: "text-white",
        accentColor: "bg-sky-400",
        icon: "🎈"
      },
      {
        id: "birthday-pastel",
        name: "Pastel Dream",
        description: "Soft & sweet",
        background: "bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200",
        borderColor: "border-purple-200",
        textColor: "text-gray-900",
        accentColor: "bg-purple-400",
        icon: "🎀"
      },
      {
        id: "birthday-cosmic",
        name: "Cosmic Party",
        description: "Out of this world",
        background: "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900 via-indigo-900 to-black",
        borderColor: "border-purple-500",
        textColor: "text-white",
        accentColor: "bg-indigo-500",
        icon: "🌟"
      }
    ],
    valentine: [
      {
        id: "valentine-romantic",
        name: "Romance",
        description: "Classic love",
        background: "bg-gradient-to-br from-red-400 via-pink-500 to-rose-500",
        borderColor: "border-pink-300",
        textColor: "text-white",
        accentColor: "bg-red-400",
        icon: "❤️"
      },
      {
        id: "valentine-sweet",
        name: "Sweet Love",
        description: "Gentle hearts",
        background: "bg-gradient-to-r from-pink-100 via-red-100 to-rose-100",
        borderColor: "border-pink-200",
        textColor: "text-gray-900",
        accentColor: "bg-pink-400",
        icon: "💝"
      },
      {
        id: "valentine-modern",
        name: "Modern Love",
        description: "Contemporary",
        background: "bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-700 via-pink-700 to-red-700",
        borderColor: "border-red-400",
        textColor: "text-white",
        accentColor: "bg-fuchsia-500",
        icon: "💖"
      },
      {
        id: "valentine-sunset",
        name: "Love Sunset",
        description: "Warm glow",
        background: "bg-gradient-to-bl from-rose-300 via-pink-300 to-purple-400",
        borderColor: "border-rose-300",
        textColor: "text-white",
        accentColor: "bg-rose-400",
        icon: "💕"
      },
      {
        id: "valentine-passion",
        name: "Passion",
        description: "Deep love",
        background: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-700 via-pink-700 to-purple-800",
        borderColor: "border-red-500",
        textColor: "text-white",
        accentColor: "bg-red-500",
        icon: "💘"
      },
      {
        id: "valentine-dreamy",
        name: "Love Dream",
        description: "Ethereal feel",
        background: "bg-gradient-to-r from-rose-200 via-purple-200 to-pink-200",
        borderColor: "border-purple-300",
        textColor: "text-gray-900",
        accentColor: "bg-purple-400",
        icon: "🌸"
      }
    ],
    christmas: [
      {
        id: "christmas-classic",
        name: "Classic",
        description: "Traditional",
        background: "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-red-700 via-green-700 to-red-700",
        borderColor: "border-yellow-300",
        textColor: "text-white",
        accentColor: "bg-yellow-400",
        icon: "🎄"
      },
      {
        id: "christmas-frost",
        name: "Winter Frost",
        description: "Icy cool",
        background: "bg-gradient-to-br from-blue-100 via-cyan-200 to-white",
        borderColor: "border-blue-200",
        textColor: "text-gray-900",
        accentColor: "bg-blue-400",
        icon: "❄️"
      },
      {
        id: "christmas-gold",
        name: "Golden",
        description: "Luxurious",
        background: "bg-gradient-to-r from-amber-500 via-yellow-600 to-amber-500",
        borderColor: "border-yellow-400",
        textColor: "text-white",
        accentColor: "bg-yellow-500",
        icon: "⭐"
      },
      {
        id: "christmas-aurora",
        name: "Aurora",
        description: "Northern lights",
        background: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600",
        borderColor: "border-green-300",
        textColor: "text-white",
        accentColor: "bg-green-400",
        icon: "✨"
      },
      {
        id: "christmas-cozy",
        name: "Cozy",
        description: "Warm & inviting",
        background: "bg-gradient-to-br from-red-200 via-red-300 to-amber-200",
        borderColor: "border-red-300",
        textColor: "text-gray-900",
        accentColor: "bg-red-500",
        icon: "🎁"
      },
      {
        id: "christmas-night",
        name: "Silent Night",
        description: "Peaceful eve",
        background: "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-blue-900 via-purple-900 to-blue-900",
        borderColor: "border-blue-500",
        textColor: "text-white",
        accentColor: "bg-blue-500",
        icon: "🌙"
      }
    ],
    graduation: [
      {
        id: "graduation-classic",
        name: "Classic",
        description: "Traditional",
        background: "bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900",
        borderColor: "border-yellow-300",
        textColor: "text-white",
        accentColor: "bg-yellow-400",
        icon: "🎓"
      },
      {
        id: "graduation-modern",
        name: "Modern",
        description: "Contemporary",
        background: "bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-700 via-slate-700 to-sky-700",
        borderColor: "border-sky-300",
        textColor: "text-white",
        accentColor: "bg-sky-400",
        icon: "📚"
      },
      {
        id: "graduation-success",
        name: "Success",
        description: "Achievement",
        background: "bg-gradient-to-r from-emerald-500 to-teal-500",
        borderColor: "border-emerald-300",
        textColor: "text-white",
        accentColor: "bg-emerald-400",
        icon: "🌟"
      },
      {
        id: "graduation-elegant",
        name: "Elegant",
        description: "Sophisticated",
        background: "bg-gradient-to-br from-gray-100 to-gray-300",
        borderColor: "border-gray-300",
        textColor: "text-gray-900",
        accentColor: "bg-gray-800",
        icon: "✨"
      },
      {
        id: "graduation-future",
        name: "Future",
        description: "New horizons",
        background: "bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-purple-700 via-blue-700 to-cyan-700",
        borderColor: "border-purple-300",
        textColor: "text-white",
        accentColor: "bg-purple-500",
        icon: "🚀"
      },
      {
        id: "graduation-wisdom",
        name: "Wisdom",
        description: "Knowledge",
        background: "bg-gradient-to-br from-amber-700 via-orange-700 to-red-700",
        borderColor: "border-amber-300",
        textColor: "text-white",
        accentColor: "bg-amber-500",
        icon: "📖"
      }
    ],
    wedding: [
      {
        id: "wedding-elegant",
        name: "Elegant",
        description: "Timeless",
        background: "bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100",
        borderColor: "border-rose-200",
        textColor: "text-gray-900",
        accentColor: "bg-rose-400",
        icon: "💒"
      },
      {
        id: "wedding-golden",
        name: "Golden",
        description: "Luxurious",
        background: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-200 via-yellow-200 to-amber-200",
        borderColor: "border-amber-300",
        textColor: "text-gray-900",
        accentColor: "bg-amber-500",
        icon: "💍"
      },
      {
        id: "wedding-silver",
        name: "Silver",
        description: "Modern",
        background: "bg-gradient-to-br from-gray-200 via-gray-100 to-white",
        borderColor: "border-gray-300",
        textColor: "text-gray-900",
        accentColor: "bg-gray-500",
        icon: "✨"
      },
      {
        id: "wedding-romance",
        name: "Romance",
        description: "Love & joy",
        background: "bg-gradient-to-r from-pink-200 via-red-200 to-pink-200",
        borderColor: "border-pink-300",
        textColor: "text-gray-900",
        accentColor: "bg-pink-400",
        icon: "💝"
      },
      {
        id: "wedding-royal",
        name: "Royal",
        description: "Majestic",
        background: "bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-purple-900 via-indigo-900 to-violet-900",
        borderColor: "border-purple-300",
        textColor: "text-white",
        accentColor: "bg-purple-500",
        icon: "👑"
      },
      {
        id: "wedding-nature",
        name: "Garden",
        description: "Natural beauty",
        background: "bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200",
        borderColor: "border-green-300",
        textColor: "text-gray-900",
        accentColor: "bg-emerald-500",
        icon: "🌿"
      }
    ],
    other: [
      {
        id: "other-light",
        name: "Light",
        description: "Clean & minimal",
        background: "bg-gradient-to-br from-gray-50 to-gray-100",
        borderColor: "border-gray-200",
        textColor: "text-gray-900",
        accentColor: "bg-blue-500",
        icon: "✨"
      },
      {
        id: "other-dark",
        name: "Dark",
        description: "Bold & modern",
        background: "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black",
        borderColor: "border-gray-700",
        textColor: "text-white",
        accentColor: "bg-purple-500",
        icon: "🌙"
      },
      {
        id: "other-ocean",
        name: "Ocean",
        description: "Calming waves",
        background: "bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400",
        borderColor: "border-blue-300",
        textColor: "text-white",
        accentColor: "bg-cyan-500",
        icon: "🌊"
      },
      {
        id: "other-sunset",
        name: "Sunset",
        description: "Warm glow",
        background: "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-orange-500 via-red-500 to-purple-500",
        borderColor: "border-orange-300",
        textColor: "text-white",
        accentColor: "bg-orange-500",
        icon: "🌅"
      },
      {
        id: "other-forest",
        name: "Forest",
        description: "Natural beauty",
        background: "bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600",
        borderColor: "border-green-400",
        textColor: "text-white",
        accentColor: "bg-emerald-500",
        icon: "🌲"
      },
      {
        id: "other-cosmic",
        name: "Cosmic",
        description: "Space vibes",
        background: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-indigo-900 to-black",
        borderColor: "border-purple-500",
        textColor: "text-white",
        accentColor: "bg-indigo-500",
        icon: "🌌"
      }
    ]
  };
  
  export const defaultTheme: GiftTheme = occasionThemes.other[0];
  
  export function getThemesByOccasion(occasion: string): GiftTheme[] {
    return occasionThemes[occasion] || occasionThemes.other;
  }