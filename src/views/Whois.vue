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
          pa-6
        "
      >
        <v-card flat width="800" class="pa-6">
          <v-form ref="form" v-model="valid" @submit="validate">
            <v-text-field
              v-model="name"
              :counter="100"
              :rules="nameRules"
              label="Domaine ou adresse IP"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              type="submit"
              value="Submit"
              @click="dialog = true"
            >
              Executer
            </v-btn>

            <v-btn
              class="mr-4"
              color="error"
              @click="reset"
              v-show="name !== ''"
            >
              Effacer
            </v-btn>
          </v-form>

          <v-dialog hide-overlay scrollable v-model="dialog" width="1000">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ name }}</span>
              </v-card-title>
              <v-card-text>
                <section class="mt-6" v-if="errored_whois">
                  <v-alert type="error" outlined border="left">
                    L'adresse IP ou le domaine n'est pas valide
                  </v-alert>
                </section>

                <section class="mt-6" v-if="error">
                  <v-alert type="error" outlined border="left">
                    Impossible de récupérer ces informations pour le moment.
                    <br />
                    Veuillez réessayer ultérieurement.
                    <br />
                    Code d'erreur HTTP : <b>{{ status }}</b>
                  </v-alert>
                </section>

                <section v-if="formResps">
                  <pre class="text-left">{{ formResps }}</pre>
                </section>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog = false">
                  <v-icon class="mb-1" color="red">mdi-close</v-icon>
                  Fermer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import ipRegex from "ip-regex";
import isValidDomain from "is-valid-domain";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    name: "",
    formResps: "",
    error: "",
    status: "",
    errored_whois: false,
    nameRules: [
      (v) => !!v || "Texte requis",
      (v) =>
        (v && v.length <= 100) ||
        "Le texte doit comporter moins de 100 caractères",
    ],
  }),
  methods: {
    validate: function (e) {
      this.$refs.form.validate();
      e.preventDefault();
      this.formResps = "";
      if (this.name === "") {
        return;
      } else {
        if (
          !ipRegex({ exact: true }).test(this.name) &&
          !isValidDomain(this.name)
        ) {
          this.error = "";
          this.errored_whois = true;
        } else {
          axios
            .get("https://api.feranet.fr/whois/" + this.name)
            .then(
              (response) => (
                (this.formResps = response.data),
                ((this.errored_whois = false), (this.error = ""))
              )
            )
            .catch((error) => {
              if (error.response) {
                this.error = error;
                this.status = error.response.status;
                this.errored_whois = false;
              }
            });
        }
      }
    },
    reset() {
      this.$refs.form.reset();
      this.formResps = "";
      this.name = "";
      this.errored_whois = false;
      this.error = "";
    },
  },
};
</script>