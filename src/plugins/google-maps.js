import Vue from "vue"
import 'vue-googlemaps/dist/vue-googlemaps.css'
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: ''
  }
})

//https://maps.googleapis.com/maps/api/geocode/json?address=rua+vida+zonta,240,PR&key=chave