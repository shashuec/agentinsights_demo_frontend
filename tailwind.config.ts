import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'pricing-gradient': "linear-gradient(99.45deg, rgba(207, 246, 254, 0.32) 5.65%, rgba(191, 244, 255, 0.51) 14.88%, rgba(145, 189, 255, 0.292255) 48.78%, rgba(238, 212, 250, 0.32) 79.47%, rgba(238, 239, 180, 0.28) 94.28%)",
          'hero-gradient': "linear-gradient(96.41deg, rgba(204, 209, 255, 0.08) 5.15%, rgba(197, 151, 255, 0.08) 16%, rgba(255, 238, 196, 0.11) 57.92%, rgba(251, 98, 217, 0.04) 78.63%, rgba(255, 255, 255, 0) 99.83%)",
          'offer-gradient': 'linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))', 
      },
      colors: {
        gold: '#ffd700',
      },
      boxShadow: {
        'even': '0 0 15px rgba(0, 0, 0, 0.1)',
      },
      lineHeight: {
        '48': '48px',  // Custom line-height class
      },
      
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config

