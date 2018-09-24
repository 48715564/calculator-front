import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Text,
  TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { Touchable } from '../components'
import { ToastLong } from '../utils'

import { createAction, NavigationActions, W, H, F } from '../utils'

@connect(({ app }) => ({ ...app }))
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
  }

  onLogin = () => {
    // 判断账号密码不能为空
    if (this.state.username == '') {
      ToastLong('账号不能为空！')
    } else if (this.state.password == '') {
      ToastLong('密码不能为空！')
    } else {
      this.props.dispatch(
        createAction('app/login')({
          username: this.state.username,
          password: this.state.password,
        })
      )
    }
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  render() {
    const { fetching } = this.props
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <View style={{ width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: H(44),
                borderBottomWidth: 1,
                marginLeft: W(40),
                marginRight: W(40),
              }}
            >
              <Text
                style={{
                  fontSize: F(18),
                  width: W(50),
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                }}
              >
                账号
              </Text>
              <TextInput
                clearButtonMode="while-editing"
                placeholder="请输入账号"
                style={{ height: 40, flex: 1, borderWidth: 0 }}
                maxLength={20}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ username: text })}
                value={this.state.username}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: H(44),
                borderBottomWidth: 1,
                marginLeft: W(40),
                marginRight: W(40),
              }}
            >
              <Text
                style={{
                  fontSize: F(18),
                  width: W(50),
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                }}
              >
                密码
              </Text>
              <TextInput
                clearButtonMode="while-editing"
                placeholder="请输入密码"
                secureTextEntry
                style={{ height: 40, flex: 1, borderWidth: 0 }}
                maxLength={20}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </View>
            <View
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                marginTop: H(30),
                justifyContent: 'center',
              }}
            >
              <Touchable
                style={{
                  width: W(295),
                  height: H(43),
                  display: 'flex',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor: '#4b70c0',
                }}
                onPress={this.onLogin}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontSize: F(18),
                  }}
                >
                  登录
                </Text>
              </Touchable>
            </View>
          </View>
        )}
        {!fetching && (
          <Touchable style={styles.close} onPress={this.onClose}>
            <Image
              style={styles.icon}
              source={require('../images/close.png')}
            />
          </Touchable>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
})

export default Login
