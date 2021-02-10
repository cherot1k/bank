import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts:  [],
    token: null,
    info : {
      Money:null
    }
  },
  mutations: {
    SetPOSTS(state,posts){
      state.posts = posts
    },
    SetTOKEN(state,token){
      state.token = token
    },
    AddPOST(state,post){
     // state.posts.push(post)
      let array = state.posts
      array.push(post)
      state.posts = array
    },
    GetPOSTS(state){
      return state.posts
    },
    SetINFO(state,info){
      state.info = info
    },
    ChangeAmount(state,params){
      if(params.todo === 'plus'){
        state.info.Money = state.info.Money + params.toChange
      }else if(params.todo === 'minus'){
        state.info.Money = state.info.Money - params.toChange
      }
    },
    SetAmount(state,amount){
      state.info.Money = amount
    },
    ClearExit(state){
      state.token = null
      state.info = { Money: null}
      state.posts = []
    },
    AddAmount(state,money){
      state.info.Money = state.info.Money + money
    },
    ReduceAmount(state,money){
      state.info.Money = state.info.Money - money
    }
  },
  actions: {
    setPosts(ctx,posts){
      ctx.commit('SetPOSTS',posts);
    },
    setToken(ctx,token){
      ctx.commit('SetTOKEN',token)
    },
    addPost(ctx,post){
      if(post!== null && post!== undefined){
        ctx.commit('AddPOST', post)
      }
    },
    async setAmount(ctx,amount){
      console.log('Amount =' +amount)
      ctx.commit('SetAmount',amount)
    },
    async setInfo(ctx,info){
      console.log(info)
      ctx.commit('SetINFO',info)
    },
      async getInfo(context){
      const db = firebase.firestore()
        const info = await db.collection('checks')
            .doc(`${context.getters.token}`)
            .collection('yourCategories').doc('info').get()
        context.commit('SetINFO',info.data())
        console.log(info.data())
        return info
      },
    async getPosts(context){
      const db = firebase.firestore()
      db.collection(`checks`)
          .doc(`${context.getters.token}`)
          .collection('yourChecks')
          .get().then((querySnapshot) => {
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          context.dispatch('addPost',doc.data())
        });
      });
    },
    addAmount(ctx,amount){
      ctx.commit('AddAmount',amount)
    },
    reduceAmount(ctx,amount){
      ctx.commit('ReduceAmount',amount)
    }
  },
  getters:{
    posts: s => s.posts,
    token: s => s.token,
    info: s => s.info,
    getAmount: s=> s.info.Money
  },

})
