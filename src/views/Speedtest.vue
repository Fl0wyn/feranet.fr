<template>
  <div>
    <v-container>
      <div v-if="!iframe.loaded">
        <v-progress-linear
          color="green"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </div>

      <iframe
        :src="iframe.src"
        ref="frame"
        @load="load"
        width="100%"
        height="650px"
        frameborder="0"
      ></iframe>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframe: {
        src: "https://feranet.speedtestcustom.com",
        loaded: false,
      },
    };
  },
  methods: {
    load: function () {
      this.iframe.loaded = true;
    },
  },
};
</script>

