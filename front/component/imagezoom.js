// 문제점 1 - 넘길 때 슬라이드가 중간 경계 걸치는 문제
// 문제점 2 - 슬라이드 캐러셀이 정중앙에 위치하지 않고 위에는 붙고 아래는 떠있음.

import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ImageZoom = ({images, toggleOverlay}) => {
  const [currentIndex, setCurrentIndex] = useState({currentIndex: 1});
  const [parentHeight, setParentHeight] = useState(0);

  const imagesList = [];
  images.map(i => {
    imagesList.push(i.uri);
  });
  const onLayout = e => {
    const {height} = e.nativeEvent.layout;
    setParentHeight(height);
  };
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('100%'),
        // borderWidth: 5,
        // borderColor: 'black',
        // opacity: 0.8,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onLayout={onLayout}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 9999,
        }}
        onPress={toggleOverlay}>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
          }}>
          x
        </Text>
      </TouchableOpacity>
      <SliderBox
        sliderBoxHeight={parentHeight}
        paginationBoxVerticalPadding={10}
        disableOnPress
        // autoplay={true} //자동 슬라이드 넘김
        circleLoop={true} //맨끝 슬라이드에서 다시 첫슬라이드로
        resizeMode="contain" // 이미지 사이즈 조절값
        images={imagesList} // 이미지 주소 리스트
        dotColor="rgba(0,0,0,0)"
        // // dotColor="#FFEE58" // 아래 점 투명으로 안보이게 가림
        inactiveDotColor="rgba(0,0,0,0)"
        // dotStyle={{
        //   // width: 10,
        //   // height: 10,
        //   // borderRadius: 5,
        //   // marginHorizontal: 0,
        //   // padding: 0,
        //   // margin: 0,
        //   backgroundColor: 'rgba(0,0,0,0)',
        // }}
        ImageComponentStyle={{
          height: hp('90%'),
          width: wp('90%'),
        }} // 이미지 Style 적용
        currentImageEmitter={index => {
          // 이미지가 바뀔때 어떤 동작을 할지 설정
          setCurrentIndex({
            currentIndex: index + 1,
          });
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: '3%',
          right: '45%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingRight: 8,
          paddingLeft: 8,
          backgroundColor: 'black',
          // borderRadius: 14,
          // borderTopLeftRadius: 14,
          // borderBottomLeftRadius: 14,
          // backgroundColor: 'red',
        }}>
        <Text style={{fontSize: 15, color: 'white'}}>
          {currentIndex.currentIndex} / {images.length}
        </Text>
      </View>
    </View>
  );
};

export default ImageZoom;

// const styles = StyleSheet.create({});
