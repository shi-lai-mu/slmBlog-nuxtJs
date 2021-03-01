import axios from '@/utils/axios';

import { Request } from '@/interface/request';
import { Article } from '@/interface/request/article'
import { SubmitArticleDto } from '~/core/dto/article';


/**
 * 获取文章列表
 */
export const getArticleList = (
  filterMode: keyof typeof Article.StateEnum = 'latest',
  page: number = 1,
  count: number = 10,
  isSimple: boolean = false,
) => axios.send(axios.article.list, {
  params: {
    filterMode,
    page,
    count,
    isSimple,
  }
}) as Promise<Request.ResultList<Article.Base>>;


/**
 * 获取文章内容
 */
export const getPostsData = (data: Article.Base['id'] | Article.Base) => axios.send(axios.article.data, {
  params: {
    articleId: typeof data === 'object' ? data.id : data,
  }
}) as Promise<Request.Result<Article.Posts>>;


/**
 * 提交文章
 * @param article 文章数据
 */
export const submitPost = (article: SubmitArticleDto) => axios.send(axios.article.submit, {
  data: article,
}) as Promise<Request.Result<Article.Base>>;
