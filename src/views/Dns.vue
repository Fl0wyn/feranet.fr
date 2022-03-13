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
            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  :items="items"
                  :rules="rulesChamps"
                  v-model="champs"
                  label="Champs"
                  required
                  @click="clear_dns"
                ></v-select>
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="name"
                  :counter="100"
                  :rules="rulesName"
                  label="Domaine"
                  required
                  @click="clear_dns"
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
              @click="reset_dns"
              v-show="name !== '' || champs !== ''"
            >
              Effacer
            </v-btn>
          </v-form>

          <v-dialog hide-overlay v-model="dialog" width="800">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ name }}</span>
              </v-card-title>
              <v-card-text>
                <section class="mt-6" v-if="errored_dns">
                  <v-alert type="error" outlined border="left">
                    Le domaine n'est pas valide
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
                  <v-card-title class="text-left">
                    Résultat du champ {{ champs }}
                  </v-card-title>

                  <v-list-item
                    v-for="(i, index) in formResps"
                    :key="index"
                    class="text-left"
                  >
                    <v-list-item-title v-if="champs === 'MX'">
                      <h2>
                        {{
                          formResps[index].exchange ||
                          "Aucune information trouvées"
                        }}
                      </h2>
                    </v-list-item-title>
                    <v-list-item-title v-else-if="champs === 'TXT'">
                      <h2>
                        {{
                          formResps[index][0] || "Aucune information trouvées"
                        }}
                      </h2>
                    </v-list-item-title>
                    <v-list-item-title v-else>
                      <h2>
                        {{ formResps[index] }}
                      </h2>
                    </v-list-item-title>
                  </v-list-item>
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
import isValidDomain from "is-valid-domain";
export default {
  data: () => ({
    dialog: false,
    valid: "",
    champs: "",
    name: "",
    formResps: "",
    error: "",
    status: "",
    errored_dns: false,
    items: ["A", "AAAA", "MX", "NS", "TXT"],
    rulesName: [
      (v) => !!v || "Champ requis",
      (v) =>
        (v && v.length <= 100) ||
        "Le texte doit comporter moins de 100 caractères",
    ],
    rulesChamps: [(v) => !!v || "Champ requis"],
  }),
  methods: {
    validate: function (e) {
      this.$refs.form.validate();
      e.preventDefault();
      this.formResps = "";
      if (this.name === "" && this.champs === "") {
        return;
      } else {
        if (!isValidDomain(this.name)) {
          this.error = "";
          this.errored_dns = true;
        } else {
          axios
            .get("https://api.feranet.fr/dns/" + this.name + "/" + this.champs)
            .then(
              (response) => (
                (this.formResps = response.data),
                ((this.errored_dns = false), (this.error = ""))
              )
            )
            .catch((error) => {
              if (error.response) {
                this.error = error;
                this.status = error.response.status;
                this.errored_dns = false;
              }
            });
        }
      }
    },
    reset_dns() {
      this.$refs.form.reset();
      this.formResps = "";
      this.champs = "";
      this.name = "";
      this.errored_dns = false;
      this.error = "";
    },
    clear_dns() {
      this.formResps = "";
    },
  },
};
</script>