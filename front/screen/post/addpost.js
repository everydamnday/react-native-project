import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import PostImages from '../../component/postimages';
import {useDispatch, useSelector} from 'react-redux';
import {
  addPostRequest,
  imageUpLoad,
  imageRemove,
  sharePostRequest,
} from '../../reducers/posts';
import useInput from '../../hooks/useInput';
import Post from '../../component/post';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SharePost from '../../component/sharepost';
import {addPostToMe} from '../../reducers/user';

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
  erase: {},
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

const AddPost = ({route}) => {
  const postId = route.params; // 공유하기일 경우에만 값을 갖는다.
  const [title, onChangeTitle, setTitle] = useInput();
  const [content, onChangeContent, setContent] = useInput();
  const dispatch = useDispatch();
  // const posts = useSelector(state => state.posts);
  const upLoadedImages = useSelector(state => state.posts.upLoadedImages);
  const sharePost = useSelector(state =>
    state.posts.mainPosts.find(p => p.id === postId),
  );

  // 카메라 앨범 열기
  const onGalleryOpen = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(image => {
        // 선택된 image 객체를 배열에 넣어서 dispatch
        const uploadImage = [];
        image.map(i => {
          uploadImage.push({id: Math.floor(Math.random() * 100), uri: i.path});
        });
        dispatch(imageUpLoad(uploadImage));
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
        const imageFormData = new FormData();
        let file = {
          uri: image.path,
          type: 'multipart/form-data',
          name: 'image.png',
        };
        imageFormData.append('image', file);
        // [].forEach.call(file, f => {
        //   imageFormData.append('image', f);
        // });
        // image객체는 보다 많은 값을 갖지만 서버개설 전까지 필요한 id와 uri만 뽑아서 쓴다. 추후 변경.
        // const uploadImage = {
        //   id: Math.floor(Math.random() * 100),
        //   uri: image.path,
        // }; // i.path = 이미지주소의 string
        dispatch(imageUpLoad(imageFormData));
      })
      .catch(e => {
        alert(e);
      });
  };

  // 이미지 업로드 초기화
  const onImageRemove = () => {
    ImagePicker.clean()
      .then(() => {
        dispatch(imageRemove());
      })
      .catch(e => {
        alert(e);
      });
  };

  // 게시하기
  const navigation = useNavigation();
  const onSubmit = () => {
    navigation.navigate('Post'); // 메인포스트 페이지로 넘어가기
    if (sharePost) {
      dispatch(sharePostRequest({title, content, sharePostId: postId}));
    } else {
      dispatch(addPostRequest({title, content, upLoadedImages})); // 작성된 내용을 dispatch
    }
    setTitle('');
    setContent('');
  };

  return (
    <AddPostContainer>
      <ScrollView style={{borderWidth: 1, flex: 1}}>
        <View style={Addpost.container}>
          {sharePost ? null : (
            <View style={Addpost.addItem}>
              <TouchableOpacity onPress={onGalleryOpen}>
                <Text style={Addpost.image}>
                  <Ionicons name="images-outline" size={20} />
                </Text>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity onPress={onCameraOpen}>
                <Text style={Addpost.camera}>
                  <Ionicons name="camera-outline" size={20} />
                </Text>
              </TouchableOpacity>
              <Text>|</Text>
              <TouchableOpacity onPress={onImageRemove}>
                <Text style={Addpost.erase}>
                  <Ionicons name="trash-bin-outline" size={20} />
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            placeholder="제목"
            style={Addpost.title}
            value={title}
            onChange={onChangeTitle}
          />
          <View style={Addpost.content}>
            <TextInput
              placeholder="무슨 생각을 하고 계신가요?"
              multiline={true}
              value={content}
              onChange={onChangeContent}
            />
          </View>
          {upLoadedImages[0] && (
            <View style={Addpost.inputimage}>
              <PostImages images={upLoadedImages} />
            </View>
          )}
          {sharePost && (
            <SharePost
              post={sharePost}
              sharePostId={sharePost.id}
              tab={'Post'}
            />
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
