import axios from '@/utils/axios';

import { Request } from '@/interface/request';
import { Article } from '@/interface/request/article'

/**
 * 获取用户基础信息
 */
export const getLatestArticle = (): Promise<Request.Result<Article.Base[]>> => axios.send(axios.article.latest)
  .then(res => res);
