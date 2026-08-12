// Tailwind v4 ships as a PostCSS plugin outside Vite. The CSS itself is
// unchanged — @theme, @theme inline, @custom-variant and @utility all work
// identically here.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
