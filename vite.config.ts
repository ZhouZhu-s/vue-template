import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import vitePluginHtmlEnv from 'vite-plugin-html-env';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  /**
   * project directory
   */
  const root = process.cwd();
  /**
   * env
   */
  const { VITE_PORT, VITE_HOST, VITE_PROXY_URL } = loadEnv(mode, root);

  return {
    /**
     * fix: The esm-bundler builds now exposes global feature flags that can be overwritten at compile time
     * see: https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
     */
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    /**
     *  VITE_ 开头的环境变量会通过 import.meta.env 暴露客户端源码
     */
    envPrefix: 'VITE_',
    plugins: [
      vue(),
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      }),
      vitePluginHtmlEnv({
        compiler: true,
      }),
      /**
       * 浏览器适配
       */
      legacy({
        targets: ['chrome 80'],
      }),
      /**
       * jsx/tsx support
       */
      vueJsx(),
      /**
       * vant ui load on demand
       */
      Components({
        resolvers: [VantResolver()],
        dts: 'auto-import.d.ts',
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
        exclude: [
          /[\\/]node_modules[\\/]/,
          /[\\/]\.git[\\/]/,
          /[\\/]\.src[\\/]/,
        ],
      }),
      /**
       * gzip
       */
      viteCompression(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve('src') }],
    },
    /**
     * development server
     */
    server: {
      host: VITE_HOST,
      port: Number(VITE_PORT),
      proxy: {
        '^/proxy/.*': {
          target: VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, ''),
        },
      },
    },
    /**
     * build options
     */
    build: {
      /**
       * build source map file
       */
      sourcemap: false,
    },
  };
});
