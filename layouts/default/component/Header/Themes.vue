<template>
  <li class="slm blog-themes" @click.self="showPopup = !showPopup">
    <Masks :styleList="styleList" :show="!showPopup" @close="() => showPopup = false">
      <div class="popup-content">
        <h4 class="popup-title">
          自定义主题皮肤
        </h4>
        <div>
          123456789
        </div>
      </div>
    </Masks>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import Masks from '~/components/Masks.vue';

@Component({
  components: {
    Masks,
  },
})
export default class HeaderThemes extends Vue {
  styleList: any = {};
  /**
   * 是否显示弹窗
   */
  showPopup: boolean = true;

  @Watch('$store.state.isMobile')
  isMobileUpdate(val) {
    this.styleList.marginLeft = val ? '0' : '-5vw';
    this.$forceUpdate();
  }

  created() {
    const { isMobile } = this.$store.state;
    this.styleList.marginLeft = isMobile ? '0' : '-5vw';
    console.log(this.styleList);
  }
}
</script>

<style lang="scss" scoped>
.popup-content {
  width: 50vw;
  max-width: 600px;
  text-align: left;

  .popup-title {
    border-bottom: 1px;
  }

  .popup-title {
    text-align: center;
    // padding-bottom: 10px;
    // @include themify($themes) {
    //   border-bottom: 1px themed('border-bottom-color') solid;
    // }
  }
}

// 移动端
.layout-default-mobile {

}
</style>
