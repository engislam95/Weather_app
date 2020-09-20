<template>
  <div class="about">
      <div class="q-pa-md loginPage" >
        <h2 class="loginTitle"> Login... </h2>

         <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="name"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <q-input
              filled
              type="number"
              v-model="age"
              label="Your age *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please type your age',
                val => val > 0 && val < 100 || 'Please type a real age'
              ]"
            />

            <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

            <div>
              <q-btn size="lg" label="Login " type="submit" color="indigo-5"/>
              <q-btn size="lg" label="Reset" type="reset" color="indigo-5" flat class="q-ml-sm" />
            </div>
          </q-form>
      </div>
      

  </div>
</template>

<script>

import { mapGetters  } from 'vuex'


export default {
  name: "Home",
  data () {
    return {
         name: null,
      age: null,

      accept: false
    }
  },

   mounted() {
    this.geolocate();
  },

  computed: {
    ...mapGetters([
  
    ])
  },

  methods:{


     onSubmit () {

       let userData = {
         name: this.name ,
         age : this.age
       }
        
          
          console.log("eror") ;
           this.$store.commit('SET_LOGIN_DATA' , userData)
           sessionStorage.setItem("currentUser" , JSON.stringify(userData))
          this.$router.push('/home')



        
      },

      onReset () {
        this.name = null
        this.age = null
        this.accept = false
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

.loginPage
{
  margin: 0 auto ;
  width: 50%;
  position: relative;
  top: 5rem ;

}

.loginTitle
{
   color: #2a5880 !important;
}

[dir] .bg-indigo-5 {
    background: #2a5880 !important ;
}
</style>