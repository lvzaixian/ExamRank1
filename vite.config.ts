import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,  // 使用高端口避免权限问题
    strictPort: false,  // 端口被占用时自动尝试下一个
  },
  esbuild: {
    jsx: 'automatic',
  },
})
