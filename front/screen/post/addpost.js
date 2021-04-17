import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ListView,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import PostImages from '../../component/postimages';
// import {useDispatch} from "react-redux"

const AddPostContainer = styled.View`
  flex: 1;
  background-color: white;
  flex-direction: column;
`;

const Addpost = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    borderBottomWidth: 0.3,
  },
  content: {
    fontSize: 20,
  },
  addItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginBottom: 5,
  },
  image: {},
  camera: {},
  sticker: {},
  others: {},
  inputimage: {
    marginTop: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'blue',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    padding: 5,
  },
  button_text: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
});

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImage] = useState([]);

  const dispatch = useDispatch();

  const onTitleInput = e => {
    setTitle(e.nativeEvent.text);
  };

  const onConTentInput = e => {
    setContent(e.nativeEvent.text);
  };

  // 카메라 앨범 열기
  const onGalleryOpen = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(image => {
        // 선택된 image가 배열로 들어온다
        const addImage = [];
        image.map(i => {
          addImage.push({id: Math.floor(Math.random() * 100), uri: i.path});
        });
        setImage(images.concat(addImage));
      })
      .catch(e => {
        alert(e);
      });
  };

  // 카메라 열기
  const onCameraOpen = () => {
    ImagePicker.openCamera({
      cropping: true,
    })
      .then(image => {
        // 찍힌 image가 배열 내 단일 객체로 들어온다.
        const shotImage = {
          id: Math.floor(Math.random() * 100),
          uri: image.path,
        };
        setImage(images.concat(shotImage));
      })
      .catch(e => {
        alert(e);
      });
  };

  // 이미지 업로드 초기화
  const onImageRemove = () => {
    ImagePicker.clean()
      .then(() => {
        setImage([]);
        console.log('removed all tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  // 게시하기
  const navigation = useNavigation();
  const onSubmit = () => {
    console.log(title, content);
    navigation.navigate('Post', {
      id: 8,
      title: title,
      content: content,
      images: images,
      see: 0,
      like: 0,
      createdAt: '2021-04-09',
      User: {
        id: 20,
        brand: 'CU',
        location: '비산효자점',
      },
      comments: [],
    });
    setTitle('');
    setContent('');
  };

  return (
    <AddPostContainer>
      <ScrollView style={{borderWidth: 1, flex: 1}}>
        <View style={Addpost.container}>
          <View style={Addpost.addItem}>
            <TouchableOpacity onPress={onGalleryOpen}>
              <Text style={Addpost.image}>🌁</Text>
            </TouchableOpacity>
            <Text>|</Text>
            <TouchableOpacity onPress={onCameraOpen}>
              <Text style={Addpost.camera}>📷</Text>
            </TouchableOpacity>
            {/* <Text>|</Text>
            <Text style={Addpost.sticker}>😄</Text>
            <Text>|</Text>
            <Text style={Addpost.others}>➕</Text> */}
            <Text>|</Text>
            <TouchableOpacity onPress={onImageRemove}>
              <Text style={Addpost.others}>➖</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="제목"
            style={Addpost.title}
            value={title}
            onChange={onTitleInput}
          />
          <View style={Addpost.content}>
            <TextInput
              placeholder="무슨 생각을 하고 계신가요?"
              multiline={true}
              value={content}
              onChange={onConTentInput}
            />
          </View>
          {images[0] && (
            <View style={Addpost.inputimage}>
              <PostImages images={images} />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={Addpost.button}>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={Addpost.button_text}>게시하기</Text>
        </TouchableOpacity>
      </View>
    </AddPostContainer>
  );
};

export default AddPost;
