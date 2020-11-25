/**
 * 响应主体
 */

// 所有主体框架响应状态
const responseSuccess = true;
// 所有主体框架响应错误信息
const responseError = '';
// 所有主体框架响应错误码
const responseCode = null;

/**
 * 基础外层响应框架
 * @param data mock数据
 */
export const baseRes = data => {
  return {
    success: responseSuccess,
    result: responseSuccess ? data : null,
    code: responseCode,
    message: responseError,
  };
}