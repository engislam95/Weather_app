<template>
  <div class="about">
      <div class="searchFavPlace">
           <q-btn class="btn_Location"  icon-right="my_location" label="Add more location"  @click="card = true" />
      </div>


          <div class="favWeather row" >
            <div class="col-lg-3" v-for="weather in favWeather" :key="weather.id">
                <q-card class="my-card"  >
                  <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'">

                  <q-card-section>
                    <div class="text-h5">{{weather.sys.country}}</div>
                    <div class="text-h6">Avg Temp </div>
                    <div class="text-h6">{{weather.main.temp}}℃</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <h5>  {{ weather.weather[0].description }} </h5>
                    <h5>  {{ weather.weather[0].main }} </h5>
                    <p> {{ moment().format('MMMM Do YYYY, h:mm:ss a') }} </p>

                    <q-btn class="btn_Location" @click="addMarker(weather.coord.lat , weather.coord.lon)" icon-right="my_location" label="View Location On Map"   />
                  </q-card-section>
              </q-card>
            </div>
          </div>

          <q-dialog v-model="fixed">
            <q-card style=" width: 100%;">
              <q-card-section>
                <div class="text-h6">View Location On Map</div>
              </q-card-section>

              <q-separator />

              <q-card-section style="width:100%; " class="scroll">
                   <gmap-map
                      :center="center"
                      :zoom="12"
                      style="width:100%;  height: 400px;"
                    >
                      <gmap-marker
                        
                        :position="center"
                        @click="center"
                      ></gmap-marker>
                    </gmap-map>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat label="Accept" color="white" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

        

         <q-dialog v-model="card">
            <q-card class="my-card_dialog">
              <q-img src="place.jpg" />
              <q-card-section>
                <q-btn
                  fab
                  color="primary"
                  icon="place"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%);"
                />

                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                  Set Location
                  </div>
                </div>

                <q-input  color="white" v-model="city_name_model" label-color="white" label="Enter Your City Name">
                  <template v-slot:prepend>
                    <q-icon color="white" name="place" />
                  </template>
                </q-input>

                <q-input  type="number" color="white" v-model="latitude" label-color="white" label="Enter Your latitude">
                  <template v-slot:prepend>
                    <q-icon color="white" name="place" />
                  </template>
                </q-input>

                <q-input  type="number" color="white" v-model="longitude" label-color="white" label="Enter Your longitude">
                  <template v-slot:prepend>
                    <q-icon  color="white" name="place" />
                  </template>
                </q-input>


              </q-card-section>


              <q-card-actions align="right">
                <q-btn @click="addNewLocation()" flat color="white" label="Save Location" />
              </q-card-actions>
            </q-card>
         </q-dialog>
      

  </div>
</template>

<script>

 import moment from 'moment'; 


import { mapGetters  } from 'vuex'

export default {
  name: "Home",
  data () {
    return {
       card: false,
       fixed: false ,
       city_name_model : '',
       latitude: '' ,
       longitude: '' ,
       center: { lat: 45.508, lng: -73.587 },
        markers: [],
         currentPlace: null ,
          places: [],
    }
  },

   mounted() {
    this.geolocate();
  },

  computed: {
    ...mapGetters([
      'location' ,
      'favWeather'
    ])
  },

  methods:{


    moment: function () {
      return moment();
    },

     geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    addMarker(lat , long) {
      this.fixed = true ;


        const marker = {
          lat: lat,
          lng: long
        };
        this.center = marker ;
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      
    },

    addNewLocation()
    {
      let location = {
        lat : this.latitude , 
        long : this.longitude ,
        cityName: this.city_name_model
      }
      console.log(location)
      this.$store.commit('SET_LOCATION' , location)
      this.$store.dispatch('LOAD_WEATHER_DATA_LATLONG')
      this.card = false ;

    }
  },

};
</script>

<style scoped lang="scss">
.about
{
  width: 85% ;
  margin: 0 auto ;
}
.searchFavPlace
{
  width: 50%;
  margin: 0 auto ;
  margin-bottom: 5%;
}
.my-card img 
{
   width: 20%;
    margin: 0 auto;
}
 h5 
{
  margin: 1% ;
}
.q-card {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    // border-radius: 50px;
    background-color: #275d8c9e;
    color: #fff;
}


.btn_Location
{
  color : #fff ;
  background: #2a5880f0 ;;
  margin-top: 5% ;
}
.my-card_dialog
{
  width: 50% ;

}
.favWeather
{
  justify-content: space-between;
}
</style>