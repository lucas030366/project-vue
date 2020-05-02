import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
import colors from "vuetify/es5/util/colors"
import "@fortawesome/fontawesome-free/css/all.css"

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
  icons: {
    iconfont: 'fa',
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.teal.darken1,
        success: colors.teal.lighten1,
        error: colors.pink.darken2
      }
    }

  }
});
