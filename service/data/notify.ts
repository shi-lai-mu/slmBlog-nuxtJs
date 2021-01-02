import axios, { AxiosSend } from "@/utils/axios";
import { Request } from "~/interface/request";
import { Notify } from "~/interface/request/notify";

/**
 * 获取公告
 */
export const getNotic = () => axios.send(axios.notify.notic) as Promise<Request.Result<Notify.Notic>>;