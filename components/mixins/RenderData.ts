import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'

@Component
export default class RenderData<T, S> extends Vue {
  /** 渲染数据 */
  @Prop() ssr?: T

  /** 获取SPA数据回调 */
  fetchData?: () => Promise<T>
  static fetchData?: () => Promise<unknown>

  /** 解析数据返回可渲染的数据 */
  parseData?: (data: S | T) => Promise<S | T> | (S | T)

  /** 可渲染的数据 */
  renderData: S = null

  // created() {
  //   this.setRenderData(this.ssr)
  // }

  /**
   * 设置渲染数据
   */
  @Watch('ssr')
  async setRenderData(data: T | S, selfClass?: Object) {
    const { parseData } = this
    const fetchData = this.fetchData || (selfClass as RenderData<T, S>)?.fetchData
    // 无SSR数据则使用SPA
    if (!data || !Object.keys(data).length) {
      if (fetchData) {
        data = (await fetchData()) as T
      } else {
        return false
      }
    }
    this.renderData = (parseData ? await parseData(JSON.parse(JSON.stringify(data))) : data) as S
  }
}
