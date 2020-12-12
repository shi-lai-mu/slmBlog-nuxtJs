import axios from '@/utils/axios';

import { Request } from '@/interface/request';
import { User } from '@/interface/request/user';

/**
 * 获取用户基础信息
 */
export const getUserBaseData = (userId: User.Base['id']): Promise<Request.Result<User.Base>> => axios.send(axios.user.data, {
    params: { id: userId },
  }).then(res => res);
