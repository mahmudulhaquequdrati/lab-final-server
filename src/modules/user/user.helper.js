import { UserEntity } from 'src/modules/user/user.entity'

export const getAnUser = async (id) => {
  try {
    const user = await UserEntity.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    // Return the found order
    return user
  } catch (err) {
    throw new Error(err.message)
  }
}
