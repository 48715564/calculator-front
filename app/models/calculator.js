import {
  createAction,
  NavigationActions,
  Storage,
  GlobalConstants,
} from '../utils'
import * as businessService from '../services/business'
import { ToastLong } from '../utils'

export default {
  namespace: 'calculator',
  state: {
    result: {
      jxts: '',
      mswtx: '',
      txlx: '',
      txje: '',
    },
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *getResult({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }))
      try {
        const response = yield call(businessService.getResult, payload)
        if (response.success) {
          yield put(createAction('updateState')({ result: response.result }))
        } else if (response.errorCode == '401') {
          // 退出登录
          ToastLong('登录信息过期，请重新登录！')
          Storage.set('login', false)
          GlobalConstants.TOKEN = ''
          yield put(NavigationActions.navigate({ routeName: 'Login' }))
        } else {
          ToastLong(response.msg)
        }
      } catch (e) {
        ToastLong(e.msg)
      }

      yield put(createAction('updateState')({ fetching: false }))
    },
  },
}
