import { ValidateData } from "~/utils/validateData";
import { Column, Entity } from "../decorators/validateData.decorators";


@Entity({ name: 'test' })
export class SubmitArticleDto {

  @Column({})
  content: string = '';
}