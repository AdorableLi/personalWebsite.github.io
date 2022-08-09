// import Router from 'vue-router';
// import Vue from 'vue';
// Vue.use(Router);

// export default new Router({
//     mode: 'hash',
//     base: process.env.BASE_URL,
//     routes: [
//         {
//             path: '/indexPage',
//             name: 'indexPage',
//             component: resolve => require(['../components/indexPage'], resolve),
//         },
//         {
//             path: '*',
//             redirect: '/indexPage',
//         },
//     ],
// });

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    { path: '/', redirect: '/indexPage' },
    {
        path: '/indexPage',
        name: 'indexPage',
        component: () => import('../components/indexPage.vue'),
    },
    // {
    //     path: '/indexPage',
    //     name: 'indexPage',
    //     component: resolve => require(['../components/indexPage'], resolve),
    // },
    // {
    //     path: '*',
    //     redirect: '/indexPage',
    // },
];

const router = createRouter({
    history: createWebHashHistory(), // hash路由模式
    // history: createWebHistory(),  // history路由模式
    routes,
});

export default router;
