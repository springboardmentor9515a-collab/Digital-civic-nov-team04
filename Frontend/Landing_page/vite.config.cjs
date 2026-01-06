const path = require('path')
const os = require('os')
const react = require('@vitejs/plugin-react')

module.exports = {
  cacheDir: path.join(os.tmpdir(), 'vite-cache-landing-page'),
  plugins: [react()],
}
