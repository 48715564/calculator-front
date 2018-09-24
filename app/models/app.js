import {
  createAction,
  NavigationActions,
  Storage,
  GlobalConstants,
} from '../utils'
import * as authService from '../services/auth'
import { ToastLong } from '../utils'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: true,
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *loadStorage(action, { call, put }) {
      const login = yield call(Storage.get, 'login', false)
      GlobalConstants.TOKEN = login.token
      yield put(createAction('updateState')({ login, loading: false }))
    },
    *login({ payload }, { call, put }) {
      yield put(createAction('updateState')({ fetching: true }))
      try {
        const response = yield call(authService.login, payload)
        if (response.success) {
          // 跳转到首页
          Storage.set('login', response.result)
          GlobalConstants.TOKEN = response.result.token
          yield put(createAction('updateState')({ login: response.result }))
          yield put(NavigationActions.back())
        } else {
          ToastLong(response.msg)
        }
      } catch (e) {
        console.log(e)
        ToastLong(e.msg)
      }

      yield put(createAction('updateState')({ fetching: false }))
    },
    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('updateState')({ login: false }))
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
