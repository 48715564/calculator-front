import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

export const CustomChildren = ({ extra, onClick, children, style }) => (
  <TouchableOpacity onPress={onClick} style={style}>
    <Text>{extra}</Text>
  </TouchableOpacity>
)
export default CustomChildren
