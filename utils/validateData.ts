import { ColumnOptions, EntityOptions, ValidateNS } from "~/interface/core/decorators/validateData";

/**
 * 数据校验类
 */
export class BaseValidateData {

  error: ValidateNS.ErrorList;

  constructor(data) {
    if (data) this.validate(data);
  }

  /**
   * 校验数据
   */
  validate(data: Object) {
    const { $columns, $EntityOptions } = this;
    const columnsKey = Object.keys($columns);
    const errorArray = [];
    
    const success = this._echo(data, (item, key) => {
      if (columnsKey.includes(key)) {
        const validateField = this.validateField(item, $columns[key]);
        console.log({validateField});
        
      } else {
        if ($EntityOptions.isFull) errorArray.push(ValidateError.toStatus(key, item, 'ExtraField'));
      }

      // 当某一规则校验不通过时，是否停止剩下的规则的校验
      if (errorArray.length > 0 && $EntityOptions.validateFirst) {
        return errorArray[0];
      }
    });
    
    return success !== false
      ? success
      : errorArray.length > 0
        ? errorArray
        : { status: true, message: 'success' }
    ;
  }


  /**
   * 字段校验
   * @param value   值
   * @param options 规则
   */
  validateField(value, options: ColumnOptions) {
    console.log({value, options});
    this._echo(options, (item, key) => {
      console.log(item, key);
      const rules = ValidateRules[key + 'Validate'];
      if (rules) {
        const validate = rules(value, item);
        console.log(validate);
        
      }
    });
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
  static readonly ExtraField = key => `多余字段${key}` ;
  static readonly LengthMAX = key => `长度应在${key}之内`;
  static readonly LengthMIN = key => `长度应在${key}以上`;
  /**
   * 输出状态
   */
  static readonly toStatus = (key, value, msg: string): ValidateNS.ErrorState => ({
    status: false,
    message: ValidateError[msg](key),
    key,
    value,
  });
}


/**
 * 校验规则
 */
export class ValidateRules {

  static lengthValidate(value: any, length: string | number) {
    const valueType = typeof value;
    const number = ['array', 'string'].includes(valueType) ? value.length : parseFloat(value);
    if (typeof length === 'string') {
      let [ min, max ] = length.split('-');
      const Nmin = Math.min(parseFloat(min), parseFloat(max));
      const Nmax = Math.max(parseFloat(min), parseFloat(max));
      return Nmin > number
        ? ValidateError.toStatus(Nmin, number, 'LengthMIN')
        : Nmax < number
          ? ValidateError.toStatus(Nmax, number, 'LengthMAX')
          : true
      ;
    } else {
      return number > length
        ? ValidateError.toStatus(length, number, 'LengthMAX')
        : true
      ;
    }
  }
}
