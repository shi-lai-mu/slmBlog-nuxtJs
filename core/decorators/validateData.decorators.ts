/**
 * 数据校验装饰器
 *
 * @author Shi-Lai-Mu
 * @create 2021-01-24
 * @description 在类和属性上放装饰器从而验证传入传出数据是否正确
 * @copyright slmblog.com Rights Reserved.
 */

/* tslint:disable */
import { ColumnOptions, EntityOptions } from '@/interface/core/decorators/validateData'
// import { BaseValidateData } from "@/utils/validateData";

/**
 * 此装饰器用于标记将成为实体的类(校验入参或响应)
 */
export const Entity = (options: EntityOptions): ClassDecorator => {
  return function <TFunction extends Function>(target: TFunction) {
    target.prototype.$EntityOptions = options
    // return class extends BaseValidateData { } as unknown as TFunction | void;
  }
}

/**
 * 此装饰器用于标记字段
 */
export const Column = (options: ColumnOptions = {}) => {
  return function (target: Record<string, string[] | unknown>, key: string) {
    if (!target.$columns) {
      target.$columns = {}
      target.$columnsKey = []
      target.$columnsRequiredKey = {}
    }
    ;(target.$columnsKey as string[]).push(key)
    if (options.required) {
      target.$columnsRequiredKey[key] = options
    }
    target.$columns[key] = options
  } as PropertyDecorator
}
