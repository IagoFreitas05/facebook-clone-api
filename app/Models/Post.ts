import { DateTime } from "luxon";
import { BaseModel, BelongsTo, column, HasOne, hasOne, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import { File } from "App/Models/index";
import User from "App/Models/User";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //uma postagem pertence a um usuário e uma postagem  pertence a uma midia
  @hasOne(() => File, {
    foreignKey: "onwerId",
    onQuery: (query) => query.where("fileCategory","post")
  })

  public midia: HasOne<typeof File>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

}
