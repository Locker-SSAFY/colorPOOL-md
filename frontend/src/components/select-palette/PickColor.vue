<template>
  <div>
    <div id="container">
      <!-- Color Picker -->
      <div id="colorpicker">
        <div class="color-chip" v-for="(info, index) in materialColors" :key="index"
          :style="{'background-color': info.variations[5].hex}"
          @click="showColor(info.variations[5].hex, info.variations[5].name, info.variations)">
        </div>
      </div>
      <!-- 선택한 컬러 보여주는 원 -->
      <div id="example">
        <div id="bgcolorvalue">
          <div id="bgtitle">{{currentColorName}}</div>
          <div id="bghextitle">{{currentColor}}</div>
        </div>
        <div id="circle" :style="{'background-color': currentColor}" @click="selectColor()">
        </div>
      </div>
    </div>
    <div class="d-flex justify-center mb-2">
      <input id="color-range" class="color-slider" type="range" min="1" max="10" step="1" @change="themeChange" @input="sliderChange"
        :style="{'background' : 'linear-gradient(to right, ' + variations[0].hex + ' 10%,' 
              + variations[1].hex + ' 10% 20%, ' + variations[2].hex + '  20% 30%, ' + variations[3].hex  + '  30% 40%,' 
              + variations[4].hex + ' 40% 50%, ' + variations[5].hex + '  50% 60%, ' + variations[6].hex  + '  60% 70%,' 
              + variations[7].hex + ' 70% 80%, ' + variations[8].hex + '  80% 90%, ' + variations[9].hex + '  90%)'}"
      >
    </div>
    <!-- <div class="d-flex justify-center">
      <div class="variations-wrap">
        <div class="variations" v-for="(color, index) in variations" :key="index" :style="{'background-color': color.hex}"
              @click="selectColor(color)">
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import materialColors from '../../assets/colorList'
import { mapGetters, mapActions } from 'vuex'
const colorStore = 'colorStore'
const themeStore = 'themeStore'

export default {
  name: 'PickColor',

  created() {
    if(this.storeSelectedColor == null) {
      this.setInitColor('#F44336')
    } else {
      this.setInitColor(this.storeSelectedColor);
    }
  },

  computed : {
    ...mapGetters(colorStore, { storeSelectedColor: 'GE_SELECTED_COLOR'})
  },
  data(){
    return{
      materialColors: materialColors,
      currentColor: null,
      currentColorName: null,
      variations: materialColors[0].variations,
      selectedColor: '', 
    } 
  },
  methods:{
    ...mapActions(colorStore, ['AC_SELECTED_COLOR']),
    ...mapActions(themeStore, ['AC_THEME_LIST']),

    /* 
      색깔 hex값을 parameter로 하는 함수
      - parameter : 색깔 hex
      - result :  현재 색깔(currentColor), 이름(currentColorName),
                  배색 (AC_THEME_LIST), 변주(variations)
    */
    setInitColor(storedColor) {
      this.materialColors.forEach((color) => {
        color.variations.forEach((ele) => {
          if(ele.hex == storedColor) {
            this.currentColor = ele.hex;
            this.currentColorName = ele.name;
            this.AC_THEME_LIST(ele.id);
            this.variations = color.variations;
            return;
          }
        })
      })
    },


    selectColor(color){
      // alert('selected Color : '+this.currentColor)
      this.selectedColor = color.hex;
      this.currentColor = color.hex;
      this.currentColorName = color.name;
      this.AC_SELECTED_COLOR(color.hex);
      this.AC_THEME_LIST(color.id);
    },
    showColor(color, name, vari){
      // console.log(color+", "+name);
      this.currentColor = color;
      this.currentColorName = name;
      this.variations = vari;
    },
    sliderChange () {
      var slider = document.querySelector('#color-range');
      console.log(slider.value);
      // const index = val - 1;
      // let idx = val - 1;
      console.log(this.variations[slider.value])
      this.currentColor = this.variations[slider.value - 1].hex;
      this.currentColorName = this.variations[slider.value - 1].name;
      this.AC_SELECTED_COLOR(this.currentColor);
    },
    themeChange () {
      var slider = document.querySelector('#color-range');
      this.AC_THEME_LIST(this.variations[slider.value - 1].id)
      document.querySelector('#color-range')
    }
  }

}
</script>

<style scoped>
#container {
    user-select: none;
    display: flex;
    padding-top: 5px;
    justify-content: center;
    height: 100%;
}

#colorpicker {
  height: 50%;
  width: 45%;
  background-color: rgb(53, 53, 53);
  border-radius: 15px;
  margin: 20px;
  padding: 30px;
}

.color-chip{
  border-radius: 75px;
  float: left;
  height: 30px;
  width: 30px;
  margin: 8.3%;
  transition-duration: 300ms;
  cursor: pointer;
}

.color-chip:hover{
  transform: scale(1.5);
  transition-duration: 300ms;
}

#example {
    margin: 100px 40px 40px 40px;
}

#bgtitle {
    font-size: 14px;
}

#bghextitle {
    font-size: 18px;
}

#bgcolorvalue {
    color: #717171;
    font-size: 18px;
    text-align: center;
    margin-bottom: 50px;
    position: relative;
}

#bgcolorvalue span {
    font-size: 25px;
}

#bgcolorvalue::after {
    content: '';
    position: absolute;
    z-index: 0;
    border: 2px solid #717171;
    height: 128px;
    width: 50px;
    border-right: none;
    top: 29px;
    left: -20px;
}

#colorpicker #example {
    height: 400px;
    width: 300px;
    background-color: rgb(53, 53, 53);
    border-radius: 5px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#circle {
    width: 180px;
    z-index: 1;
    position: relative;
    height: 180px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
}

.variations-wrap{
    height: 80px;
    width: 800px;
    border-radius: 15px;
    background-color: black;
}

.variations{
  overflow: hidden;
  display: inline-block;
  height: 100%;
  width: 10%;
  cursor: pointer;
}

.variations:hover{
  border: 4px solid rgba(0, 0, 0, 0.5);
}

/* slider 관련 css */
.range-value {
    padding: 20px;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: #595959;
    outline: none;
}

.color-slider {
    height: 80px;
    width: 800px;
    border-radius: 15px;
    /* background-image: linear-gradient(to right, #FFEBEE, #B71C1C); */
    padding: 0 10px;
    margin: 0;
    -webkit-appearance: none;
    outline: none;
}
.color-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: transparent;
    height: 50px;
    width: 50px;
    border-radius: 30px;
    outline: none;
    box-shadow: inset 0 0 0 5px white, inset 0 0 0 6px rgba(0, 0, 0, .2), 0 0 0 1px rgba(0, 0, 0, .2);
}


</style>