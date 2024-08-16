/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Primary */
        SCModerateblue: "hsl(238, 40%, 52%)",
        SCSoftRed: "hsl(358, 79%, 66%)",
        SCLightgrayishblue: "hsl(239, 57%, 85%)",
        SCPalered:" hsl(357, 100%, 86%)",

        /* ### Neutral */

        SCDarkblue: "hsl(212, 24%, 26%)",
        SCGrayishBlue: "hsl(211, 10%, 45%)",
        SCSDarkblue: "hsl(212, 24%, 26%, 0.6)",
        SCLightgray: "hsl(223, 19%, 93%)",
        SCVerylightgray: "hsl(228, 33%, 97%)",
        SCWhite: "hsl(0, 0%, 100%)"

      },
      fontFamily: {
        "Rubik-B" : ["Rubik-B"],
        "Rubik-V": ["Rubik-V"],
        "Rubik-R" : ["Rubik-R"]
      }
    },
  },
  plugins: [],
}

