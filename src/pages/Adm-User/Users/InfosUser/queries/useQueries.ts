import { deliveryInstance } from "src/services/deliveryInstance"
import { profileValidator, Profile } from "src/validator/profile/profileValidator"


export const getUserInfos = async (id: string) => {
  const response = await deliveryInstance<Profile>(`/user/${id}`)

  const parse = profileValidator.safeParse(response.data);

  if(parse.success) return parse.data;
}