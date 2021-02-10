<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        v-bind="attrs"
                        v-on="on"
                        fab
                        small
                >
                    <v-icon >mdi-plus-thick</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Add your check:</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Purchase name*" v-model="checkName" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-select
                                        :items="['Products','Electronic','Health','Property','Sport','Transport','Clothes']"
                                        label="Category*"
                                        required
                                        v-model="category"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Price*" required v-model="amount"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="addCheck">Save</v-btn>
                </v-card-actions>
              <v-subheader class="red--text">
                {{errorText}}
              </v-subheader>
            </v-card>

        </v-dialog>
    </v-row>
</template>

<script>
    import firebase from 'firebase/app'
    import Snackbar from "@/components/Snackbar";
    let db = firebase.firestore()

    export default {
      components:{
        Snackbar
      },
        data: () => ({
            dialog: false,
            checkName: '',
            category:'',
            amount: 0,
            errorText:'',
            // showSnack:false
        }),
    computed:{
            info(){
                return this.$store.getters.info
            },
        token(){
                return this.$store.getters.token
        }
    },
        methods:{
           async addCheck(){
                let currentAmountOfMoney = this.$store.getters.getAmount
                if(parseInt(this.amount)> currentAmountOfMoney){
                  this.errorText = 'Action was denied (price is higher than you get money)'
                  return
                }
                const myCheck = {
                    checkName: this.checkName,
                    category:this.category,
                    money_before: currentAmountOfMoney,
                    money_after: currentAmountOfMoney - parseInt(this.amount),
                    money_spended: parseInt(this.amount)
                }
                db.collection(`checks`)
                    .doc(`${this.$store.getters.token}`)
                    .collection('yourChecks')
                    .doc(`${Math.random()*9000 + 1000}`)
                    .set({
                        checkName: this.checkName,
                        category:this.category,
                        money_before: currentAmountOfMoney,
                        money_after: currentAmountOfMoney - parseInt(this.amount),
                        money_spended: parseInt(this.amount)
                    }).then(() => console.log('document written'))
                    .catch(() => console.log('error'))
                const dbInfo = this.info
                switch (this.category) {
                    case "Products":
                       await db.collection('checks')
                            .doc(`${this.token}`)
                            .collection('yourCategories').doc('info').update({
                             Products: dbInfo.Products + parseInt(this.amount),
                               Money: dbInfo.Money - parseInt(this.amount)
                           })
                        break
                    case "Electronic":
                        await db.collection('checks')
                            .doc(`${this.token}`)
                            .collection('yourCategories').doc('info').update({
                                Electronic: dbInfo.Electronic + parseInt(this.amount),
                                Money: dbInfo.Money - parseInt(this.amount)
                            })
                        break
                    case "Health":
                        await db.collection('checks')
                            .doc(`${this.token}`)
                            .collection('yourCategories').doc('info').update({
                                Health: dbInfo.Health + parseInt(this.amount),
                                Money: dbInfo.Money - parseInt(this.amount)
                            })
                        break
                    case "Property":
                        await db.collection('checks')
                            .doc(`${this.token}`)
                            .collection('yourCategories').doc('info').update({
                              Property: dbInfo.Property + parseInt(this.amount),
                                Money: dbInfo.Money - parseInt(this.amount)
                            })

                        break
                    case "Sport":
                        await db.collection('checks')
                            .doc(`${this.token}`)
                            .collection('yourCategories').doc('info').update({
                                Sport: dbInfo.Sport + parseInt(this.amount),
                                Money: dbInfo.Money - parseInt(this.amount)
                            })

                        break
                    case "Transport":
                        await db.collection('checks')
                            .doc(`${this.token}`)
                            .collection('yourCategories').doc('info').update({
                                Transport: dbInfo.Transport + parseInt(this.amount),
                                Money: dbInfo.Money - parseInt(this.amount)
                            })

                        break
                     case "Clothes":
                         await db.collection('checks')
                             .doc(`${this.token}`)
                             .collection('yourCategories').doc('info').update({
                                Clothes: dbInfo.Clothes + parseInt(this.amount),
                                 Money: dbInfo.Money - parseInt(this.amount)
                             })
                         break
                  default: await this.$store.dispatch('getInfo')
                }
                await this.addCheckLocaly(myCheck)
                await this.$store.dispatch('reduceAmount',this.amount)
                this.dialog = false
            },
            addCheckLocaly(post){
                this.$store.dispatch('addPost',post)
            },
        }
    }
</script>