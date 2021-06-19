import axios from '@/utils/axios'
import { Request } from '@/interface/request'
import { Notify } from '@/interface/request/notify'

/** 获取公告 */
export const getNotic = () => axios.send<Request.Result<Notify.Notic>>(axios.api.notify.notic)

export const getFriendLink = () =>
  axios.send<Request.ResultList<Notify.FriendLink>>(axios.api.notify.friend.get)
