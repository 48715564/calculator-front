import React from 'react'
import { AppRegistry } from 'react-native'
import dva from './utils/dva'
import Router, { routerMiddleware, routerReducer } from './router'
import appModel from './models/app'
import calculatorModel from './models/calculator'

const app = dva({
  initialState: {},
  models: [appModel, calculatorModel],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('calculator', () => App)
