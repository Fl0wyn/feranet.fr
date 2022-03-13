<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary app>
      <div class="title py-4 pl-6 text--secondary">Tools Feranet</div>

      <v-list dense class="mt-4">
        <v-list-item v-for="item in nav" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <router-link class="ml-4" to="/" custom v-slot="{ navigate }">
        <span @click="navigate" @keypress.enter="navigate" role="button">
          <v-toolbar-title class="mr-8" style="opacity: 0.87"
            >Feranet</v-toolbar-title
          ></span
        >
      </router-link>

<!--       <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Rechercher une applications"
        class="hidden-sm-and-down"
      /> -->
      <v-spacer></v-spacer>

      <v-btn
        icon
        href="https://github.com/Fl0wyn/feranet.fr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div style="overflow: hidden">
        <v-sheet
          class="breadcrub-sheet d-flex align-center black--text pl-5"
          style="
            position: relative;
            z-index: 2;
            box-shadow: 0 8px 10px -9px rgba(0, 0, 0, 0.05),
              0 3px 14px 2px rgba(0, 0, 0, 0.01),
              0 5px 5px -3px rgba(0, 0, 0, 0.05);
          "
          height="32"
        >
          Outils web pour les administrateurs<v-icon>mdi-chevron-right</v-icon>
          <b>
            {{ $route.name }}
          </b>
        </v-sheet>
        <div style="z-index: 1; position: relative">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    nav: [
      {
        title: "Information",
        icon: "mdi-information-outline",
        to: "/vue/Information",
      },
    ],
  }),
  methods: {
    nop() {
      // nothing
    },
  },
};
</script>

<style>
.goToHome:hover {
  cursor: pointer;
}
</style>