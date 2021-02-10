<template>
    <div>
        <v-app-bar
                app
                color="primary"
                dark
                flat
        >
            <div class="d-flex align-center col-sm-0 col-3 avatar_block"  >
                <v-icon>mdi-head-plus-outline</v-icon>
                <v-toolbar-title class="ml-2"> FINANCE HELPER </v-toolbar-title>
            </div>
            <v-list class="d-flex col-6  justify-center " text color="transparent" >
                <router-link to="/" >  <v-btn class="mr-4 white--text" color="transparent">Home</v-btn></router-link>
                <router-link to="/expence"> <v-btn class="white--text" color="transparent"> Expences </v-btn> </router-link>
                <router-link to="/cabinet"> <v-btn class="white--text ml-4" color="transparent"> My cabinet </v-btn> </router-link>
            </v-list>

            <v-spacer></v-spacer>
            <Per_Mounth class="per_month" v-show="token"/>
            <v-btn fab dark color="transparent" class="exit_btn" @click="exit()" v-show="token">
                <v-icon >mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer app v-if="this.$store.getters.token">
            <h2 class="mx-3">Your checks:</h2>
            <v-list class="col-12">
                <v-list-item class="text-justify-center" v-for="item in validPosts" :key="item.checkName">
                  {{item.checkName}}
                  <v-spacer></v-spacer>
                  {{item.money_spended}}
                </v-list-item>
                <v-row class="justify-end mr-5">
                    <Check></Check>
                </v-row>

            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import Per_Mounth from '../components/Per_Mounth'
    import Check from "./Check"
    import firebase from "firebase"
    const db = firebase.firestore()
    const auth = firebase.auth()
    export default {
        components:{
            Check,
            Per_Mounth
        },
    // mounted() {
    //   this.getPosts()
    // },
    methods:{
       async getPosts(){
           db.collection(`checks`)
               .doc(`${this.$store.getters.token}`)
               .collection('yourChecks')
               .get().then((querySnapshot) => {
                   console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    this.$store.dispatch('addPost',doc.data())
                });
            });
        },
        async exit(){
           await auth.signOut()
            await this.$store.commit('ClearExit')
            await this.$router.push('/reg')
        }
    },
        computed:{
            posts(){
                return this.$store.getters.posts
            },
            token(){
                return this.$store.getters.token
            },
            validPosts(){
                if(this.posts){
                    return this.posts.filter((posts) => posts.checkName)
                }else{
                    return null
                }
            },
        },
        // watch: {
        //     token: function(newValue,oldValue) {
        //         if(!!newValue){
        //           console.log('watch works')
        //             this.getPosts()
        //             // this.getInfo()
        //         }
        //     }
        // },
    }
</script>
<style scoped>
    @media screen and (max-width: 600px) {
        .avatar_block{
            visibility: hidden;
            display: none;
        }
        .exit_btn{
            visibility: hidden;
            display: none;
        }
        .per_month{
            visibility: hidden;
            display: none;
        }
    }
</style>