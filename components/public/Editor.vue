<template>
  <div id="slmEditor">
    <p v-html="content"></p>
  </div>  
</template>

<script lang="ts">
import hljs from 'highlight.js';

import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { isClient } from '@/utils/axios/lib/config';
// import { AlertMenu } from '@/utils/editorMenu';

@Component
export default class SlmEditor extends Vue {

  // 提示内容
  @Prop(String) placeholder?: string;

  // 是否自动聚焦
  @Prop(Boolean) focus?: boolean;

  // 初始化内容
  @Prop(String) content?: string;

  // 自定义菜单项
  @Prop(Array) menus?: string[];

  // 排除菜单项
  @Prop(Array) excludeMenus?: string[];

  // 编辑器实例
  editor: any = null;

  // 获取当前html内容
  HTML() {
    return this.editor.txt.html();
  }

  // 获取当前text内容
  get Text() {
    return this.editor.txt.text();
  }
  

  mounted() {
    if (isClient) {
      const { focus, placeholder } = this;
      const E = require('wangeditor');
      const editor = new E("#slmEditor");

      // E.registerMenu('alertTest', AlertMenu);

      editor.config.height = 500;
      editor.config.zIndex = 10;
      editor.config.placeholder = placeholder || '请输入正文内容...';
      editor.config.focus = focus || false;
      editor.config.historyMaxSize = 100;
      editor.config.onchangeTimeout = 500;
      editor.highlight = hljs;
      this.moifyAlter(editor);
      this.initEvents(editor);
  
      editor.create();
      this.editor = editor;
    }
  }


  /**
   * 清空内容
   */
  clear() {
    this.editor.txt.clear();
  }

  /**
   * 设置内容
   */
  setContent(content: string) {
    this.editor.txt.html(content);
  }

  /**
   * 修改alter
   */
  moifyAlter(editor) {
    editor.config.customAlert = (s, t) => {
      switch (t) {
        case 'success':
        case 'info':
        case 'warning':
        case 'error':
          this.$message[t](s);
          break
        default:
          this.$message.info(s)
          break
      }
    }
  }


  /**
   * 初始化事件
   */
  initEvents(editor) {
    editor.config.onchange = (newHtml) => {
      this.$emit('change', newHtml);
    }
    editor.config.onblur = (newHtml) => {
      this.$emit('blur', newHtml);
    }
    editor.config.onfocus = (newHtml) => {
      this.$emit('focus', newHtml);
    }
    // 插入网络图片的回调
    editor.config.linkImgCallback = (src) => {
      this.$emit('linkImg', src);
    }
    // 自定义检查 插入视频的回调
    editor.config.onlineVideoCallback = (video) => {
      console.log('lineVideo', video)
    }
  }
}
</script>

<style lang="scss">

  #slmEditor {
    .w-e-toolbar,
    .w-e-text-container,
    .w-e-menu-panel,
    .w-e-panel-tab-content input,
    .w-e-panel-container {
      @include themify($themes) {
        color: themed('font-color') !important;
        background-color: themed('main-bg-color') !important;
        border-color: themed('border-bottom-color') !important;
        user-select: none;
      }
    }

    .w-e-menu .w-e-panel-container {
      @include themify($themes) {
        box-shadow: 1px 1px 2px themed('border-bottom-color');
      }
    }

    .w-e-toolbar .w-e-droplist .w-e-dp-title,
    .w-e-panel-tab-title,
    hr {
      @include themify($themes) {
        border-color: themed('border-bottom-color') !important;
      }
    }

    .w-e-toolbar .w-e-droplist {
      @include themify($themes) {
        background-color: themed('main-bg-f1-color') !important;
        border-color: themed('border-bottom-color') !important;
      }
    }

    div.w-e-item,
    div.w-e-menu i,
    div.w-e-menu span,
    .w-e-droplist p.w-e-dp-title,
    .w-e-menu .w-e-panel-container .w-e-panel-tab-title li.w-e-item,
    div.w-e-menu p {
      @include themify($themes) {
        color: themed('font-color');
      }
    }

    
    .w-e-drop-list-item {
      @include themify($themes) {
        color: themed('font-color') !important;
      }
    }


    .w-e-toolbar .w-e-menu:hover,
    .w-e-item:hover,
    .w-e-panel-tab-content button {
      @include themify($themes) {
        background-color: themed('main-bg-f2-color') !important;
      }
    }
    
    .w-e-toolbar .w-e-menu:hover i,
    .w-e-menu .w-e-panel-container .w-e-panel-tab-title li.w-e-active {
      @include themify($themes) {
        color: themed('a-color2');
      }
    }
    
    article code,
    article blockquote {
      @include themify($themes) {
        background-color: themed('main-bg-code-color') !important;
        border-color: themed('border-left-color') !important;
      }
    }

    // 编辑器圆角
    $w-e-radius: 10px;

    .w-e-toolbar {
      border-radius: $w-e-radius $w-e-radius 0 0;
    }

    .w-e-text-container {
      border-radius: 0 0 $w-e-radius $w-e-radius;
    }
  }
</style>
