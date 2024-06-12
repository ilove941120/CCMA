import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      ':@': '/src',
    },
  },
  server:{
    open:true,
    host:"127.0.0.1",
    port:3002,
    proxy:{
      "/api":{
        target:"http://localhost:3000",
        changeOrigin:true,
        rewrite(path){
          return path.replace(/^\/api/,'')
        }
      }
    }
  }
})
