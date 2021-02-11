<template>
  <v-container>
    <v-row class="text-center ma-12">
      <v-col cols="12">
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome
        </h1>

        <p class="subheading font-weight-regular">
          Our app is made for help people to
          <br>to control their finances
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          What's can we offer you?
        </h2>

        <v-row justify="center">
          <a class="mx-2"> Register checks </a>
          <a class="mx-2"> Show finance categories </a>
          <a class="mx-2"> Control your money expenses </a>
        </v-row>
      </v-col>
      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Why our app?
        </h2>

        <v-row class="justify-space-between pb-5">
          <v-col md="4" lg="4" cols="12" >
            <h2>Safety</h2>
            <h4>Main purpose of our company is to make information about our users confidence.</h4>
          </v-col>
          <v-col md="4" lg="4" cols="12">
            <h2>User-friendly</h2>
            <h4>We know that easier is better, that is the main cause why our interface is user-friendly.</h4>
          </v-col>
          <v-col md="4" lg="4" cols="12" >
            <h2>Feedback</h2>
            <h4>We know that our app is not ideal, that's why we check all the opinions of users is our social media and try to make our app greater.</h4>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
  }
</script>
