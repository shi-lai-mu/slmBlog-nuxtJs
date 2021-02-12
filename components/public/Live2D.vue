<template>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch, namespace }   from 'nuxt-property-decorator';
import { getFPS } from '@/utils/animation';
import { StateMutation } from '@/interface/state';
import { stateData as ConfigState } from '@/store/config';

let currentEl: HTMLElement;

const ConfigModule = namespace('config');

/**
 * Live2D 组件
 */
@Component
export default class Live2D extends Vue {
  /**
   * 是否启用Live2D
   */
  @Prop(Boolean) enable;
  /**
   * 设置站点参数
   */
  @ConfigModule.Mutation setWebOptions!: StateMutation;
  /**
   * 网站设置
   */
  @ConfigModule.State setting!: typeof ConfigState.setting;
  /**
   * 初始化状态
   */
  initState: boolean = false;
  /**
   * 消息key
   */
  messageKey = 'live2dMessage';

  @Watch('enable')
  enableChang(enableState: boolean) {
    const { messageKey: key } = this;
    if (this.initState) {
      const el = currentEl || document.getElementById('live2dcanvas');
      currentEl = el;
      if (el) {
        el.style.display = enableState ? 'block' : 'none';
      }
    } else {
      this.$message.loading({
        key,
        content: 'heimi正在加入战场...',
      });
      this
        .init()
        .then(() => this.$message.success({ content: '轰隆一声！heimi闪亮登场！！！', key }))
        .catch(() => {
          this.setting.web.pendant.cat.enable = false;
          this.setWebOptions(this.setting);
          this.$message.error({ content: 'heimi外出觅食了... 晚点再召唤吧！', key });
        })  
      ;
    }
    
  }

  mounted() {
    if (!this.enable) return;
    this.init();
  }

  init() {
    return new Promise((res, rej) => {
      // 禁止二次初始化
      if (this.initState) return false;

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

          this.initState = true;
          res(l2Dwidget);

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
          rej(err);
        }
      }, 1000);
    });
  }
}

declare global {
  interface Window { L2Dwidget: any; }
}
</script>

<style lang='scss'>
.mobile #live2d-widget {
  position: absolute;
  left: 0;
  transform: translateY(-70px) scale(.5);
}
</style>