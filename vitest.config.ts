import { defineConfig } from 'vitest/config'
// import Vue from '@vitejs/plugin-vue-jsx'
import Vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [Vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => ['section-title', 'sidebar-menu', 'user-img', 'NuxtPage', 'btn-add', 'options-btn', 'input-text', 'icon', 'input-textarea', 'btn', 'dialog-modal'].includes(tag),
          }
        }
      })],
    test: {
        globals: true,
        environment: 'jsdom'
    },
})