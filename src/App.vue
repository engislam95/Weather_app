<template>
  <div id="app">
    
    <q-layout view="hHh Lpr lff" style="height: 100%" class="shadow-2 rounded-borders">

       <q-header  elevated class="bg-blackk">
         


        <q-toolbar>
         <q-btn  flat round dense icon="login" label="Logout" @click="logout()"/>
    

         <q-toolbar-title class="text-center">  <span class="time shadow text-center" v-text="currentTime"></span> </q-toolbar-title>
         <q-btn flat round dense icon="face" :label="loginData.name"/>
          
        </q-toolbar>
      </q-header>

  
      <q-page-container>
        <q-page padding>
           <router-view />    
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

 import moment from 'moment'; 
import { mapGetters  } from 'vuex'

export default {
  name: "Home",
  data () {
    return {
      drawer: false ,
      miniState: true ,
      currentTime: null ,
      userName : '' ,
      viewed : true
    }
  },

  mounted()
  {
    if(!JSON.parse(sessionStorage.getItem('currentUser')))
    {
      this.viewed = false ;
      this.$router.push('/')
    }
    else
    {
      this.viewed = true ;
    }
    
  },
  methods: {

    logout()
    {
      sessionStorage.removeItem("currentUser")
        this.$store.commit('SET_LOGIN_DATA' , {})
        this.$router.push('/')


    },

    updateCurrentTime() {
      this.currentTime = moment().format('LTS');
    }

    },
     computed: {
    ...mapGetters([
         'loginData'
    ])
  },
    created() {
    this.currentTime = moment().format('LTS');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }

};
</script>


<style lang="scss">
.q-page-container
{
  background: url('./assets/background.jpg')  ;
  background-size: cover ; 
  background-repeat: no-repeat ;
  background-position: 10px ;
}
 .q-toolbar__title {
    padding: 0 12px;
    text-align: left;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.bg-blackk {
    background: #2a5880f0 !important;
}
</style>


