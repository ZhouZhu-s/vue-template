import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import vitePluginHtmlEnv from 'vite-plugin-html-env';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import antDesignThemeVars from './src/theme/ant-design-vars';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }): UserConfig => {
  /**
   * project directory
   */
  const root = process.cwd();
  /**
   * get env file
   */
  const { VITE_PORT, VITE_GLOB_API_URL } = loadEnv(mode, root);

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
       * jsx/tsx support
       */
      vueJsx(),
      /**
       * ant-design-vue ui load on demand
       */
      Components({
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: 'less',
          }),
        ],
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
    /**
     * custom theme
     */
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: antDesignThemeVars,
        },
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve('src') }],
    },
    server: {
      host: '0.0.0.0',
      port: Number(VITE_PORT),
      proxy: {
        '^/proxy/.*': {
          target: 'http://127.0.0.1:3000',
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
