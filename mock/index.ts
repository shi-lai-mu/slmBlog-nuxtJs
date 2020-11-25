/**
 * Mock 封装
 * author:  ShiLaiMu
 * version: v1.0.0
 * 
 * 根据"@/config/api"自动化引入data文件内的json数据
 */

import './test'; // 测试总接口
import './user'; // 用户总接口
import './article'; // 文章总接口

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock('/news/index', 'post', produceNewsData);

// export default new class Mock {

//     constructor() {
//         this.parseApiConfig(axios.config.api);
//     }

//     parseApiConfig(config) {
//         Object.keys(config).forEach(apiKey => {
//             const current = config[apiKey];
//             if (typeof current === 'string') {
//                 const regExp = /((\w+)(?=\:))?(post|get|put|delete)(?=\.)/ig;
//                 const method = (current.match(regExp) || [])[0] || 'get';
//                 const targetServer = (current.match(/(\w+)(?=\:)/) || [])[0];
//                 console.log(current, method, targetServer);
                
//             } else {
//                 this.parseApiConfig(current);
//             }
//         });
//     }
// };

export default {};
