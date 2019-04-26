require('./bootstrap');
import Store from './store/store';
import routes from './routes/routes';
import PageLayout from './pages/front/layout';

const vue = new Vue({
    el: '#app',
    router: routes,
    components:{
        "page-layout": PageLayout
    },
    store:Store
});