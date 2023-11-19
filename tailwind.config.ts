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
      },
    },
  },
  plugins: [],
}
export default config
