import axios from '@/utils/axios';
import { Request } from '@/interface/request';
import { Article } from '@/interface/request/article'


/**
 * 获取文章列表
 */
export const getArticleList = (
  filterMode: keyof typeof Article.StateEnum = 'Routine',
  page: number = 1,
  count: number = 10,
): Promise<Request.ResultList<Article.Base>> => axios.send(axios.article.list, {
  params: {
    filterMode,
    page,
    count,
  }
}).then(v => v);


/**
 * 获取文章内容
 */
export const getPostsData = (articleId: Article.Base['id']): Promise<Request.Result<Article.Posts>> => axios.send(axios.article.data, {
  params: {
    articleId,
  }
}).then(v => v);