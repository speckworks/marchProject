import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-navy': '#1B365D',
        'custom-teal': '#5AA9A1',
        'custom-cream': '#F9E0AE',
        'custom-peach': '#FF9677',
        'custom-coral': '#FF6B6B',
        'bright-green': '#00D632',
      },
    },
  },
  plugins: [],
};

export default config; 