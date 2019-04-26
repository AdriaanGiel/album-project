import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMDCAdapter from 'vue-mdc-adapter'
import VueMeta from 'vue-meta-info';
import Swal from 'sweetalert2';


window.Vue = Vue;
window.VueRouter = VueRouter;
window.Swal = Swal;

Vue.use(VueRouter);
Vue.use(VueMDCAdapter);
Vue.use(VueMeta);
