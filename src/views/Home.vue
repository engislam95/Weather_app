<template>
  <div class="home">
    
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- {{ weatherData }} -->
    <div class="placeSearch row">
      <div class="searchPlace col-lg-6">

        <div class="row findLocation" > 

          <div class="col-lg-6 inputCity" >
            <q-chip class="chipCity"  icon="directions"> Input your city name  </q-chip>

            <q-input class="inputCity" @blur="setCity()"  color="black" v-model="city_name" label="fetch weather by city name">
                <template v-slot:prepend>
                  <q-icon name="place" />
              </template>
            </q-input>
           
          </div>
          <div class="col-lg-6">

            <q-chip class="chipCity"  icon="directions"> Choose from your favourite locations </q-chip>

              <q-list class="listLocation" bordered separator v-if="this.items.length > 0"> 
                  <q-item clickable v-ripple v-for="item in items" :key="item.id" @click="showFacWeather(item.cityName)" >
                    <q-item-section avatar>
                      <q-icon color="black" name="place" />
                    </q-item-section>

                    <q-item-section>{{item.cityName}}</q-item-section>
                  </q-item>
                  <q-separator />
              </q-list>
                <div class="addLocations col-lg-2">
                <q-btn outline   class="btn_Locationn_add" @click="add_new_location()"  label="Add more location" icon-right="my_location" />
            </div>
          </div>



        </div>
     
      
      
        <div  v-for="weather in weatherData.weather" :key="weather.id">
            <q-card class="my-card" style="width:50%" :style="[weather.main == 'Clear' ? {'background': 'url(./sunny.jpg) center no-repeat' } : weather.main == 'Clouds'? {'background': 'url(./clouds.jpg) center top no-repeat'}: '' ]">

              <q-btn class="CTOf" @click="convertF_city(weatherData.main.temp)"  icon-right="send" label="C/F" />
              <img :src="'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'">

              <q-card-section>
                <div class="text-h5">{{weatherData.sys.country}}</div>
                <div class="text-h6">Avg Temp </div>
                <div v-if="!transform_city" class="text-h6">{{weatherData.main.temp}}℃</div>
                <div v-if="transform_city" class="text-h6">{{cToFahr_city}}°F</div>

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

    
          

      <div class="searchFavPlace col-lg-4">
        
            <q-chip class="chipCity"  icon="directions"> fetch weather by lat / lon </q-chip>

            <div class="addLocations col-lg-2" style="margin-bottom:17%">
                  <q-btn fill  class="btn_Locationn_lat"  icon-right="my_location" label="fetch weather by lat / lon"  @click="addLating()" />
            </div>
          <div class="favWeather " >
            <div  v-for="weather in favWeather.weather" :key="weather.id">
                <q-card class="my-card" :style="[weather.main == 'Clear' ? {'background': 'url(./sunny.jpg) center no-repeat' } : weather.main == 'Clouds'? {'background': 'url(./clouds.jpg) center top no-repeat'}: '' ]">
                  <q-btn @click="convertF_lating(favWeather.main.temp)" class="CTOf" icon-right="send" label="C/F" />
                  <img :src="'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'">

                  <q-card-section>
                    <div class="text-h5">{{favWeather.sys.country}}</div>
                    <div class="text-h6">Avg Temp </div>
                    <div v-if="!transform_lating" class="text-h6">{{favWeather.main.temp}}℃</div>
                    <div v-if="transform_lating" class="text-h6">{{cToFahr_lating}}°F</div>

                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <h5>  {{ weather.description }} </h5>
                    <h5>  {{ weather.main }} </h5>
                    <p> {{ moment().format('MMMM Do YYYY, h:mm:ss a') }} </p>

                    <q-btn class="btn_Location" @click="addMarker(favWeather.coord.lat , favWeather.coord.lon)" icon-right="my_location" label="View Location On Map"   />
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


         
         <q-dialog v-model="card_location">
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

                <q-input  color="white" v-model="city_name_location" label-color="white" label="Enter Your City Name">
                  <template v-slot:prepend>
                    <q-icon color="white" name="place" />
                  </template>
                </q-input>

                <q-input  type="number" color="white" v-model="latitude_location" label-color="white" label="Enter Your latitude">
                  <template v-slot:prepend>
                    <q-icon color="white" name="place" />
                  </template>
                </q-input>

                <q-input  type="number" color="white" v-model="longitude_location" label-color="white" label="Enter Your longitude">
                  <template v-slot:prepend>
                    <q-icon  color="white" name="place" />
                  </template>
                </q-input>


              </q-card-section>


              <q-card-actions align="right">
                <q-btn @click="addFavLocation()" flat color="white" label="Save Location" />
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
      cToFahr_lating: '',
      cToFahr_city:'',
      transform_city: false ,
      transform_lating: false ,
      card_location: false,
      city_name_location: '' ,
      latitude_location: '' ,
      longitude_location: '' ,
      items:[]

    }
  },

  mounted() {
    this.geolocate();
    console.log(this.favWeather)
    console.log(this.weatherData)

  },

  computed: {
    ...mapGetters([
      'weatherData' ,
       'location' ,
      'favWeather' ,
      'loginData'

    ])
  },

  methods:{

  addLating()
  {
    this.card = true ; 
    this.transform_lating = false ;
  },
    add_new_location()
    { 
      this.card_location = true 
    },

    convertF_city(c)
    {
     
        this.cToFahr_city = c * 9 / 5 + 32;
        this.transform_city = true ;
   
    },
    convertF_lating(c)
    {
     
        this.cToFahr_lating = c * 9 / 5 + 32;
        this.transform_lating = true ;
   
    },

    setCity()
    {
      console.log(this.city_name)
      this.transform_city = false ;
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

    },

    addFavLocation()
    {

       let location = {
        lat : this.latitude_location , 
        long : this.longitude_location ,
        cityName: this.city_name_location
      }
      console.log(location)
      this.items.push(location)
      console.log(this.items)
      this.card_location = false ;

    },

    showFacWeather(cityName)
    {
        this.$store.commit('SET_CITY', cityName) 
       this.$store.dispatch('LOAD_WEATHER_DATA')
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
    box-shadow: none;
    // border-radius: 50px;
        background-color: #2a588073;

    color: #fff;
}

.searchPlace
{
  margin-right: 10%; 
  padding-right: 2% ;
  border-right: 1px solid ;
}
.inputCity
{
  margin-bottom: 10% ;

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
.btn_Locationn_lat
{
  color : #fff ;
  margin-top: 3% ;
  background: #2a5880f0 ;
  margin-bottom: 10% ;
}
.btn_Locationn_add
{
  color : #2a5880f0 ;
  margin-top: 5% ;
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
.findLocation
{
  margin-top: 5% ;

   .inputCity
   {
      // border-right: 1px solid grey ;
      padding-right:4%
   }

  .chipCity
  {
     margin-bottom:5%
  }
}
 .chipCity
  {
     margin-bottom:5% ;
     color: #2a5880f0;
    font-weight: bold;
    font-size: 1rem;
    
  }
.listLocation
{
  margin-bottom:2% ;   
  margin-left: 10%;


}
.searchFavPlace
{
    padding: 2%;

}
.q-chip__content 
{
  color: #2a5880f0;
    font-weight: bold;
    font-size: 1.3rem;
}

</style>