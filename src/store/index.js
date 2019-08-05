import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'

Vue.use(Vuex)
 const state={}

 export default new Vuex.Store({
    state,
   modules:{
     data
   }
 })
