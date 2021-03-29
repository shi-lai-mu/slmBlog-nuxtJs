import axios from '@/utils/axios';

import { Request } from '@/interface/request';
import { Article } from '@/interface/request/article';
import { SubmitArticleDto, submitArticleReplayDto } from '@/core/dto/article';


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
})
.then((res: Request.Result<Article.Posts>) => {
  if (res.success) {
    if (res.result.comment) {
      res.result.comment.list = res.result.comment?.list.map(comment => {
        const { user, subComment } = comment;
        if (user) comment.nickname = user.nickname;
        if (subComment) {
          subComment.list = subComment.list.map(subItem => {
            if (subItem.user) subItem.nickname = subItem.user.nickname;
            return subItem;
          });
        }
        return comment;
      });
    }
  }
  return res;
}) as Promise<Request.Result<Article.Posts>>;


/**
 * 提交文章
 * @param article 文章数据
 */
export const submitPost = (article: SubmitArticleDto) => axios.send(axios.article.submit, {
  data: article,
}) as Promise<Request.Result<Article.Base>>;


/**
 * 获取上下篇文章
 */
export const getProfile = (articleId: string) => axios.send(axios.article.profile, {
  data: {
    ids: articleId,
  },
}) as Promise<Request.Result<Array<null | Article.Base> | ''>>;


/**
 * 提交文章评论
 */
export const submitArticleReplay = (articleId: number, comment: submitArticleReplayDto) => axios.send(axios.article.submitReplay, {
  params: {
    articleId,
  },
  data: comment,
}) as Promise<Request.Result<Article.Comment>>;