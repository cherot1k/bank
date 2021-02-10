<template>
    <v-content class="justify-center">
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                class="col-6 justify-center mx-auto"
        >


            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    class="col-3"
            ></v-text-field>
            <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    type="password"
                    class="col-3"
            ></v-text-field>


            <v-row justify="center">
              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="sendDate"
              >
                Sign Up
              </v-btn>
              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="loginUser"
              >
                Sign In
              </v-btn>
            </v-row>

        </v-form>
    </v-content>
</template>
<script>
    import firebase from "firebase";
    let db = firebase.firestore()
    export default {
        data: () => ({
            valid: true,
            password: '',
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules:[
                v => !!v || 'Password is required',
              v => (v.length > 8) || 'Password must be at least 8 characters'
            ],
            select: null,
        }),

        methods: {
            async setUpUser(){
                await db.collection('checks')
                    .doc(`${this.$store.getters.token}`)
                    .collection('yourCategories').doc('info').set({
                    Products : 0,
                    Electronic : 0,
                    Health : 0,
                    Property : 0,
                    Clothes : 0,
                    Sport : 0,
                    Transport : 0,
                    Money: 0
                })
              console.log('Ok')
            },
            validate () {
                this.$refs.form.validate()
            },
          async loginUser(){
            let userEmail = this.email
            let userPassword = this.password
            await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            await this.$store.dispatch('setToken',userEmail)
            await this.$store.dispatch('getInfo')
            await this.$store.dispatch('getPosts')
            await this.$router.push('/')
          },
          async sendDate(){
            let userEmail = this.email
            let userPassword = this.password
            firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            })
            await this.$store.dispatch('setToken',userEmail)
            // const info = this.$store.dispatch('getInfo')
            await this.setUpUser()
            await this.$router.push('/')
          }
          },
    }
</script>