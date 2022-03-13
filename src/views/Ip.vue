<template>
  <div>
    <v-container class="mt-3">
      <v-card
        flat
        class="
          d-flex
          flex-column
          justify-space-between
          align-center
          text-center
        "
      >
        <v-card-title class="font-weight-bold text-h4">
          {{ $route.name }}
        </v-card-title>
      </v-card>

      <v-card
        flat
        class="
          d-flex
          flex-column
          justify-space-between
          align-center
          text-center
        "
      >
        <section class="mt-6" v-if="error">
          <v-alert type="error" outlined border="left">
            Impossible de récupérer ces informations pour le moment.
            <br />
            Veuillez réessayer ultérieurement.
            <br />
            Code d'erreur HTTP : <b>{{ status }}</b>
          </v-alert>
        </section>

        <v-card-title
          v-else
          @click="doCopy"
          class="
            ma-8
            doCopy
            font-weight-bold
            text-h4
            blue-grey--text
            text--darken-2
          "
        >
          {{ info.ip }}
        </v-card-title>

        <v-divider dark class="ma-4"></v-divider>

        <v-row>
          <v-card flat :width="width"
            ><h2>Fournisseur</h2>
            <h3 class="ma-3 font-weight-regular">
              {{ infoISP }}
            </h3>
            <img
              :src="
                '/assets/info/isp/' +
                infoISP.toLowerCase().split(' ')[0] +
                '.png'
              "
              alt=" "
            />
          </v-card>
          <v-card flat :width="width"
            ><h2 class="">Région</h2>
            <h3 class="ma-3 font-weight-regular">
              {{ info.region }}
            </h3>
            <img v-if="info.country == 'FR'" src="/france.png" />
            <img v-else :src="infoCountry" width="48" />
          </v-card>

          <v-card flat :width="width"
            ><h2>Navigateur</h2>
            <h3 class="ma-3 font-weight-regular">
              {{ navigatorInfo() }}
            </h3>
            <img
              :src="
                '/assets/info/browser/' +
                navigatorInfo().toLowerCase().split(' ')[0] +
                '.png'
              "
            />
          </v-card>
          <v-card flat :width="width"
            ><h2>Système d’exploitation</h2>
            <h3 class="ma-3 font-weight-regular">
              {{ osInfo() }}
            </h3>
            <span
              class="text--secondary font-italic"
              v-if="osInfo() == 'unknow'"
            >
              Non détecté
            </span>
            <span v-else>
              <img
                :src="'/assets/info/os/' + osInfo().toLowerCase() + '.png'"
              />
            </span>
          </v-card>
        </v-row>

        <v-divider dark class="ma-4"></v-divider>

        <v-snackbar v-model="snackbar" bottom timeout="1500">
          <div style="text-align: center !important">
            L'adresse IP à été copiée
          </div>
        </v-snackbar>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { navigatorInfo, osInfo } from "../functions";

export default {
  data() {
    return {
      info: "",
      infoCountry: "",
      infoISP: "",
      snackbar: false,
      cardInfo: "",
      width: "220",
      error: "",
      status: "",
    };
  },
  methods: {
    doCopy: function () {
      this.$copyText(this.info.ip).then(function () {});
      this.snackbar = true;
    },
    navigatorInfo,
    osInfo,
  },
  mounted() {
    axios
      .get("https://api.feranet.fr/ip")
      .then(
        (response) => (
          (this.info = response.data),
          (this.infoCountry =
            "https://raw.githubusercontent.com/debmus/flags/master/svg/" +
            response.data.country.toLowerCase() +
            ".svg"),
          (this.infoISP = response.data.org.split(/ (.+) /)[1])
        )
      )
      .catch((error) => {
        if (error.response) {
          this.error = error;
          this.status = error.response.status;
        }
      });
  },
};
</script>

<style lang="scss">
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
.doCopy:hover {
  cursor: pointer;
}
</style>
        