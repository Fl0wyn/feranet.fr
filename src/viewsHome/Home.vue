<template>
  <div>
    <v-container fluid class="px-6 px-sm-12">
      <v-row>
        <v-col lg="3">
          <v-card style="height: 100%" outlined>
            <v-card-title class="primary--text pb-0 d-flex"> </v-card-title>
            <v-list nav dense v-for="(next, i) in Creations" :key="i">
              <v-list-item :alt="'logo_' + next.text" :href="next.href">
                <v-list-item-content>
                  <v-list-item-title class="primary--text">{{
                    next.text
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="mt-6 px-6 px-sm-12 white">
      <h2>Réseaux</h2>
      <v-row class="home-panels-grid">
        <v-col
          v-for="card in Networks"
          :key="card.title"
          class="d-flex flex-column align-center"
          :class="{
            'home-panels-grid__col--custom-col': $vuetify.breakpoint.lgAndUp,
          }"
          cols="6"
          sm="4"
          md="3"
        >
          <panel-card
            :icon="card.icon"
            :title="card.title"
            :description="card.description"
            :to="card.action"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-divider dark></v-divider>
    <v-container fluid class="px-6 px-sm-12 white">
      <h2>Autres</h2>
      <v-row class="home-panels-grid">
        <v-col
          v-for="card in Others"
          :key="card.title"
          class="d-flex flex-column align-center"
          :class="{
            'home-panels-grid__col--custom-col': $vuetify.breakpoint.lgAndUp,
          }"
          cols="6"
          sm="4"
          md="3"
        >
          <panel-card
            :icon="card.icon"
            :title="card.title"
            :description="card.description"
            :to="card.action"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import PanelCard from "@/components/PanelCard/PanelCard.js";

export default {
  name: "Home",
  components: {
    PanelCard,
  },
  data: () => ({
    Creations: [
      {
        text: "Wiki",
        info: "Mon pense bête sur des commandes, des fichiers de configuration, etc ...",
        href: "https://wiki.feranet.fr/",
        icon: "courses.png",
      },
      {
        text: "Dribbble",
        info: "Mes créations d'images et de logos.",
        href: "https://dribbble.com/Fl0wyn",
        icon: "dribbble.png",
      },
    ],
    Networks: [
      {
        icon: "assets/ip-address.png",
        title: "Votre adresse IP",
        description:
          "Afficher les informations de l'adresse IP et du navigateur",
        action: "/ip",
      },
      {
        icon: "assets/speedometer.png",
        title: "Test de débit",
        description: "Test de débit internet utilisant l'outil d'Ookla",
        action: "/speedtest",
      },
      {
        icon: "assets/hips.png",
        title: "Scan de port",
        description:
          "Tester si le port d'une adresse IP ou d'un domaine est ouvert",
        action: "/scanport",
      },
      {
        icon: "assets/server.png",
        title: "Information DNS",
        description:
          "Afficher les informations DNS d'une adresse IP ou d'un domaine",
        action: "/dns",
      },
      {
        icon: "assets/whois--v1.png",
        title: "Informations WHOIS",
        description: "Afficher les informations WHOIS d'un domaine ",
        action: "/whois",
      },
    ],
    Others: [
      {
        icon: "assets/console.png",
        title: "Shell stylisé",
        description: "Outil pour styliser vos scripts bash",
        action: "/ShellStyle",
      },
      {
        icon: "assets/password.png",
        title: "Générateur de mot de passe",
        description: "Générer un mot de passe aléatoire",
        action: "/password",
      },
      {
        icon: "assets/hashtag-key.png",
        title: "Convertisseur de hash",
        description: "Hasher une chaine de caractère",
        action: "/hash",
      },
    ],
  }),
};
</script>

<style lang="scss">
.home-panels-grid__col--custom-col {
  flex: 0 0 12%;
}
</style>
