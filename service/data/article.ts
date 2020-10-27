import axios from '@/utils/axios';

/**
 * 获取用户基础信息
 */
export const getLatestArticle = () => axios.send(axios.article.latest).then();
