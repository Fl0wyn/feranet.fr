<template>
  <div>
    <v-container class="mt-3">
      <v-card
        flat
        class="d-flex flex-column justify-space-between align-center"
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
        <v-card flat width="1800" class="pa-6 text-left">
          <v-row>
            <v-col cols="12" sm="12" lg="6">
              <v-card flat min-height="320">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      Couleur du texte
                      <v-radio-group v-model="FgColor" mandatory>
                        <v-radio
                          label="Défaut"
                          :color="color"
                          value="white--text, "
                        ></v-radio>
                        <v-radio
                          label="Rouge"
                          :color="color"
                          value="red--text, 1"
                        ></v-radio>
                        <v-radio
                          label="Vert"
                          :color="color"
                          value="green--text, 2"
                        >
                        </v-radio>
                        <v-radio
                          label="Jaune"
                          :color="color"
                          value="yellow--text, 3"
                        >
                        </v-radio>
                        <v-radio
                          label="Bleu"
                          :color="color"
                          value="blue--text, 4"
                        >
                        </v-radio>
                        <v-radio
                          label="Magenta"
                          :color="color"
                          value="purple--text, 5"
                        >
                        </v-radio>
                        <v-radio
                          label="Cyan"
                          :color="color"
                          value="cyan--text, 6"
                        >
                        </v-radio>
                      </v-radio-group>
                    </v-col>

                    <v-col cols="12" sm="4" md="4" class="">
                      Couleur du fond
                      <v-radio-group v-model="BgColor" mandatory>
                        <v-radio label="Défaut" :color="color" value=", ">
                        </v-radio>
                        <v-radio
                          label="Rouge"
                          :color="color"
                          value="text-no-wrap red, 1"
                        >
                        </v-radio>
                        <v-radio
                          label="Vert"
                          :color="color"
                          value="text-no-wrap green, 2"
                        >
                        </v-radio>
                        <v-radio
                          label="Jaune"
                          :color="color"
                          value="text-no-wrap yellow, 3"
                        >
                        </v-radio>
                        <v-radio
                          label="Bleu"
                          :color="color"
                          value="text-no-wrap blue, 4"
                        >
                        </v-radio>
                        <v-radio
                          label="Magenta"
                          :color="color"
                          value="text-no-wrap purple, 5"
                        >
                        </v-radio>
                        <v-radio
                          label="Cyan"
                          :color="color"
                          value="text-no-wrap cyan, 6"
                        >
                        </v-radio>
                      </v-radio-group>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                      Style
                      <v-checkbox
                        v-model="Bold"
                        label="Gras"
                        :color="color"
                        value="font-weight-bold"
                        hide-details
                      >
                      </v-checkbox>
                      <v-checkbox
                        v-model="Underline"
                        label="Souligner"
                        :color="color"
                        value="text-decoration-underline"
                        hide-details
                      >
                      </v-checkbox>
                      <v-checkbox
                        v-model="Light"
                        label="Lumineux *"
                        :color="color"
                        value=" "
                        hide-details
                      >
                      </v-checkbox>
                      <br />
                      <v-btn
                        href="https://raw.githubusercontent.com/debmus/bash-color/master/VARIABLES.md"
                        target="_blank"
                        rel="noopener noreferrer"
                        outlined
                        color="primary"
                      >
                        <v-icon left> mdi-format-list-bulleted</v-icon
                        >Liste</v-btn
                      >
                      <v-divider class="my-6"></v-divider>

                      * La fonction d'éclairage (Lumineux) n'est pas visible
                      dans l'aperçu
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="12" lg="6">
              <v-card
                color="grey darken-4"
                min-height="320"
                class="rounded-t-0"
              >
                <v-system-bar color="grey lighten-2" windows>
                  <v-spacer></v-spacer>
                  <v-icon color="green">mdi-circle</v-icon>
                  <v-icon color="orange">mdi-circle</v-icon>
                  <v-icon color="red">mdi-circle</v-icon>
                </v-system-bar>
                <h3 class="float-left ma-3 white--text">bash@color:~ $</h3>
                <h3 class="ma-3 white--text font-weight-regular">
                  echo -e "

                  <!-- FgColor -->
                  <span v-if="FgColor.split(',')[1] !== ' '"
                    >\e[<span v-if="Light">9</span><span v-else>3</span
                    ><span v-text="FgColor.split(', ')[1]"></span>m</span
                  >

                  <!-- BgColor -->
                  <span v-if="BgColor.split(',')[1] !== ' '"
                    >\e[<span v-if="Light">10</span><span v-else>4</span
                    ><span v-text="BgColor.split(', ')[1]"></span>m</span
                  >

                  <!-- Bold -->
                  <span v-if="Bold">\e[1<span></span>m</span>

                  <!-- Underline -->
                  <span v-if="Underline">\e[4<span></span>m</span>

                  Lorem ipsum "
                </h3>

                <h3 class="float-left ma-3 white--text">bash@color:~ $</h3>

                <h3 class="ma-6 font-weight-regular">
                  <span
                    :class="[
                      FgColor.split(',')[0],
                      BgColor.split(',')[0],
                      Bold,
                      Underline,
                      Light,
                    ]"
                    >Lorem ipsum
                  </span>
                </h3>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    color: "primary",

    FgColor: "white--text",
    BgColor: "",
    Bold: "",
    Underline: "",
    Light: "",
  }),
};
</script>