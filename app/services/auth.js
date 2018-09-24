import { Request, APIUrl } from '../utils'

export const login = (params = {}) => Request.post(APIUrl.loginUrl, params)
