import App from './App.vue';
import { createApp } from 'vue';
import router from './router/index';

createApp(App).use(router).mount('#app');

// import Vue from 'vue';
// import App from './App.vue';
// // import common from './assets/js/common';
// import router from './router/index';

// Vue.config.productionTip = true;
// new Vue({
//     App,
//     router,
//     template: '<App/>',
//     components: { App },
//     render: h => h(App),
// }).$mount('#app');
