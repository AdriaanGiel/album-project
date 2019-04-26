import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';


Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
   storage: window.localStorage
});


export default new Vuex.Store({
   strict: true,
   state:{
       page:1,
       albums:[]
   },
   mutations:{
       setPage(state,page){
           state.page = page;
       },
       setAlbum(state,album){
           state.albums.push(album);
       },
       removeAlbum(state,id){
           state.albums = state.albums.filter((album) => {
               return album.id !== id;
           })
       }
   },
   actions:{
       setPage({commit},page){
           commit('setPage',page);
       },
       setAlbum({commit},album){
           commit('setAlbum',album);
       },
       removeAlbum({commit},id){
           commit('removeAlbum',id);
       }
   },
    plugins:[vuexLocal.plugin]
});