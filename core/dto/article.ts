import { BaseValidateData } from "~/utils/validateData";
import { Column, Entity } from "../decorators/validateData.decorators";


@Entity({
  isFull: true,
})
export class SubmitArticleDto extends BaseValidateData {

  @Column({
    length: '1-10',
    message: 'x'
  })
  content: string;

    
}