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
          <section class="my-3 pa-3">
            <v-form ref="form" v-model="valid" @submit="validate">
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="port"
                    :rules="nameRulesPORT"
                    label="Port"
                    required
                    @click="clear_port"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="9">
                  <v-text-field
                    v-model="name"
                    :counter="100"
                    :rules="nameRulesNAME"
                    label="Domaine ou adresse IP"
                    required
                    @click="clear_port"
                  ></v-text-field>
                </v-col>
              </v-row>

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
                color="error"
                class="mr-4"
                @click="reset"
                v-show="port !== '' || name !== ''"
              >
                Effacer
              </v-btn>
            </v-form>

            <v-dialog hide-overlay v-model="dialog" width="500">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ name }}</span>
                </v-card-title>
                <v-card-text>
                  <section class="mt-6" v-if="errored_port">
                    <v-alert type="error" outlined border="left">
                      Adresse IP ou le domaine non valide
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
                    <v-card-title>
                      <span v-if="formResps.isOpen">
                        <v-icon x-large color="green">mdi-check-circle</v-icon>
                        Le port {{ formResps.port }} est ouvert
                      </span>

                      <span v-else>
                        <v-icon x-large color="red">mdi-close-circle</v-icon>
                        Le port {{ formResps.port }} semble être fermé
                      </span>
                    </v-card-title>
                    <v-card-subtitle
                      class="mt-3 text-left"
                      v-if="formResps.label !== 'unknow'"
                    >
                      <code>
                        {{ formResps.label }}
                      </code>
                    </v-card-subtitle>
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
          </section>
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
    port: "",
    formResps: "",
    error: "",
    status: "",
    errored_port: false,
    nameRulesNAME: [
      (v) => !!v || "Champ requis",
      (v) =>
        (v && v.length <= 100) ||
        "Le texte doit comporter moins de 100 caractères",
    ],
    nameRulesPORT: [
      (v) => !!v || "Champ requis",
      (v) => (v && v >= 1 && v <= 65536) || "Doit être compris en : 1 et 65535",
    ],
  }),

  methods: {
    validate: function (e) {
      this.$refs.form.validate();
      e.preventDefault();
      this.formResps = "";
      if (this.name === "" && this.port === "") {
        return;
      } else {
        if (
          !ipRegex({ exact: true }).test(this.name) &&
          !isValidDomain(this.name)
        ) {
          this.error = "";
          this.errored_port = true;
        } else {
          axios
            .get(
              "https://api.feranet.fr/ScanPort/" + this.name + "/" + this.port
            )
            .then(
              (response) => (
                (this.formResps = response.data[this.port]),
                ((this.errored_port = false), (this.error = ""))
              )
            )
            .catch((error) => {
              if (error.response) {
                this.error = error;
                this.status = error.response.status;
                this.errored_port = false;
              }
            });
        }
      }
    },
    reset() {
      this.$refs.form.reset();
      this.formResps = "";
      this.name = "";
      this.port = "";
      this.errored_port = false;
      this.error = "";
    },
    clear_port() {
      this.formResps = "";
    },
  },
};
</script>