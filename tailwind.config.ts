import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'lblue' : '#B1CACE',
        'dblue' : '#00529E',
        'lred' : '#F29999',
        'dred' : '#E50000',
        'lgreen' : '#C1F299',
        'dgreen' : '#006110',
        'lgray' : '#DDDDDD',
        'dgray' : '#5C5757',
        'textGray' : '#545454',
        'lmagenta' : '#F099F2',
        'dmagenta' : '#C500E5',
        'status': 'rgba(255, 255, 255, 0.75)'
      },
      fontFamily: {
        'LuckiestGuy':'LuckiestGuy',
        'RobotoBold':'RobotoBold',
        'Roboto':'Roboto'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
export default config;
