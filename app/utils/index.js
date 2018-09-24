import { Dimensions, Platform } from 'react-native'

export { NavigationActions, StackActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export { GlobalConstants } from './GlobalConstants'

export { APIUrl } from './api'

export { Request } from './requestUtils'

export { ToastShort, ToastLong, ToastError } from './Toast'

const { width, height } = Dimensions.get('window')
const widthScale = width / 375
const heightScale = height / 667

export const W = size => size * widthScale
export const H = size => size * heightScale
export const F = size =>
  Platform.OS == 'ios'
    ? Math.ceil(size * heightScale)
    : Math.floor(size * heightScale)
