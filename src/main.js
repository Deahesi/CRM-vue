import Vue from 'vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import messPlugin from './utils/message.plugin'
import titlePlugin from './utils/title.plugin'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from "./filters/date.filter"
import currencyFilter from "./filters/currency.filter"
import localizeFilter from "./filters/localize.filter";
import tooltipDirective from "./directives/tooltip.directive"
import App from './App.vue'
import Loader from "./components/app/Loader"
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import FireBase from 'firebase/app'
import Meta from 'vue-meta'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.use(Meta)
Vue.use(Vuelidate)
Vue.use(messPlugin)
Vue.use(titlePlugin)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

FireBase.initializeApp({
  apiKey: "AIzaSyColQ7AcWj-Fw4G_dqSoUfdFUK_z9xEha4",
  authDomain: "vuecrm-d42de.firebaseapp.com",
  databaseURL: "https://vuecrm-d42de.firebaseio.com",
  projectId: "vuecrm-d42de",
  storageBucket: "vuecrm-d42de.appspot.com",
  messagingSenderId: "177626280506",
  appId: "1:177626280506:web:19f2d2a751453583fbbb03",
  measurementId: "G-848H09MEGQ"
})

let app

FireBase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


