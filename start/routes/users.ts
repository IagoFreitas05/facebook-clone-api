/* eslint-disable prettier/prettier */
import Route from "@ioc:Adonis/Core/Route"
Route.post("/users/register", "Users/Register.store")
Route.get("/users/register/:key", "Users/Register.show")
Route.post("/users/forgetPassword","Users/ForgetPassword.store")
Route.put("/users/forgetPassword","Users/ForgetPassword.update")
Route.put("/users/register", "Users/Register.update")
Route.get("/users","Users/Main.show").middleware('auth')
Route.put("/users/update","Users/Main.update").middleware('auth')
Route.put("/users/avatar","Users/Avatar.update").middleware('auth')
Route.delete("/users/avatar","Users/Avatar.destroy").middleware('auth')
