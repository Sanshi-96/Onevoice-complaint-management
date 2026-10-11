export const theme = {
  colors: {
    // Brand colors
    primary: "#B80000",      // OneVoice red
    dark: "#141414",         // Dark text / dark background
    light: "#FFFFFF",        // White

    // Semantic / utility colors
    textPrimary: "#141414",
    textOnDark: "#FFFFFF",
    border: "#E5E5E5",
    softBg: "#FFF5F5",
    muted: "#6B7280",
    success: "#15803D",
    warning: "#F59E0B",
    danger: "#B80000",
  },

fonts: {
  primary: "'Inter', sans-serif",
  secondary: "'Inter', sans-serif",
},

  cls: {
    // Layout
    page: "min-h-screen bg-softBg text-dark font-lato",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",

    // Typography
    heading: "text-3xl md:text-4xl font-black text-primary font-lato",
    subheading: "text-xl md:text-2xl font-bold text-dark font-lato",
    paragraph: "text-sm md:text-base text-dark/80 font-lato",
    smallText: "text-xs md:text-sm text-gray-500 font-lato",

    // Navigation
    navbar: "bg-primary text-white px-6 py-4 flex items-center justify-between shadow-md",
    navTitle: "text-xl md:text-2xl font-black tracking-wide",

    // Cards
    card: "bg-white rounded-2xl shadow-card p-6",
    statCard: "bg-primary text-white rounded-2xl shadow-card p-6 flex flex-col items-center justify-center min-h-[130px]",
    statTitle: "text-sm md:text-base font-bold text-white text-center",
    statNumber: "text-3xl font-black text-white mt-2",

    // Buttons
    btnPrimary: "bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-red-800 transition",
    btnSecondary: "bg-white text-primary border border-primary px-5 py-3 rounded-xl font-bold hover:bg-red-50 transition",
    btnSmall: "bg-primary text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-red-800 transition",

    // Forms
    input: "w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary",
    textarea: "w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[120px]",
    select: "w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white",

    // Tables
    tableWrapper: "overflow-x-auto rounded-xl border border-gray-200",
    table: "w-full min-w-[1100px] border-collapse bg-white",
    th: "bg-primary text-white px-4 py-3 text-left text-sm font-bold",
    td: "border-b border-gray-200 px-4 py-3 text-sm text-dark",

    // Tabs
    tabs: "flex flex-wrap gap-3 mb-6",
    tabBtn: "bg-primary text-white px-5 py-3 rounded-xl font-bold hover:bg-red-800 transition",

    // Chatbot
    chatButton: "fixed bottom-5 right-5 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg cursor-pointer",
    chatWindow: "fixed bottom-24 right-5 w-[360px] bg-white rounded-2xl shadow-2xl p-5 z-50",
    chatSuggestion: "bg-primary text-white rounded-full px-3 py-2 text-sm font-bold hover:bg-red-800 transition",
    userBubble: "self-end bg-primary text-white px-4 py-3 rounded-2xl max-w-[80%]",
    botBubble: "self-start bg-gray-100 text-dark px-4 py-3 rounded-2xl max-w-[80%]",
  },
};