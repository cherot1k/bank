import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [{name:"govno"}],
        balance:null
    },
    mutations: {
        SetPOSTS(state,posts){
            state.posts = posts
            console.log('ZBS')
        }
    },
    actions: {
        setPosts(ctx,posts){
            ctx.commit('SetPOSTS',posts);
        }
    },
    getters:{
        // getPosts: s => s.posts
    }
})