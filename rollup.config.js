// rollup.config.js
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sizes from 'rollup-plugin-sizes'
import visualizer from 'rollup-plugin-visualizer'

export default {
  input: 'src/index.ts',
  output: {
    dir: '.',
    format: 'cjs',
  },
  plugins: [
    nodeResolve({ browser: true, moduleDirectories: ['../../node_modules'] }),
    commonjs(),
    typescript({
      target: 'es5',
      tsconfig: false,
    }),
    sizes(),
    visualizer(),
  ],
}
