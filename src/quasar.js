import Vue from "vue";

import "./styles/quasar.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar } from "quasar";

Vue.use(Quasar, {
  config: {},
  components: {
    /* not needed if importStrategy is not 'manual' */
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: {} ,
  framework: {
    plugins: [
      'Notify'
    ],
    config: {
      notify: { /* look at QUASARCONFOPTIONS from the API card (bottom of page) */ }
    }
  }
});
