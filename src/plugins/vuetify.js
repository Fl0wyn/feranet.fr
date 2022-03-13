import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import '@mdi/font/css/materialdesignicons.css'

import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard)
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3367d6'
            }
        }
    },
    breakpoint: {
        thresholds: {
            xs: 720,
            sm: 1024,
            md: 1280,
            lg: 1600
        }
    },
    icons: {
        iconfont: 'mdi',
    }
});