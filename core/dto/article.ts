import { BaseValidateData } from "~/utils/validateData";
import { Column, Entity } from "../decorators/validateData.decorators";


@Entity({
  isFull: true,
})
export class SubmitArticleDto extends BaseValidateData {

  @Column({
    name: '标题',
    length: '5-50',
  })
  subject: string;

  @Column({
    name: '简介',
    length: '10-500',
  })
  description: string;

  @Column({
    name: '文章内容',
    length: 50,
    required: true,
    message: (params) => {
      console.log(params);
      
      return '船新自定义内容'
    }
  })
  content: string;

  @Column()
  banner: string;

  @Column()
  category: [];

  @Column()
  setting: [];
}