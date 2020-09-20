<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <q-layout view="hHh Lpr lff" style="height: 100%" class="shadow-2 rounded-borders">

       <q-header elevated class="bg-blackk">
        <q-toolbar>
          
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />

          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->

         <q-toolbar-title class="text-center">  <span class="time shadow text-center" v-text="currentTime"></span> </q-toolbar-title>
         <q-btn flat round dense icon="whatshot" />
          
        </q-toolbar>
      </q-header>

    <!-- <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
          <router-link to="/">  <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item></router-link> 

         <router-link to="/about">   <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                 Locations
              </q-item-section>
            </q-item></router-link> 

           
          </q-list>
        </q-scroll-area>
      </q-drawer> -->
      <q-page-container>
        <q-page padding>
           <router-view />    
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
 import moment from 'moment'; 
export default {
  name: "Home",
  data () {
    return {
      drawer: false ,
      miniState: true ,
      currentTime: null
    }
  },
  methods: {

    updateCurrentTime() {
      this.currentTime = moment().format('LTS');
    }

    },
    created() {
    this.currentTime = moment().format('LTS');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
  // components: {
  //   HelloWorld
  // }
};
</script>


<style lang="scss">
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


