import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null
    },
    mutations: {
        SetTOKEN(state,token){
            state.token = token
        }
    },
    actions: {
        setToken(ctx,token){
            ctx.commit('SetTOKEN',token)
        }
    },
    modules: {
    },
    getters:{
        // token: s => s.token()
    }
})