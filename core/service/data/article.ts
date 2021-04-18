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
  }) as Promise<Request.Result<Article.Posts>>
;


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


/**
 * 获取评论列表
 * @param articleId 文章ID
 * @param page      页数
 * @param pageSize  每页个数
 */
export const getCommentList = (articleId: number, page: number = 1, pageSize: number = 10) => axios.send(
    axios.article.commentList,
    {
      params: {
        articleId,
        page,
        pageSize,
      },
    },
  )
  .then((res: Request.Result<Request.ListTotal<Article.Comment>>) => {
    if (res.success) {
      res.result.list = res.result.list.map(comment => {
        comment.subComment = comment.subComment || {
          list: [],
          total: 0,
          page: 1,
          pageSize: 5,
        };
        return comment;
      })
    }
    return res;
  }) as Promise<Request.Result<Request.ListTotal<Article.Comment>>>
;


/**
 * 提交 点赞/点踩 方法
 * @param articleId 文章ID
 * @param loveType  踩赞状态 (1: 赞， 2: 踩)
 * @param targetId  目标Id (如 文章ID/评论ID)
 */
export const submitReplyBehavior = (articleId: number, loveType: 1 | 2, targetId?: number) => axios.send(
    axios.article.goodBehavior,
    {
      data: {
        articleId,
        target: targetId ? 2 : 1, // 目标类型 (1: 文章， 2: 评论)
        targetId,
        loveType,
      },
    },
  ) as Promise<Request.Result<Article.LinkState>>
;