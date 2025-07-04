import type { Option } from "../components/modals/Editors/DropdownEditorModal"

export const fontSizeOptions: Option[] = [
  { value: 10, text: "10", style : {fontSize :10 } },
  { value: 12, text: "12", style : {fontSize :12 } },
  { value: 14, text: "14", style : {fontSize :14 } },
  { value: 16, text: "16", style : {fontSize :16 } },
  { value: 18, text: "18", style : {fontSize :18 } },
  { value: 20, text: "20", style : {fontSize :20 } },
  { value: 24, text: "24", style : {fontSize :24 } },
  { value: 28, text: "28", style : {fontSize :28 } },
  { value: 32, text: "32", style : {fontSize :32 } },
  { value: 36, text: "36", style : {fontSize :36 } },
  { value: 40, text: "40", style : {fontSize :40 } },
  { value: 48, text: "48", style : {fontSize :48 } },
  { value: 56, text: "56", style : {fontSize :56 } },
  { value: 64, text: "64", style : {fontSize :64 } },
  { value: 72, text: "72", style : {fontSize :72 } },
]

export const lineHeightOptions: Option[] = [
  { value: 1, text: "1", style : {} },
  { value: 1.25, text: "1.25", style : {} },
  { value: 1.5, text: "1.5", style : {} },
  { value: 1.75, text: "1.75", style : {} },
  { value: 2, text: "2", style : {} },
  { value: 2.5, text: "2.5", style : {} },
  { value: 3, text: "3", style : {} },
]

export const heightOptions: Option[] = [
  { value: 16, text: "16", style : { height : 16} },
  { value: 20, text: "20", style : { height : 20} },
  { value: 24, text: "24", style : { height : 24} },
  { value: 28, text: "28", style : { height : 28} },
  { value: 32, text: "32", style : { height : 32} },
  { value: 36, text: "36", style : { height : 36} },
  { value: 40, text: "40", style : { height : 40} },
  { value: 48, text: "48", style : { height : 48} },
  { value: 56, text: "56", style : { height : 56} },
  { value: 64, text: "64", style : { height : 64} },
  { value: 72, text: "72", style : { height : 72} },
  { value: 80, text: "80", style : { height : 80} },
  { value: 96, text: "96", style : { height : 96} }
]

export const fontWeightOptions: Option[] = [
  { value: 300, text: "Light", style: { fontWeight: 300 } },
  { value: 400, text: "Normal", style: { fontWeight: 400 } },
  { value: 700, text: "Bold", style: { fontWeight: 700 } }
]

export const fontFamilyOptions: Option[] = [
  // Sans-serif
  { value : "sans-serif", text: "sans-serif", style : {fontFamily : "sans-serif"}},
  { value: "'Roboto', sans-serif", text: "Roboto" , style : {fontFamily : "'Roboto', sans-serif"}},
  { value: "'Open Sans', sans-serif", text: "Open Sans" , style : {fontFamily : "'Open Sans', sans-serif"}},
  { value: "'Lato', sans-serif", text: "Lato" , style : {fontFamily : "'Lato', sans-serif"}},
  { value: "'Montserrat', sans-serif", text: "Montserrat" , style : {fontFamily : "'Montserrat', sans-serif"}},
  { value: "'Inter', sans-serif", text: "Inter" , style : {fontFamily : "'Inter', sans-serif"}},
  { value: "'Nunito', sans-serif", text: "Nunito" , style : {fontFamily : "'Nunito', sans-serif"}},
  { value: "'Poppins', sans-serif", text: "Poppins" , style : {fontFamily : "'Poppins', sans-serif"}},
  { value: "'Ubuntu', sans-serif", text: "Ubuntu" , style : {fontFamily : "'Ubuntu', sans-serif"}},
  { value: "'Work Sans', sans-serif", text: "Work Sans" , style : {fontFamily : "'Work Sans', sans-serif"}},
  { value: "'DM Sans', sans-serif", text: "DM Sans" , style : {fontFamily : "'DM Sans', sans-serif"}},

  // Serif
  { value: "'Merriweather', serif", text: "Merriweather", style : { fontFamily : "'Merriweather', serif"} },
  { value: "'Playfair Display', serif", text: "Playfair Display", style : { fontFamily : "'Playfair Display', serif"} },
  { value: "'Lora', serif", text: "Lora", style : { fontFamily : "'Lora', serif"} },
  { value: "'Crimson Text', serif", text: "Crimson Text", style : { fontFamily : "'Crimson Text', serif"} },
  { value: "'Cormorant Garamond', serif", text: "Cormorant Garamond", style : { fontFamily : "'Cormorant Garamond', serif"} },

  // Monospace
  { value: "'Fira Code', monospace", text: "Fira Code", style : {fontFamily : "'Fira Code', monospace"} },
  { value: "'JetBrains Mono', monospace", text: "JetBrains Mono", style : {fontFamily : "'JetBrains Mono', monospace"} },
  { value: "'Courier Prime', monospace", text: "Courier Prime", style : {fontFamily : "'Courier Prime', monospace"} },
  { value: "'Inconsolata', monospace", text: "Inconsolata", style : {fontFamily : "'Inconsolata', monospace"} },
  { value: "'Source Code Pro', monospace", text: "Source Code Pro", style : {fontFamily : "'Source Code Pro', monospace"} },

  // Cursive / Decorative
  { value: "'Comic Neue', cursive", text: "Comic Neue" , style : {fontFamily : "'Comic Neue', cursive"}},
  { value: "'Dancing Script', cursive", text: "Dancing Script" , style : {fontFamily : "'Dancing Script', cursive"}},
  { value: "'Pacifico', cursive", text: "Pacifico" , style : {fontFamily : "'Pacifico', cursive"}},
  { value: "'Shadows Into Light', cursive", text: "Shadows Into Light" , style : {fontFamily : "'Shadows Into Light', cursive"}},
  { value: "'Satisfy', cursive", text: "Satisfy", style : {fontFamily : "'Satisfy', cursive"} }
]

