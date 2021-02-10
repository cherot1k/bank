<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on" v-show="token">
                    <span class="mr-2">Balanse: {{money.Money}}$</span>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Input your profit:</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="12">
                                <v-text-field v-model="profit" label="Profit" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="addMoney">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import firebase from 'firebase/app'
    let db = firebase.firestore()

    export default {
        data: () => ({
            dialog: false,
            profit: 0
        }),
        computed:{
            money(){
                return this.$store.getters.info 
            },
            token(){
                return this.$store.getters.token
            }
        },
        //TODO разобраться с бардаком с сторе(секция modules)
        methods:{
            async addMoney(){
                if(this.profit){
                    console.log(this.token)
                    await this.addMoneyInDb()
                    // await this.getMoney()
                    this.profit = 0
                    this.dialog = false
                    this.$forceUpdate()
                }
            },
            async addMoneyInDb(){
               await db.collection('checks')
                   .doc(`${this.token}`)
                   .collection('yourCategories').doc('info').update({
                   Money: this.money.Money + parseInt(this.profit)
               })
              await this.$store.dispatch('getInfo')
            }

        },
    }
</script>