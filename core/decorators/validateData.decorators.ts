/* tslint:disable */
let x: any[] = [];
export const Entity = (res: any) => {
  console.log({res});
  return function(target) {
    console.log({target, res});
    
    target.apiUrl = x;
    x = []
  };
}

export const Column = (ColumnParams) => {
  console.log({ ColumnParams });
  return function(targetName, ValidateData) {
    const { constructor } = ValidateData;
    console.log({targetName, constructor});
    x.push([targetName, ValidateData]);
    targetName.xx = 'xx'
    constructor.xx = 'xx'
    // s.__proto__[c] = '';
    // console.log(s.__proto__, s.__proto__[c]);
    // s.__proto__[c] = ''
  };
}