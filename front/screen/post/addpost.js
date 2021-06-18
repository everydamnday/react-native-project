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
    fontSize: 18,
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
        const imageFormData = new FormData();
        if (Array.isArray(image) === true) {
          // 배열인 경우(여러 개 일때)
          image.map(i => {
            let file = {
              uri: i.path,
              type: 'image/jpeg',
              name: 'image.png',
            };
            imageFormData.append('image', file);
          });
        } else {
          // 아닌 경우(1개 일때)
          let file = {
            uri: image.path,
            type: 'image/jpeg',
            name: 'image.png',
          };
          imageFormData.append('image', file);
        }
        dispatch(imageUpLoad(imageFormData));
      })
      .catch(e => {
        alert(e);
      });
  };

  // 카메라 열기
  // 카메라는 찍은 사진들이 한번에 하나씩 image로 들어온다.
  // 적당한 객체의 모양으로 만든다음에, 폼데이터 객체에 넣어서 보내준다.
  // FormData는 유사배열이기 때문에, append()로 k-v쌍으로 v에 이미지 파일을 넣어준다고 보면 된다.
  const onCameraOpen = () => {
    ImagePicker.openCamera({
      cropping: true,
    })
      .then(image => {
        const imageFormData = new FormData();
        let file = {
          uri: image.path,
          type: 'image/jpeg',
          name: 'image.png',
        };
        imageFormData.append('image', file);
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
      dispatch(sharePostRequest({title, content, sharePostId: sharePost.id}));
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
          {sharePost && <SharePost SharePost={sharePost} tab={'Post'} />}
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
