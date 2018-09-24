import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { Stepper, DatePicker } from 'antd-mobile-rn'
import { createAction, ToastLong } from '../utils'
import { Touchable, CustomChildren } from '../components'
import { NavigationActions, Storage } from '../utils'

const { height, width } = Dimensions.get('window')

@connect(({ calculator }) => ({ ...calculator }))
class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
  }

  constructor(props) {
    super(props)
    this.state = {
      pmje: '',
      nll: '',
      yll: '',
      sxf: '',
      txrq: '',
      dqrq: '',
      tzts: '',
      dataRange: this.getDateRange(),
    }
  }

  clear = () => {
    Keyboard.dismiss()
    this.setState({
      pmje: '',
      nll: '',
      yll: '',
      sxf: '',
      txrq: '',
      dqrq: '',
      tzts: '',
    })
  }

  chkPrice = obj => {
    // 方法1
    obj = obj.replace(/[^\d.]/g, '')
    // 必须保证第一位为数字而不是.
    obj = obj.replace(/^\./g, '')
    // 保证只有出现一个.而没有多个.
    obj = obj.replace(/\.{2,}/g, '.')
    // 保证.只出现一次，而不能出现两次以上
    obj = obj
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
    return obj
  }

  chkLast = obj => {
    // 如果出现非法字符就截取掉
    if (obj.substr(obj.length - 1, 1) == '.')
      obj = obj.substr(0, obj.length - 1)
  }

  getDateRange = () => {
    const now = new Date()
    let nextYearDate = new Date()
    nextYearDate = new Date(
      nextYearDate.setFullYear(nextYearDate.getFullYear() + 1)
    )
    return { minDate: now, maxDate: nextYearDate }
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }

  checkLogin = async () => {
    Keyboard.dismiss()
    const userinfo = await Storage.get('login')
    if (!userinfo) {
      this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
    } else {
      this.props.dispatch(
        createAction('calculator/getResult')({
          pmje: this.state.pmje,
          nll: this.state.nll,
          yll: this.state.yll,
          sxf: this.state.sxf,
          txrq: this.state.txrq,
          dqrq: this.state.dqrq,
          tzts: this.state.tzts,
        })
      )
    }
  }

  render() {
    const { result } = this.props
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ height: '100%', backgroundColor: '#f0f0f0' }}
      >
        <View style={{ width: '100%', marginTop: 40 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              票面金额(万元):
            </Text>
            <TextInput
              clearButtonMode="while-editing"
              placeholder="请输入票面金额"
              keyboardType="numeric"
              style={{ height: 40, flex: 1, borderWidth: 0 }}
              maxLength={20}
              dataDetectorTypes="phoneNumber"
              underlineColorAndroid="transparent"
              onChangeText={text =>
                this.setState({ pmje: this.chkPrice(text) })
              }
              value={this.state.pmje}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              年利率(%):
            </Text>
            <TextInput
              clearButtonMode="while-editing"
              placeholder="请输入年利率"
              style={{ height: 40, flex: 1, borderWidth: 0 }}
              maxLength={20}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ nll: this.chkPrice(text) })}
              value={this.state.nll}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              月利率(%):
            </Text>
            <TextInput
              clearButtonMode="while-editing"
              placeholder="请输入月利率"
              style={{ height: 40, flex: 1, borderWidth: 0 }}
              maxLength={20}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ yll: this.chkPrice(text) })}
              value={this.state.yll}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              贴现日期:
            </Text>
            <DatePicker
              mode="date"
              minDate={this.state.dataRange.minDate}
              maxDate={this.state.dataRange.maxDate}
              onChange={text => this.setState({ txrq: text })}
              value={this.state.txrq}
              extra="请选择贴现日期"
              format="YYYY-MM-DD"
            >
              <CustomChildren style={{ marginLeft: 4 }} />
            </DatePicker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              到期日期:
            </Text>
            <DatePicker
              mode="date"
              minDate={this.state.dataRange.minDate}
              maxDate={this.state.dataRange.maxDate}
              onChange={text => this.setState({ dqrq: text })}
              value={this.state.dqrq}
              extra="请选择到期日期"
              format="YYYY-MM-DD"
            >
              <CustomChildren style={{ marginLeft: 4 }} />
            </DatePicker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              调整天数:
            </Text>
            <View style={{ width: 118 }}>
              <Stepper
                min={0}
                defaultValue={0}
                value={this.state.tzts}
                inputStyle={{ fontSize: 14 }}
                onChange={text => this.setState({ tzts: text })}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
              justifyContent: 'center',
            }}
          >
            <Touchable
              style={{
                width: 100,
                height: 43,
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: '#4b70c0',
              }}
              onPress={this.checkLogin}
            >
              <Text
                style={{ textAlign: 'center', color: '#000', fontSize: 18 }}
              >
                计算
              </Text>
            </Touchable>
            <Touchable
              style={{
                width: 100,
                height: 43,
                display: 'flex',
                justifyContent: 'center',
                marginLeft: 10,
                borderRadius: 5,
                backgroundColor: '#c0342c',
              }}
              onPress={this.clear}
            >
              <Text
                style={{ textAlign: 'center', color: '#000', fontSize: 18 }}
              >
                清空
              </Text>
            </Touchable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              计算天数(天):
            </Text>
            <TextInput
              clearButtonMode="while-editing"
              placeholder="等待计算结果"
              editable={false}
              style={{ height: 40, flex: 1, borderWidth: 0 }}
              maxLength={20}
              underlineColorAndroid="transparent"
              value={result.jsts}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              每十万贴息(元):
            </Text>
            <TextInput
              clearButtonMode="while-editing"
              placeholder="等待计算结果"
              editable={false}
              style={{ height: 40, flex: 1, borderWidth: 0 }}
              maxLength={20}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ mswtx: text })}
              value={result.mswtx}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              贴现利息(元):
            </Text>
            <TextInput
              clearButtonMode="while-editing"
              placeholder="等待计算结果"
              editable={false}
              style={{ height: 40, flex: 1, borderWidth: 0 }}
              maxLength={20}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ txlx: text })}
              value={result.txlx}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 44,
              borderBottomWidth: 1,
              marginLeft: 40,
              marginRight: 40,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                width: 100,
                textAlign: 'left',
                backgroundColor: 'transparent',
              }}
            >
              贴现金额(元):
            </Text>
            <TextInput
              clearButtonMode="while-editing"
              placeholder="等待计算结果"
              editable={false}
              style={{ height: 40, flex: 1, borderWidth: 0 }}
              maxLength={20}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ txje: text })}
              value={result.txje}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Detail
