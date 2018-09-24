import { Request, APIUrl, GlobalConstants } from '../utils'

export const getResult = (params = {}) => {
  console.log(GlobalConstants.TOKEN)
  return Request.post(APIUrl.getResult, params)
}
