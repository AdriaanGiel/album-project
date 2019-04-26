import VueRouter from 'vue-router';

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path:'/',
            name:'home',
            component: require('../pages/front/albums')
        },
        {
            path:'/albums',
            name:'albums',
            component: require('../pages/front/albums')
        },
        {
            path:'/albums/create',
            name:'album-create',
            component: require('../pages/front/create')
        },
        {
            path:'/albums/edit/:id',
            name:'album-update',
            component: require('../pages/front/album')
        },
        {
            path:'/albums/:id',
            name:'album',
            component: require('../pages/front/album')
        }
    ]
});

