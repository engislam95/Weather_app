import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    weatherData : {} ,
    cityName: 'London' ,
    location:{
      lat: '',
      long: '',
      cityName: ''
    },
    favWeather : {} ,
    loginData:{}
  },

  getters: {
    weatherData: state => state.weatherData,
    favWeather: state => state.favWeather ,
    loginData: state => state.loginData
  },



  mutations: {

    // Mutate weather data 
    SET_WEATHER_DATA: (state , {weather_data}) => {
      state.weatherData = weather_data
    },

    SET_WEATHER_FAV: (state , {weather_data}) => {

    
     state.favWeather = weather_data
    },


    SET_CITY : (state , payload) =>
    {
      state.cityName = payload
    },

    SET_LOCATION : (state , payload) => 
    {
      state.location = payload
    },

    SET_LOGIN_DATA : (state , payload) =>
    {
      state.loginData = payload
    }



  
  },

  actions: {

    // Load weather data then commit response 
    LOAD_WEATHER_DATA: async function ({ commit }) {
     await axios
      .get('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityName + '&appid=641d47bc20e1dabe6a69d811be1a11af&units=metric')
      .then(response => {
        console.log(response.data)
        commit('SET_WEATHER_DATA', { weather_data: response.data })
      })
      .catch(error => {
        console.log(error)
        
      })
    },

    // Load weather data with lat and long  then commit response 
    LOAD_WEATHER_DATA_LATLONG: async function ({ commit }) {
      await axios
        .get('https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.location.lat + '&lon=' + this.state.location.long + '&appid=641d47bc20e1dabe6a69d811be1a11af&units=metric')
        .then(response => {
          console.log(response.data)
          commit('SET_WEATHER_FAV', { weather_data: response.data })
        })
        .catch(error => {
          console.log(error)
          
        })
      }



  },
  modules: {}
});
