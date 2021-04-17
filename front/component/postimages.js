import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import React, {useState, useCallback} from 'react';
import ImageZoom from './imagezoom';
import styled from 'styled-components/native';

const PostImages = ({images}) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    console.log('toggle!');
    setVisible(prev => !prev);
  };

  if (images.length === 1) {
    return (
      <>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={toggleOverlay}>
          <Image
            style={{
              borderWidth: 0.3,
              borderColor: 'grey',
              width: 360,
              height: 360,
            }}
            source={images[0]}
          />
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
          <Image
            style={{
              borderWidth: 0.3,
              borderColor: 'grey',
              width: 180,
              height: 180,
            }}
            source={images[0]}
          />
          <Image
            style={{
              borderColor: 'grey',
              borderWidth: 0.3,
              marginLeft: 0.5,
              width: 180,
              height: 180,
            }}
            source={images[1]}
          />
        </TouchableOpacity>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <ImageZoom images={images} toggleOverlay={toggleOverlay} />
        </Overlay>
      </>
    );
  } else {
    return (
      <>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={toggleOverlay}>
          <Image
            style={{
              width: 180,
              height: 180,
            }}
            source={images[0]}
          />
          <View
            style={{
              width: 180,
              height: 180,
              marginLeft: 5,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.8,
              backgroundColor: 'grey',
            }}>
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
