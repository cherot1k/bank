<template>
    <v-container>
        <template>
            <v-data-table
                    :headers="headers"
                    :items="validPosts"
                    item-key="name"
                    class="elevation-1 col-12"
            >
            </v-data-table>
        </template>
    </v-container>
</template>

<script>
    export default {
        computed:{
            posts(){
                return this.$store.getters.posts
            },
            validPosts(){
                return this.posts.filter((post) => post.checkName)
            }
        },
        data () {
            return {
                headers: [
                    {
                        text: 'Название покупки',
                        align: 'start',
                        sortable: false,
                        value: 'checkName',
                    },
                    { text: 'Сумма траты', value: 'money_spended' },
                    { text: 'Категория', value: 'category' },
                    { text: 'Деньги до', value: 'money_before' },
                    { text: 'Деньги после', value: 'money_after' },
                ],

            }
        },
    }
</script>
