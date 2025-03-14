// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'node:fs'

const raw = () => {
  return {
    name: 'raw',
    load(id) {
      if (id.endsWith('?raw')) {
        const content = readFileSync(id.replace('?raw', '')).toString('utf-8')

        return `export default \`${content.replace(/`/g, '\\`')}\``
      }
    },
  }
}

const config = {
  input: 'src/main.js',
  output: {
    esModule: true,
    file: 'dist/index.js',
    format: 'es',
    sourcemap: false,
    compact: true,
    minifyInternalExports: true,
  },
  plugins: [raw(), commonjs(), nodeResolve({ preferBuiltins: true }), terser()],
}

export default config
