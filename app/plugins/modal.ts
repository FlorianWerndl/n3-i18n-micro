import { createVfm } from 'vue-final-modal';

export default defineNuxtPlugin({
  name: 'modal',
  parallel: true,
  setup(nuxtApp) {
    const vfm = createVfm();
    nuxtApp.vueApp.use(vfm);
  },
});
