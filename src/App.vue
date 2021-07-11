<template>
  <v-app>
    <v-app-bar
      app
      color="#2f4a65"
      dark
      height="100px"
    >
      <v-img transition="fade" :src="require('@/assets/nethernite.png')"
             height="50px" contain
             @click="$router.push('/').catch(() => {})"
             style="cursor: pointer"
      ></v-img>

    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-scroll-y-reverse-transition hide-on-leave>
          <router-view/>
        </v-scroll-y-reverse-transition>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },

  data: () => ({

  }),
  methods: {

  },
};
</script>
