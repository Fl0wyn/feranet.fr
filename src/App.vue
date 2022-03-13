<template>
  <v-app>
    <Navbar />

    <!-- <go-top :size="50" bg-color="#2d88ed"></go-top> -->
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
/* import GoTop from "@inotom/vue-go-top"; */

export default {
  name: "App",
  components: {
    Navbar,
    /* GoTop, */
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.breadcrub-sheet {
  box-shadow: 0 8px 10px -9px rgba(0, 0, 0, 0.05),
    0 3px 14px 2px rgba(0, 0, 0, 0.01), 0 5px 5px -3px rgba(0, 0, 0, 0.05);
}
</style>
