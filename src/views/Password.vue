<template>
  <div>
    <v-container class="mt-3">
      <v-card flat class="d-flex flex-column align-center">
        <v-card-title class="font-weight-bold text-h4">
          {{ $route.name }}
        </v-card-title>
      </v-card>

      <v-card flat class="d-flex flex-column align-center pa-6">
        <v-card flat width="1000" class="ma-3">
          <v-alert
            v-if="
              optiondata[0].status == false &&
              optiondata[1].status == false &&
              optiondata[2].status == false
            "
            color="blue"
            type="info"
          >
            Vous devez remplir au moins un champs
          </v-alert>

          <v-text-field
            v-else
            class="size-field"
            readonly
            solo
            flat
            v-model="generatedPassword"
          >
            <v-icon
              class="mx-6 btn-hover"
              large
              @click="refreshPassword = !refreshPassword"
              slot="append"
              color="grey"
            >
              mdi-reload
            </v-icon>
            <v-icon
              class="btn-hover"
              large
              @click="doCopy"
              slot="append"
              color="grey"
            >
              mdi-content-copy
            </v-icon>
          </v-text-field>

          <v-divider dark class="ma-8"></v-divider>

          <v-row>
            <v-slider
              min="4"
              max="100"
              v-model="passwordLength"
              class="slider mx-4"
              append-icon="mdi-plus"
              prepend-icon="mdi-minus"
              @click:append="plus"
              @click:prepend="minus"
            >
            </v-slider>

            <v-sheet
              v-for="(option, index) in optiondata"
              :key="index"
              class="mx-2"
            >
              <v-switch
                v-model="option.status"
                :label="option.name"
                inset
                dense
              ></v-switch>
            </v-sheet>
          </v-row>

          <v-divider dark class="ma-8"></v-divider>

          <v-row>
            <v-card class="d-flex flex-wrap" flat>
              <v-card flat width="150">
                <h2>Longueur : {{ passwordLength }}</h2>
              </v-card>
              <v-card flat class="mx-1 pa-1" width="200">
                <v-progress-linear
                  :value="Check"
                  :color="Color"
                  height="25"
                  rounded
                  absolute
                >
                  <strong>{{ Secure }}</strong>
                </v-progress-linear>
              </v-card>
            </v-card>
          </v-row>

          <v-snackbar v-model="snackbar" bottom timeout="1500">
            <div style="text-align: center !important">
              Le mot de passe a été copié
            </div>
          </v-snackbar>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    passwordLength: 16,
    refreshPassword: false,
    optiondata: [
      {
        name: "Lettres",
        status: true,
        chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      },
      {
        name: "Chiffres",
        status: true,
        chars: "0123456789",
      },
      {
        name: "Symboles",
        status: false,
        chars: "'~!@#$%^&*-_=+[]{}();:,.>/?€|",
      },
    ],
    snackbar: false,
  }),
  methods: {
    doCopy: function () {
      this.$copyText(this.generatedPassword).then(function () {});
      this.snackbar = true;
    },
    minus() {
      this.passwordLength = this.passwordLength - 1 || 5;
    },
    plus() {
      this.passwordLength = this.passwordLength + 1 || 100;
    },
  },
  computed: {
    Color() {
      if (this.passwordLength < 8) return "red accent-4";
      if (this.passwordLength < 12) return "red";
      if (this.passwordLength < 16) return "orange";
      if (this.passwordLength < 20) return "green";
      return "green accent-4";
    },
    Secure() {
      if (this.passwordLength < 8) return "Très faible";
      if (this.passwordLength < 12) return "Faible";
      if (this.passwordLength < 16) return "Moyen";
      if (this.passwordLength < 20) return "Fort";
      return "Très Fort";
    },

    Check() {
      if (this.passwordLength < 8) return "5";
      if (this.passwordLength < 12) return "20";
      if (this.passwordLength < 16) return "30";
      if (this.passwordLength < 20) return "40";
      return "100";
    },
    charset() {
      return [...this.optiondata]
        .map((element) => {
          if (element.status === true) return element.chars;
        })
        .join("");
    },
    generatedPassword() {
      this.refreshPassword;
      return [
        ...window.crypto.getRandomValues(new Uint32Array(this.passwordLength)),
      ]
        .map((value) => this.charset[value % this.charset.length])
        .join("");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-hover:hover {
  color: #1976d2 !important;
}
.size-field {
  font-size: 30px;
  font-weight: bold;
}
</style>

