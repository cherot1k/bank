<template>
    <v-footer
            class="font-weight-medium"
            height="70px"
    >
        <v-col
                class="text-center"
                cols="12"
        >
            <v-row class="col-12 justify-center">
                    <v-btn class="mx-2" v-for="item in icons" outlined fab  :href=item.href icon>
                        <v-icon  >{{item.text}}</v-icon>
                    </v-btn>
            </v-row>
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        data(){
            return{
                icons:[
                    { text:"mdi-twitter", href:"http://twitter.com"},
                    {text: "mdi-vk" , href:"http://vk.com"},
                    {text: "mdi-telegram", href: "http://telegram.com"},
                    {text: "mdi-youtube", href: "http://youtube.com"}
                ]
            }
        }
    }
</script>