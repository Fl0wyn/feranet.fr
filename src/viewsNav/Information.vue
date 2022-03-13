<template>
  <div>
    <v-container
      fluid
      class="my-9 px-6 px-sm-12 white align-center text-center"
    >
      <img src="/info.gif" alt="Information" />
      <h1>
        <b>Information</b>
      </h1>
      <br />
      <p>
        <b>Feranet </b>est une application construite en
        <i>vue.js</i> sous licence
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          GPLv3</a
        >
        qui propose des outils web pour les administrateurs système et réseau.

        <br />
        Les applications disponibles sur
        <a href="https://feranet.fr">https://feranet.fr</a> ne
        collectent ou n'enregistrent aucunes données personnelles.
        <br />
        Le code source du projet est disponible sur
        <a
          href="https://github.com/Fl0wyn/feranet.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub</a
        >
        <br />
        Le style du site est inspiré du projet de
        <a
          href="https://github.com/lhsazevedo/vuetify-admin-console"
          target="_blank"
          rel="noopener noreferrer"
        >
          lhsazevedo</a
        >, les icônes utilisées sont disponibles sur
        <a href="https://icones8.fr/" target="_blank" rel="noopener noreferrer">
          icones8</a
        >
        <br />
        Logo officiel du site :
        <a
          href="https://feranet.fr/logo.svg"
          target="_blank"
          rel="noopener noreferrer"
          >(svg)
        </a>
      </p>
      <v-divider class="ma-12"></v-divider>
      <v-chip label outlined>
        {{ new Date().getFullYear() }}
        <strong class="mx-2">Feranet</strong> v{{ version }}
      </v-chip>
      <v-divider dark class="ma-4"></v-divider>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: "",
    };
  },
  beforeMount() {
    this.getVersion();
  },
  methods: {
    async getVersion() {
      const res = await fetch("../VERSION");
      const data = await res.text();
      this.version = data;
    },
  },
};
</script>