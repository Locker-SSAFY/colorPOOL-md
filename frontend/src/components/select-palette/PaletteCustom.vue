<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="600"
      persistent
    >
      <!-- <div class="theme-wrap d-flex align-center justify-center" style="background-color: white">

      </div> -->
      <v-card :style="{'background-color' : customTheme.background, 'color' : invertedTextColor}">
        <v-card-title>
          THEME
        </v-card-title>
        <div class="custom-theme-wrap d-flex align-center justify-center" :style="{'background-color' : 'rgb(255, 255, 255)'}">
          <div class="theme color1" :class="[isActive0? 'active': '']" @click="clickTheme1" :style="{'background-color' : colors[0]}"></div>
          <div class="theme color2" :class="[isActive1? 'active': '']" @click="clickTheme2" :style="{'background-color' : colors[1]}"></div>
          <div class="theme color3" :class="[isActive2? 'active': '']" @click="clickTheme3" :style="{'background-color' : colors[2]}"></div>
          <div class="theme color4" :class="[isActive3? 'active': '']" @click="clickTheme4" :style="{'background-color' : colors[3]}"></div>
          <div class="theme color5" :class="[isActive4? 'active': '']" @click="clickTheme5" :style="{'background-color' : colors[4]}"></div>
        </div>
        <div v-if="colorIndex == -1" style="display: flex; align-items: center; justify-content: center; text-align: center; height: 98px;">
          <span style="font-size: 1.2em;">커스텀할 색이 있다면 선택해보세요</span>
        </div>
        <div v-show="colorIndex != -1" class="custom-color-range justify-center align-center mb-2">
          <input class="color-slider r" type="range" min="0" max="255" step="1" :value="r" @input="colorChange">
          <input class="color-slider g" type="range" min="0" max="255" step="1" :value="g" @input="colorChange">
          <input class="color-slider b" type="range" min="0" max="255" step="1" :value="b" @input="colorChange">
        </div>
        <v-card-actions class="justify-end mr-2 pb-4">
          <v-btn @click="submit">
            SUBMIT
          </v-btn>
          <v-btn @click="close">
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="isLoading" class="loading-layer"><img src="../../assets/loading.gif"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const landingStore = 'landingStore'
// const colorStore = 'colorStore'
const customStore = 'customStore'
const contentStore = 'contentStore'
const editStore = 'editStore'
const pdfStore = 'pdfStore'

export default {
  name: 'PaletteCustom',
  computed:{
    ...mapGetters( landingStore, {storeDialog: 'GE_DIALOG'}),
    ...mapGetters(customStore, {storeCustomTheme: 'GE_CUSTOM_THEME'}),
  },
  data(){
    return{
      dialog: false,
      customTheme: null,
      colors: [],
      invertedTextColor: 'black',
      colorIndex: -1,
      r: null,
      g: null,
      b: null,
      isActive0: false,
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      isLoading: false,
    }
  },
  watch: {
    storeDialog(val){
      this.dialog = val;
    },
    storeCustomTheme() {
      this.customTheme = this.storeCustomTheme;
      this.colors[0] = this.customTheme.color1;
      this.colors[1] = this.customTheme.color2;
      this.colors[2] = this.customTheme.color3;
      this.colors[3] = this.customTheme.color4;
      this.colors[4] = this.customTheme.color5;
      this.setBackgroundColor(this.storeCustomTheme.background);
    },
    colorIndex(val) {
      // 선택 색깔이 바뀜
      if(val == -1) return;
      let color = this.colors[val];
      color = color.replace("rgb(", "");
      color = color.replace(")", "");
      color = color.split(", ");
      this.r = color[0];
      this.g = color[1];
      this.b = color[2];
      document.querySelector('.color-slider.r').style.background = 'linear-gradient(to right, rgb(0, ' + this.g + ', ' + this.b + '), rgb(255, ' + this.g + ', ' + this.b + '))'
      document.querySelector('.color-slider.g').style.background = 'linear-gradient(to right, rgb(' + this.r + ', 0, ' + this.b + '), rgb(' + this.r + ', 255, ' + this.b + '))'
      document.querySelector('.color-slider.b').style.background = 'linear-gradient(to right, rgb(' + this.r + ', ' + this.g + ', 0), rgb(' + this.r + ', ' + this.g + ', 255))'
    }
  },
  beforeUpdate() {
    this.customTheme = this.storeCustomTheme;
  },
  created(){
    this.dialog = this.storeDialog;
    this.customTheme = this.storeCustomTheme;
    this.isLoading = false;
  },
  beforeDestroy(){
    this.AC_DIALOG(false);
  },
  methods: {
    ...mapActions(landingStore, ['AC_DIALOG']),
    ...mapActions(customStore, ['AC_FINAL_THEME']),
    ...mapActions(contentStore, ['AC_CONTENTS_NULL']),
    ...mapActions(editStore, ['AC_PAGE']),
    ...mapActions(pdfStore, ['AC_CONTENTS']),
    close(){
      this.AC_DIALOG(false);
      this.initIsActive();
      this.colorIndex = -1;
    },
    submit() {
      this.AC_DIALOG(false);
      this.initIsActive();
      this.colorIndex = -1;
      this.AC_FINAL_THEME(this.colors);
      this.isLoading = true;
      this.AC_CONTENTS_NULL();
      setTimeout(() => {
        this.AC_PAGE(0);
        this.AC_CONTENTS(null);
        this.$router.push({name: 'Edit'})
      }, 1500);
    },
    setBackgroundColor(color) {
      let hex = color.replace('#', '');
      var value = hex.match( /[a-f\d]/gi ); 
      value = hex.match( /[a-f\d]{2}/gi ); 
      var r = parseInt( value[0], 16 ); 
      var g = parseInt( value[1], 16 ); 
      var b = parseInt( value[2], 16 ); 

      var num = r+g+b;
      if(num < 300) {
        this.invertedTextColor = 'white'
      } else {
        this.invertedTextColor = 'black'
      }
    },
    initIsActive() {
      this.isActive0 = false;
      this.isActive1 = false;
      this.isActive2 = false;
      this.isActive3 = false;
      this.isActive4 = false;
    },
    clickTheme1(){
      this.initIsActive();
      this.isActive0 = true;   
      this.colorIndex = 0;
    },
    clickTheme2(){
      this.initIsActive();
      this.isActive1 = true;   
      this.colorIndex = 1;
    },
    clickTheme3(){
      this.initIsActive();
      this.isActive2 = true;   
      this.colorIndex = 2;
    },
    clickTheme4(){
      this.initIsActive();
      this.isActive3 = true;   
      this.colorIndex = 3;
    },
    clickTheme5(){
      this.initIsActive();
      this.isActive4 = true;   
      this.colorIndex = 4;
    },
    colorChange() {
      var r = document.querySelector('.color-slider.r').value;
      var g = document.querySelector('.color-slider.g').value;
      var b = document.querySelector('.color-slider.b').value;
      this.r = r;
      this.g = g;
      this.b = b;
      document.querySelector('.color-slider.r').style.background = 'linear-gradient(to right, rgb(0, ' + this.g + ', ' + this.b + '), rgb(255, ' + this.g + ', ' + this.b + '))'
      document.querySelector('.color-slider.g').style.background = 'linear-gradient(to right, rgb(' + this.r + ', 0, ' + this.b + '), rgb(' + this.r + ', 255, ' + this.b + '))'
      document.querySelector('.color-slider.b').style.background = 'linear-gradient(to right, rgb(' + this.r + ', ' + this.g + ', 0), rgb(' + this.r + ', ' + this.g + ', 255))'
      this.colors[this.colorIndex] = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
  }
}
</script>

<style scoped>
.custom-theme-wrap{
  margin-left: 25%;
  width: 50%;
  height: 105px;
  border: 4px solid #707070;
}

.theme {
  width: 65px;
  height: 65px;
  border-radius: 75px;
  border: 4px solid #707070;
  transition-duration: 300ms;
}

.theme.active {
  transform: scale(1.2);
}

.theme.color1{
  z-index: 50;
}

.theme.color2{
  margin-left: -30px;
  z-index: 51;
}

.theme.color3{
  margin-left: -30px;
  z-index: 52;
}

.theme.color4{
  margin-left: -30px;
  z-index: 53;
}

.theme.color5{
  margin-left: -30px;
  z-index: 54;
}


/* ============================== color range 관련 CSS ============================== */
.custom-color-range {
  margin-top: 10px;
}

.range-value {
    padding: 20px;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #595959;
    outline: none;
}

.color-slider {
    height: 20px;
    width: 80%;
    margin: 0;
    margin-left: 10%;
    /* background-image: linear-gradient(to right, #FFEBEE, #B71C1C); */
    padding: 0 10px;
    
    -webkit-appearance: none;
    outline: none;
}
.color-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: transparent;
    height: 20px;
    width: 20px;
    border-radius: 30px;
    outline: none;
    box-shadow: inset 0 0 0 5px white, inset 0 0 0 6px rgba(0, 0, 0, .2), 0 0 0 1px rgba(0, 0, 0, .2);
}

/* =================================================================================== */
.loading-layer {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: rgba(0, 0, 0, .6);
}

.loading-layer img {
  width: 300px;
  height: 300px;
}
</style>