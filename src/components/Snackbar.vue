<template>
  <v-snackbar
      v-model="snackbar"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
 export default {
   props:{
     text: {
       type:String,
       required:true
     }
   },
   data(){
     return{
       snackbar: true
     }
   }
 }
</script>