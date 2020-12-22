<template>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch }   from 'nuxt-property-decorator';
import { getFPS } from '@/utils/animation';

declare global {
  interface Window { L2Dwidget: any; }
}


@Component
export default class Live2D extends Vue {
  mounted() {
    const l2DScript = document.createElement('script');
    const host = this.$config.ossLink;
    l2DScript.src = host + '/L2D/lib/L2Dwidget.min.js';
    document.head.appendChild(l2DScript);
    
    const l2DScript2 = document.createElement('script');
    l2DScript2.src = host + '/L2D/lib/L2Dwidget.0.min.js';
    document.head.appendChild(l2DScript2);
    
    setTimeout(() => {
      const l2Dwidget = window.L2Dwidget || {};
      try {
        l2Dwidget.init({
          model: {
            jsonPath: host + '/L2D/hijiki.model.json',
            scale: 1
          },
          display: {
            position: 'left',
            width: 150,
            height: 300,
            hOffset: 0,
            vOffset: -150
          },
          mobile: {
            show: true,
            scale: 0.5,
            options: 1
          },
          react: {
            opacityDefault: 1,
            opacityOnHover: 0.2
          }
        });

        setTimeout(() => {
          getFPS(fps => {
            if (fps <= 30) {
              const liveEl = document.getElementById('live2d-widget');
              if (liveEl) document.body.removeChild(liveEl);
              this.$message.warning('检测到设备帧数较低，已关闭小猫咪!')
            }
            return true;
          });
        }, 2000);
      } catch(err) {
        console.error('[Live2D] 初始化失败...', err);
      }
    }, 1000);
  }
}

</script>

<style lang='scss'>
.mobile #live2d-widget {
  position: absolute;
  left: 0;
  transform: translateY(-70px) scale(.5);
}
</style>