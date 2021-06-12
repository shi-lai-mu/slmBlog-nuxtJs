export interface EntityOptions {
  /**
   * 规定实体名
   */
  name?: string

  /**
   * 全量模式
   * 如果被校验对象中存在非本实体内的字段也当成错误处理
   */
  isFull?: boolean

  /**
   * 当某一规则校验不通过时，是否停止剩下的规则的校验
   */
  validateFirst?: boolean
}

export interface ValidationArguments {
  /**
   * 校验值
   */
  value: string
  /**
   * 校验目标字段名
   */
  targetName: string
  /**
   * 正在校验的对象
   */
  object: Object
}

export interface ColumnOptions {
  /**
   * 规定字段名
   */
  name?: string

  /**
   * 长度限制
   * string: 2-10(最短2，最长10)
   * number: 10(最短0，最长10)
   */
  length?: string | number

  /**
   * 类型校验
   */
  type?: string

  /**
   * 是否为必须存在
   */
  required?: boolean

  /**
   * 默认值
   */
  default?: string

  /**
   * 复杂规则校验
   */
  rules?: RegExp | ((validationArguments: ValidationArguments) => boolean)

  /**
   * 字段介绍
   */
  description?: string

  /**
   * 是否对字符串去除首尾空格
   */
  stringTirm?: boolean

  /**
   * 错误提示
   */
  message?: string | ((validationArguments: ValidationArguments) => string)

  key?: string
}

export namespace ValidateNS {
  export interface ErrorState {
    status: boolean
    message: string
    key: string
    value: string
  }
}
