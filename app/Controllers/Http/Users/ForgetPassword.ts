import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext"
import User from "App/Models/User"
import faker from "faker"
import StoreValidator from "App/Validators/User/ForgetPassword/StoreValidator"
import Mail from "@ioc:Adonis/Addons/Mail"
import UpdateValidator from "App/Validators/User/ForgetPassword/UpdateValidator"
import {UserKey} from "App/Models"

export default class ForgetPasswordController {
  public async store({request}: HttpContextContract) {
    const {email, redirectUrl} = await request.validate(StoreValidator)
    const user = await User.findByOrFail("email", email)
    const key = faker.datatype.uuid() + user.id
    user.related("keys").create({key})
    const link = `${redirectUrl.replace(/\/$/, "")}/${key}`
    await Mail.send((message) => {
      message.to(email)
      message.from("contatobook.com", "Books")
      message.subject("mudança de senha")
      message.htmlView("emails/forgetPassword", {link})
    })
  }

  public async update({request, response}: HttpContextContract) {
    const {password, key} = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail("key", key)
    const user = await userKey.related("user").query().firstOrFail()
    user.merge({password})
    await user.save()
    await userKey.delete()
    return response.ok({message: " ok "})
  }
}
