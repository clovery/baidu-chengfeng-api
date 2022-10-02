import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { updateUser } from './updateUser'

export const User = {
  create: createUser,
  update: updateUser,
  delete: deleteUser
}
