import { ColumnOptions, EntityOptions, ValidateNS } from "~/interface/core/decorators/validateData";

/**
 * 数据校验类
 */
export class BaseValidateData {

  error: ValidateNS.ErrorState[];

  constructor(data) {
    if (data) this.validate(data);
  }

  /**
   * 校验数据
   */
  validate(data: Object) {
    const { $columns, $EntityOptions, $columnsKey, $columnsRequiredKey } = this;
    const columnsRequiredKey = Object.assign({}, $columnsRequiredKey);
    const errorArray: ValidateNS.ErrorState[] = [];
    const success = this._echo(data, (value, key) => {
      if ($columnsKey.includes(key)) {
        const validateField = this.validateField(value, $columns[key], key);
        if (validateField === true) {
          if (columnsRequiredKey[key] && value) {
            delete columnsRequiredKey[key];
          }
        } else {
          errorArray.push(validateField);
        }
      } else {
        if ($EntityOptions.isFull) errorArray.push(ValidateError.toStatus(key, value, 'ExtraField'));
      }

      if (errorArray.length > 0 && $EntityOptions.validateFirst) {
        return errorArray[0];
      }
    });

    const allRequireCount = Object.keys(columnsRequiredKey);
    if (allRequireCount.length) {
      errorArray.push(ValidateError.toStatus(
        $columnsRequiredKey[allRequireCount[0]].name || allRequireCount[0],
        null,
        'RequiredField'
      ));
    }

    this.error = errorArray;
    
    return success !== false
      ? success
      : errorArray.length > 0
        ? errorArray
        : { status: true, message: 'success' }
    ;
  }


  /**
   * 字段校验
   * @param value    值
   * @param options  规则
   * @param fieldKey 键
   */
  validateField(value, options: ColumnOptions, fieldKey?: string): true | ValidateNS.ErrorState {
    let validate: true | ValidateNS.ErrorState = true;
    this._echo(options, (item, key) => {
      const rules = ValidateRules[key + 'Validate'];
      if (rules) {
        options.key = fieldKey;
        validate = rules(value, options, item) as true | ValidateNS.ErrorState;
        if (validate !== true) {
          if (options.message) {
            validate.message = typeof options.message === 'string'
              ? options.message
              : options.message({
                value,
                targetName: key,
                object: item, 
              })
            ;
          }
        }
      }
    });
    return validate;
  }



  /**
   * 内置遍历对象
   * @param obj 对象
   * @param cb  回调
   */
  private _echo(obj: Object, cb: (item, key) => any) {
    const objKey = Object.keys(obj);
    let cbValue = true;
    for (const key of objKey) {
      cbValue = cb(obj[key], key) || false;
      if (cbValue) break;
    }
    return cbValue;
  }

  /**
   * 实体的类 配置
   */
  private readonly $EntityOptions: EntityOptions;

  /**
   * 字段名数组
   */
  private readonly $columnsKey: string[];

  /**
   * 必填字段
   */
  private readonly $columnsRequiredKey: {
    [key: string]: ColumnOptions;
  };

  /**
   * 校验字段 配置
   */
  private readonly $columns: {
    [key: string]: ColumnOptions;
  };
}


/**
 * 校验错误提示静态类
 */
export class ValidateError {
  static readonly RequiredField = $ => `${$}不能为空` ;
  static readonly ExtraField    = $ => `多余字段${$}` ;
  static readonly LengthMAX     = $ => `${$[0]}长度应在 ${$[1]}之内`;
  static readonly LengthMIN     = $ => `${$[0]}长度应在 ${$[1]}以上`;
  /**
   * 输出状态
   */
  static readonly toStatus = (key, value, msg: string, params?: any[]): ValidateNS.ErrorState => ({
    status: false,
    message: ValidateError[msg] ? ValidateError[msg](params || key) : msg,
    key,
    value,
  });
}


/**
 * 校验规则
 */
export class ValidateRules {

  static lengthValidate(value: any, options: ColumnOptions, length: string | number) {
    const valueType = typeof value;
    const { name } = options;
    const number = ['array', 'string'].includes(valueType) ? value.length : parseFloat(value);
    if (typeof length === 'string') {
      let [ min, max ] = length.split('-');
      const Nmin = Math.min(parseFloat(min), parseFloat(max));
      const Nmax = Math.max(parseFloat(min), parseFloat(max));
      return Nmin > number
        ? ValidateError.toStatus(options.key, number, 'LengthMIN', [name || options.key, Nmin])
        : Nmax < number
          ? ValidateError.toStatus(options.key, number, 'LengthMAX', [name || options.key, Nmin])
          : true
      ;
    } else {
      return number > length
        ? ValidateError.toStatus(options.key, number, 'LengthMAX', [name || options.key, length])
        : true
      ;
    }
  }
}
