import sourceMaps from 'rollup-plugin-sourcemaps';

const pkg = require('./package.json');

export default {
  input: 'dist/lib/index.js',
  output: [
    { file: pkg.main, name: pkg.name, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  plugins: [sourceMaps()],
};
