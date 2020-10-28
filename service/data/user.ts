import axios from '@/utils/axios';

import { User } from '@/interface/user';

/**
 * 获取用户基础信息
 */
export const getUserBaseData = (userId: User.Base['id']) => axios.send(axios.user.data, {
  params: { userId },
}).then(res => res);
