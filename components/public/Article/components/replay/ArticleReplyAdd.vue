<template>
  <div>
    <!-- <ATextArea class="reply-textarea" placeholder="欢迎留下你的足迹~"></ATextArea> -->
    <Editor
      :id="EditorId"
      ref="editor"
      v-model="content"
      class="reply-textarea"
      placeholder="欢迎留下你的足迹~"
      :menus="false"
      :height="200"
      :paste-text-handle="pasteTextHandle"
    />
    <a-row v-if="!user.email" class="reply-user-inputs" type="flex" justify="space-between">
      <a-col :lg="{ span: 7 }" :xs="{ span: 24 }" :span="1">
        <a-input v-model="nickname" placeholder="昵称 (必填)" />
      </a-col>
      <a-col :lg="{ span: 7 }" :xs="{ span: 24 }" :span="1">
        <a-input v-model="email" placeholder="邮箱 (必填)" />
      </a-col>
      <a-col :lg="{ span: 7 }" :xs="{ span: 24 }" :span="1">
        <a-input v-model="link" placeholder="网站/博客 (选填)" />
      </a-col>
    </a-row>
    <div class="reply-user-footer">
      <a-popover
        v-model="emotePopoverVisible"
        :get-popup-container="$config.container"
        placement="bottom"
      >
        <a-button><i class="slm blog-qinggan"></i></a-button>
        <a-tabs slot="content" :default-active-key="'lyf'" class="popover-content">
          <a-tab-pane v-for="(item, index) in getEmoteConfig().list" :key="index" :tab="item.name">
            <ul class="emote-list">
              <li v-for="(emoteItem, emoteIndex) in item.map" :key="emoteIndex" class="emote-item">
                <a-tooltip :title="emoteItem.name">
                  <img
                    :src="item.getLink(emoteItem.url)"
                    :alt="emoteItem.name"
                    @click="e => insertEmote(e, item)"
                  />
                </a-tooltip>
              </li>
            </ul>
          </a-tab-pane>
        </a-tabs>
      </a-popover>
      <a-button type="primary" :loading="loading" @click="submit">发表评论</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, State } from 'nuxt-property-decorator'
import { Input, Col, Row, Button, Popover, Tabs, Tooltip } from 'ant-design-vue'

import { emote } from '@/config/emote'
import { axiosError } from '@/config/error'
import { EmoteConfig } from '@/interface/config'
import { submitArticleReplayDto } from '@/core/dto/article'
import { submitArticleReplay } from '@/core/service/data/article'

import Editor from '@/components/public/Editor.vue'
import { User } from '@/interface/request/user'

/**
 * 添加/回复 评论组件
 */
@Component({
  components: {
    Editor,
    ARow: Row,
    ACol: Col,
    ATabs: Tabs,
    AInput: Input,
    AButton: Button,
    ATooltip: Tooltip,
    APopover: Popover,
    ATabPane: Tabs.TabPane,
    ATextArea: Input.TextArea,
  },
})
export default class ArticleReplyAdd extends Vue {
  /**
   * 编辑器ID
   */
  @Prop() EditorId!: string
  /**
   * 回复目标文章
   */
  @Prop(Number) articleId!: number
  /**
   * 评论父级ID
   */
  @Prop(Number) parentId?: number

  @State
  user: User.Base

  /**
   * 昵称
   */
  nickname: string = ''
  /**
   * 邮箱
   */
  email: string = ''
  /**
   * 相关链接
   */
  link: string = ''
  /**
   * 评论内容
   */
  content: string = ''
  /**
   * 表情气泡层可见性
   */
  emotePopoverVisible: boolean = false
  /**
   * 请求中
   */
  loading: boolean = false

  /**
   * 提交评论方法
   */
  async submit() {
    let { nickname, email } = this
    const { articleId, content, link, parentId } = this
    let submitData: submitArticleReplayDto = {
      content,
    }
    this.loading = true

    // 非登录用户 检测与数据插入
    if (!nickname || !email) {
      const { user } = this
      if (!email && !user) {
        this.loading = false
        return this.$message.error('非登录用户必须填写 昵称 和 邮箱 才能评论!')
      } else if (user) {
        nickname = user.nickname
        email = user.email
      }
    }

    submitData = {
      content,
      nickname,
      email,
      link,
    }

    // 父级评论绑定
    if (parentId) submitData.parentId = parentId

    submitData.content = content
      .replace(/<img /g, '<-img ')
      .replace(/<(\/)?[a-zA-Z]+[1-9]?[^><]*>/g, '')
      .replace(/<-img /g, '<img ')
      .replace(/[a-z-]+:(\s+)?var\([a-z-]+\)(;|\s)+/g, '')
      .replace(/font-size:(\s)?\S+(\s|;)+/g, '')
      .replace(/(:|;|\s)+(\s)+/g, '$1')

    const submit = await submitArticleReplay(articleId, submitData)
    if (submit.success) {
      this.$message.success('评论成功!')
      this.$emit('replaySuccess', submit)
      ;(this.$refs.editor as Editor).clear()
      this.nickname = this.email = this.link = ''
    } else {
      this.$message.error(axiosError.error(submit.message))
    }
    this.loading = false
  }

  /**
   * 粘贴内容回调
   */
  pasteTextHandle(str: string) {
    // console.log(str);
    return str
  }

  /**
   * 插入表情
   */
  insertEmote(e: Event, emote: EmoteConfig['list'][0]) {
    ;(this.$refs.editor as Editor).cmdDo(
      `<img src="${(e.target as HTMLImageElement).src}" class="emote" style="${emote.style}" />`
    )
  }

  /**
   * 获取表情配置
   */
  getEmoteConfig() {
    return emote
  }
}
</script>

<style lang="scss" scoped>
.reply-textarea {
  min-height: 100px;
  margin-top: 10px;
}

.emote-list {
  overflow-y: scroll;
  overflow-x: hidden;
  display: grid;
  height: 200px;
  padding: 0 10px;
  // margin-bottom: 0;
  grid-template-columns: repeat(7, 1fr);

  .emote-item {
    // display: inline-block;
    width: 40px;
    cursor: pointer;
    user-select: none;

    img {
      width: 100%;
      padding: 5px;
      border-radius: 5px;

      &:hover {
        background-color: var(--c-bg-info);
      }

      &:active {
        background-color: var(--m-color-opacity-2-bg-primary);
      }
    }
  }
}

.reply-user-inputs {
  margin: 20px 0 0;

  .ant-col {
    margin-bottom: 10px;
  }
}

.reply-user-footer {
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;

  .ant-btn {
    margin-left: 10px;
  }
}

.popover-content {
  width: 300px;
}
/deep/ .w-e-text-container {
  border-radius: 5px !important;
}

/deep/ .w-e-toolbar {
  display: none;
}

/deep/ .ant-tabs-nav .ant-tabs-tab,
/deep/ .ant-tabs-bar {
  margin: 0;
}
</style>
