<template>
  <div>
    <div class="_error">
      <h1>{{code}}</h1>
      <h2>{{codeMessage}}</h2>
      <p v-html="message"></p>

      <div class="wave">
        <div class="wave-svg-shape">
          <svg
            v-for="index in 5"
            class="wave-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 215.43"
            :key="index"
            :style="`animation-duration:  ${ 10 + Math.random() * 10 }s`">
            <path
              d="M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z"
              transform="translate(-76 -985)"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { page as ErrorPageConfig } from '../config/error';
@Component
export default class ErrorPage extends Vue  {
  @Prop() error;
  /**
   * 错误代码
   */
  code: number = 0;
  /**
   * 错误内容
   */
  message: string = '';
  /**
   * 错误代码内容
   */
  codeMessage: string = '';
  created() {
    const { statusCode, message } = this.error;
    this.code = statusCode;
    this.message = message;
    this.codeMessage = ErrorPageConfig[statusCode];
  }
}
</script>

<style lang="scss" scoped>
  ._error {
    position: relative;
    overflow: hidden;
    z-index: 2;
    width: 90%;
    height: calc(100vh - 300px);
    margin: 40px auto;
    padding: 5vw;
    @include themify($themes) {
      color: themed('font-lv0-color');
      background-color: themed('bg-dp1-color');
      // box-shadow: inset 10px 5px 5px themed('bg-dp0-color');
    }
    border-radius: 10px;
    box-shadow: inset 10px -10vh 50px rgba($color: #000, $alpha: .8);
    box-sizing: border-box;
  }
  .wave {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 5px;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 10px;
  }
  .wave-svg-shape {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // transform: translateX(-100px);
    animation: fillUpSvg 10s ease-in-out infinite alternate;
    box-shadow: inset 10px 10px 50px rgba($color: #000, $alpha: .4);
    pointer-events: none;
  }
  .wave-svg-shape .wave-svg {
    position: absolute;
    left: 0;
    bottom: -20vh;
    width: 100%;
    height: 50vh;
    @include themify($themes) {
      fill: themed('wave-color');
    }
    opacity: .6;
    animation: waveSvgAnim 5s linear infinite alternate;
  }
  @keyframes fillUpSvg {
    0% {
      transform: scale(3, 1);
    }
    50% {
      transform: scale(8, 1.2);
    }
    100% {
      transform: scale(10, 1);
    }
  }
  @keyframes waveSvgAnim {
    0% {
      transform: translateX(-20vw);
    }
    100% {
      transform: translateX(20vw);
    }
  }
</style>