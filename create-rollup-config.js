import sourceMaps from 'rollup-plugin-sourcemaps';

export function createRollupConfig(pkg) {
  return {
    input: 'dist/lib/index.js',
    output: [
      { file: pkg.main, name: pkg.name, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [sourceMaps()],
  };
}
