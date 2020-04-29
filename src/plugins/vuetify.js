import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';
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
});
