import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import React, {useState} from 'react';
import ImageZoom from './imagezoom';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const width_proportion_for_one = wp('75%');
const height_proportion_for_one = hp('50%');
const width_proportion_for_two = wp('40%');
const height_proportion_for_two = hp('20%');
//
const style = StyleSheet.create({
  pic_single: {
    borderWidth: 0.3,
    borderColor: 'grey',
    width: width_proportion_for_one,
    height: height_proportion_for_one,
    resizeMode: 'cover',
  },
  pic_double: {
    borderColor: 'grey',
    borderWidth: 0.3,
    marginLeft: 0.5,
    width: width_proportion_for_two,
    height: height_proportion_for_two,
    resizeMode: 'contain',
  },
  pic_triple: {
    width: width_proportion_for_two,
    height: height_proportion_for_two,
    resizeMode: 'contain',
  },
  pic_triple_over: {
    width: width_proportion_for_two,
    height: height_proportion_for_two,
    resizeMode: 'contain',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    backgroundColor: 'grey',
  },
});

const PostImages = ({images}) => {
  const [visible, setImageVisible] = useState(false);
  const toggleOverlay = () => {
    setImageVisible(prev => !prev);
  };

  if (images.length === 1) {
    return (
      <>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={toggleOverlay}>
          <Image style={style.pic_single} source={{uri: images[0].uri}} />
        </TouchableOpacity>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <ImageZoom images={images} toggleOverlay={toggleOverlay} />
        </Overlay>
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={toggleOverlay}>
          <Image style={style.pic_double} source={{uri: images[0].uri}} />
          <Image style={style.pic_double} source={{uri: images[1].uri}} />
        </TouchableOpacity>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <ImageZoom images={images} toggleOverlay={toggleOverlay} />
        </Overlay>
      </>
    );
  }

  if (images.length >= 3) {
    return (
      <>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={toggleOverlay}>
          <Image style={style.pic_triple} source={{uri: images[0].uri}} />
          <View style={style.pic_triple_over}>
            <Text>
              +{images.length - 1}
              개의 사진 더보기
            </Text>
          </View>
        </TouchableOpacity>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <ImageZoom images={images} toggleOverlay={toggleOverlay} />
        </Overlay>
      </>
    );
  }
};

export default PostImages;
