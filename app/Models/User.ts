import Hash from "@ioc:Adonis/Core/Hash"
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
  hasOne,
  HasOne
} from "@ioc:Adonis/Lucid/Orm"
import {UserKey, File} from "App/Models"
import Post from "App/Models/Post";

export default class User extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public username: string

  @column()
  public name: string

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column()
  public rememberMeToken?: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  @hasOne(() => File, {
    foreignKey: "ownerId",
    onQuery: (query) => query.where({fileCategory: "avatar"})
  })
  public avatar: HasOne<typeof File>

  @hasMany(()=> Post)
  public posts : HasMany<typeof Post>
}
