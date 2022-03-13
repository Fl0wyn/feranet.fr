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
        <v-card flat width="1000" class="pa-6">
          <v-form ref="form" v-model="valid" @submit="validate">
            <v-text-field
              v-model="text"
              :counter="200"
              :rules="nameRules"
              label="Texte"
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
              v-show="text !== ''"
            >
              Effacer
            </v-btn>
          </v-form>

          <v-dialog hide-overlay v-model="dialog" width="1000">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ text }}</span>
              </v-card-title>
              <v-card-text>
                <v-card-title> md5 </v-card-title>
                <v-card-text class="text-left">{{ formRespsMD5 }}</v-card-text>
                <v-divider></v-divider>
                <v-card-title> sha1 </v-card-title>
                <v-card-text class="text-left">{{ formRespsSHA1 }}</v-card-text>
                <v-divider></v-divider>
                <v-card-title> sha256 </v-card-title>
                <v-card-text class="text-left">{{
                  formRespsSHA256
                }}</v-card-text>
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
import md5 from "crypto-js/md5";
import sha1 from "crypto-js/sha1";
import sha256 from "crypto-js/sha256";

export default {
  data: () => ({
    dialog: false,
    valid: true,
    text: "",
    formRespsMD5: "",
    formRespsSHA1: "",
    formRespsSHA256: "",
    show: false,
    nameRules: [
      (v) => !!v || "Texte requis",
      (v) =>
        (v && v.length <= 500) ||
        "Le texte doit comporter moins de 500 caractères",
    ],
  }),
  methods: {
    validate: function (e) {
      this.lg = "6";
      this.$refs.form.validate();
      e.preventDefault();
      if (this.text === "") {
        return;
      } else {
        this.formRespsMD5 = md5(this.text);
        this.formRespsSHA1 = sha1(this.text);
        this.formRespsSHA256 = sha256(this.text);
        this.show = true;
      }
    },
    reset() {
      this.$refs.form.reset();
      this.show = false;
      this.text = "";
      this.formRespsMD5 = "";
      this.formRespsSHA1 = "";
      this.formRespsSHA256 = "";
    },
  },
};
</script>