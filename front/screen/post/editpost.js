import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
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
  UPLOAD_IMAGE_ADD,
  editPostRequest,
} from '../../reducers/posts';
import useInput from '../../hooks/useInput';
import Post from '../../component/post';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SharePost from '../../component/sharepost';
import {addPostToMe} from '../../reducers/user';

const EditPostContainer = styled.View`
  flex: 1;
  background-color: white;
  flex-direction: column;
`;

const Editpost = StyleSheet.create({
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
  pic_item: {
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

// addPost와 달리 쓰여진 데이터가 들어가야 한다.
// => 단순히 view가 아니라 textInput에 value로 넣어주어야 한다.

// useState로 만든 image 상태와 리덕스에서 관리하는 uploadImages의 상태로 구분했다.
// addPost에서는 모든 첨부사진을 바로 s3에 업로드하는 uploadImages 상태로 관리했다면,
// editPost에서는 새롭게 첨부되는 사진을 image 상태로 관리하다가 필요 시에 s3로 업로드 할 것이다.

const EditPost = ({route}) => {
  const postId = route.params; // 수정 대상 포스트 id
  const targetPost = useSelector(state =>
    state.posts.mainPosts.find(p => p.id === postId),
  );
  const [title, onChangeTitle, setTitle] = useInput(targetPost.title);
  const [content, onChangeContent, setContent] = useInput(targetPost.content);
  const dispatch = useDispatch();
  const upLoadedImages = useSelector(state => state.posts.upLoadedImages);

  // 기존 데이터를 넣기
  useEffect(() => {
    console.log(targetPost.Images);
    dispatch(imageUpLoad(targetPost.Images)); // = [{id: ~, uri: ~}, {id: ~, uri: ~}...]
  }, []);

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

  // 카메라 열기(무조건 새로운 사진이 올라온다.)
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
        dispatch(imageRemove()); // 업로드된 이미지 상태 제거
      })
      .catch(e => {
        alert(e);
      });
  };

  // 수정 게시하기
  const navigation = useNavigation();
  const onSubmit = () => {
    navigation.navigate('Post'); // 메인포스트 페이지로 넘어가기
    dispatch(
      editPostRequest({
        postId,
        title,
        content,
        upLoadedImages,
      }),
    ); // 작성된 내용을 dispatch
    // 이후 상태 초기화
    setTitle('');
    setContent('');
  };

  return (
    <EditPostContainer>
      <ScrollView style={{borderWidth: 1, flex: 1}}>
        <View style={Editpost.container}>
          <View style={Editpost.pic_item}>
            <TouchableOpacity onPress={onGalleryOpen}>
              <Text style={Editpost.image}>
                <Ionicons name="images-outline" size={20} />
              </Text>
            </TouchableOpacity>
            <Text>|</Text>
            <TouchableOpacity onPress={onCameraOpen}>
              <Text style={Editpost.camera}>
                <Ionicons name="camera-outline" size={20} />
              </Text>
            </TouchableOpacity>
            <Text>|</Text>
            <TouchableOpacity onPress={onImageRemove}>
              <Text style={Editpost.erase}>
                <Ionicons name="trash-bin-outline" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="제목"
            style={Editpost.title}
            value={title}
            onChange={onChangeTitle}
          />
          <View style={Editpost.content}>
            <TextInput
              placeholder="무슨 생각을 하고 계신가요?"
              multiline={true}
              value={content}
              onChange={onChangeContent}
            />
          </View>
          {upLoadedImages[0] && (
            <View style={Editpost.inputimage}>
              <PostImages images={upLoadedImages} />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={Editpost.button}>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={Editpost.button_text}>게시하기</Text>
        </TouchableOpacity>
      </View>
    </EditPostContainer>
  );
};

export default EditPost;
