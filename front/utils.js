import React from 'react'
import {View, Text, StyleSheet} from "react-native"

const more = StyleSheet.create({
  more : {
    color: 'grey',
    opacity : 0.6
  }
})

const TrimText = (text, limit) => {
  const trimText = text.length > limit ? `${text.slice(0, limit)}` : text;
  return (
    <View>
      <Text>{trimText}</Text><Text style={more.more}>...더보기</Text>
    </View>
  )
};


export default TrimText;
