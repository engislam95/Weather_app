<template>
  <div class="home">
    
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- {{ weatherData }} -->
    <div class="placeSearch row">
      <div class="searchPlace col-lg-4">
        <q-input class="inputCity" @blur="setCity()"  color="black" v-model="city_name" label="fetch weather by city name">
            <template v-slot:prepend>
              <q-icon name="place" />
          </template>
        </q-input>
        
      <div  v-for="weather in weatherData.weather" :key="weather.id">
          <q-card class="my-card">

            <q-btn class="CTOf" @click="convertF(weatherData.main.temp)"  icon-right="send" label="C/F" />
            <img :src="'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'">

            <q-card-section>
              <div class="text-h5">{{weatherData.sys.country}}</div>
              <div class="text-h6">Avg Temp </div>
              <div v-if="!transform" class="text-h6">{{weatherData.main.temp}}℃</div>
              <div v-if="transform" class="text-h6">{{cToFahr}}°F</div>

            </q-card-section>

            <q-card-section class="q-pt-none">
              <h5>  {{ weather.description }} </h5>
              <h5>  {{ weather.main }} </h5>
              <p> {{ moment().format('MMMM Do YYYY, h:mm:ss a') }} </p>
              <q-btn class="btn_Location" @click="addMarker(weatherData.coord.lat , weatherData.coord.lon)" icon-right="my_location" label="View Location On Map"   />

            </q-card-section>
        </q-card>
      </div>
      </div>

      <div class="searchFavPlace col-lg-6">
           <q-btn flat class="btn_Locationn"  size="lg" icon-right="my_location" label="fetch weather by lat / lon"  @click="card = true" />
          <div class="favWeather row" >
            <div class="col-lg-5" v-for="weather in favWeather" :key="weather.id">
                <q-card class="my-card"  >
                  <q-btn @click="convertF(weather.main.temp)" class="CTOf" icon-right="send" label="C/F" />
                  <img :src="'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'">

                  <q-card-section>
                    <div class="text-h5">{{weather.sys.country}}</div>
                    <div class="text-h6">Avg Temp </div>
                    <div v-if="!transform" class="text-h6">{{weather.main.temp}}℃</div>
                    <div v-if="transform" class="text-h6">{{cToFahr}}°F</div>

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

                <!-- <q-input  color="white" v-model="city_name_model" label-color="white" label="Enter Your City Name">
                  <template v-slot:prepend>
                    <q-icon color="white" name="place" />
                  </template>
                </q-input> -->

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

// import HelloWorld from "@/components/HelloWorld.vue";
 import moment from 'moment'; 


import { mapGetters  } from 'vuex'

export default {
  name: "Home",
  data () {
    return {
      city_name: '',
      card: false,
       fixed: false ,
       city_name_model : '',
       latitude: '' ,
       longitude: '' ,
       center: { lat: 45.508, lng: -73.587 },
        markers: [],
         currentPlace: null ,
          places: [],
          cToFahr:'',
          transform: false 
   
    }
  },

  mounted() {
    this.geolocate();
  },

  computed: {
    ...mapGetters([
      'weatherData' ,
       'location' ,
      'favWeather'

    ])
  },

  methods:{
    convertF(c)
    {
     
        this.cToFahr = c * 9 / 5 + 32;
        this.transform = true ;
      
     
    
     
    },
    setCity()
    {
      console.log(this.city_name)
      this.$store.commit('SET_CITY', this.city_name) 
       this.$store.dispatch('LOAD_WEATHER_DATA')


    },

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




     
  // }
  // components: {
  //   HelloWorld
  // }
};
</script>

<style scoped lang="scss">
.home
{
  width: 95% ;
  margin: 0 auto ;
}
.placeSearch
{
  width: 90%;
  margin: 0 auto ;
  margin-bottom: 5%;
}
.my-card img 
{
   width: 20%;
    margin: 0 auto;
    margin-left: 40% ;
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

.searchPlace
{
  margin-right: 10%; 
}
.inputCity
{
  margin-bottom: 19% ;

}
.btn_Location
{
  color : #fff ;
  background: #2a5880f0 ;
  margin-top: 5% ;
  margin-bottom: 10% ;
}

.btn_Locationn
{
  color : #2a5880f0 ;
  margin-top: 3% ;
  margin-bottom: 10% ;
}
.my-card_dialog
{
  width: 50% ;

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
.CTOf
{
    float: right;
    margin: 2%;
}
</style>