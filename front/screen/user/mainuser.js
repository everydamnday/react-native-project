import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Post from '../../component/post';
import UserInfo from '../../component/userinfo';
import {deserializeBookmark, deserializeMyPost} from '../../reducers/user';
import {useDispatch} from 'react-redux';

const PostFilterCotainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border: 0.3px black;
  background-color: white;
`;

const PostFilter = StyleSheet.create({
  myPost: {
    padding: 10,
  },
  bookMark: {
    padding: 10,
  },
});

const AddPost = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    alignItems: 'center',
    backgroundColor: '#F48024',
    borderRadius: 50,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    bottom: 10,
    justifyContent: 'center',
  },
  plus: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
});

// export const posts = [
//   {
//     id: 1,
//     title: 'Fuck1',
//     content: '누군가의 글 1',
//     see: 3,
//     like: 2,
//     createdAt: '2021-04-09',
//     mages: [],
//     User: {
//       id: 1,
//       brand: 'GS25',
//       location: '군포',
//     },
//     comments: [
//       {
//         id: 1,
//         title: 'naski',
//         content: '누군가의 댓글1',
//         like: 3,
//         createdAt: '2021-03-20',
//         User: {
//           id: 1,
//           brand: '7ELEVEN',
//           location: '군포',
//         },
//         recomments: [
//           {
//             id: 1,
//             User: {
//               id: 1,
//               brand: 'CU',
//               location: '군포',
//             },
//             title: 'recommenter1',
//             content: '누군가의 대댓글1',
//             createdAt: '2021-03-20',
//           },
//           {
//             id: 2,
//             User: {
//               id: 1,
//               brand: 'GS25',
//               location: '군포',
//             },
//             createdAt: '2021-03-20',
//             title: 'recommenter2',
//             content: '누군가의 대댓글2',
//           },
//         ],
//       },
//       {
//         id: 1,
//         title: 'naski',
//         content: '누군가의 댓글1',
//         like: 3,
//         createdAt: '2021-03-20',
//         User: {
//           id: 1,
//           brand: '7ELEVEN',
//           location: '군포',
//         },
//         recomments: [
//           {
//             id: 1,
//             User: {
//               id: 1,
//               brand: 'CU',
//               location: '군포',
//             },
//             title: 'recommenter1',
//             content: '누군가의 대댓글1',
//             createdAt: '2021-03-20',
//           },
//           {
//             id: 2,
//             User: {
//               id: 1,
//               brand: 'GS25',
//               location: '군포',
//             },
//             createdAt: '2021-03-20',
//             title: 'recommenter2',
//             content: '누군가의 대댓글2',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Fuck2',
//     content: '누군가의 글 2',
//     see: 3,
//     like: 2,
//     createdAt: '2021-04-09',
//     images: [],
//     User: {
//       id: 1,
//       brand: 'CU',
//       location: '산본',
//     },
//     comments: [
//       {
//         id: 1,
//         title: 'naski',
//         content: '누군가의 댓글1',
//         like: 3,
//         createdAt: '2021-03-20',
//         User: {
//           id: 1,
//           brand: '7ELEVEN',
//           location: '군포',
//         },
//         recomments: [
//           {
//             id: 1,
//             User: {
//               id: 1,
//               brand: 'CU',
//               location: '군포',
//             },
//             title: 'recommenter1',
//             content: '누군가의 대댓글1',
//             createdAt: '2021-03-20',
//           },
//           {
//             id: 2,
//             User: {
//               id: 1,
//               brand: 'GS25',
//               location: '군포',
//             },
//             createdAt: '2021-03-20',
//             title: 'recommenter2',
//             content: '누군가의 대댓글2',
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: 'naski',
//         content: '누군가의 댓글2',
//         like: 5,
//         createdAt: '2021-03-22',
//         User: {
//           id: 1,
//           brand: 'CU',
//           location: '산본',
//         },
//         recomments: [
//           {
//             id: 1,
//             User: {
//               id: 1,
//               brand: 'CU',
//               location: '군포',
//             },
//             title: 'recommenter1',
//             content: '누군가의 대댓글1',
//             createdAt: '2021-03-20',
//           },
//           {
//             id: 2,
//             User: {
//               id: 1,
//               brand: 'GS25',
//               location: '군포',
//             },
//             createdAt: '2021-03-20',
//             title: 'recommenter2',
//             content: '누군가의 대댓글2',
//           },
//         ],
//       },
//     ],
//   },
// ];

// const loginuser = {
//   id: 1,
//   brand: 'CU',
//   region: '산본',
//   nickname: '꿀단지초코',
// };

const MainUser = () => {
  // const posts = useSelector(state => state.posts);
  const me = useSelector(state => state.user.me);
  const [myPost, setMyPost] = useState([]);
  const [bookMarkPost, setBookMarkPost] = useState(me.Bookmarked);
  const dispatch = useDispatch();

  // 내 글 보기
  const myPostDeserialize = () => {
    setBookMarkPost([]);
    dispatch(deserializeMyPost(me.Posts));
  };

  // 북마크한 글 보기
  const myBookMarkPostDeserialize = () => {
    setMyPost([]);
    if (
      me.Bookmarked[me.Bookmarked.length - 1].title &&
      me.Bookmarked[1].title
    ) {
      // alert('새롭게 불러올 북마크가 없습니다.');
      return null;
    } else {
      return dispatch(deserializeBookmark(me.Bookmarked));
    }
  };

  //전부 복원 및 초기 화면은 북마크로 세팅
  useEffect(() => {
    dispatch(deserializeBookmark(me.Bookmarked));
    dispatch(deserializeMyPost(me.Posts));
  }, []);

  //새로고침용
  useEffect(() => {
    // 자동으로 me.Bookmarked의 변화를 감지해서 실행한다.
    if (Object.keys((me.Bookmarked[me.Bookmarked.length - 1].length = 1))) {
      myBookMarkPostDeserialize(); // 디시리얼라이즈가 일어나고
      setBookMarkPost(me.Bookmarked);
    }
    // // // me.Posts가 변화했다면 me.Posts를 디시리얼라이즈 한다.
    // if (Object.keys((me.Posts[me.Posts.length - 1].length = 1))) {
    //   myPostDeserialize();
    // }
    // 마찬가지로, 포스트도. 새로 생성되면 변화가 감지되어서 디시리얼라이즈가 일어나도록 함.
    // 단 상태에 반영하는 건 버튼을 눌렀을 때만.
  }, [me.Bookmarked]); //me.Posts

  const navigation = useNavigation();

  // 유저정보 상세 페이지 이동
  const gotoUserInfoDetail = () => {
    navigation.navigate('UserInfoDetail', me);
  };

  // 포스트 작성 페이지 이동
  const onAddpost = () => {
    navigation.navigate('Addpost');
  };

  return (
    <>
      <View>
        <TouchableOpacity onPress={gotoUserInfoDetail}>
          <UserInfo me={me} />
        </TouchableOpacity>
        <PostFilterCotainer>
          <TouchableOpacity onPress={myPostDeserialize}>
            <Text style={PostFilter.myPost}>내 글</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={myBookMarkPostDeserialize}>
            <Text style={PostFilter.bookMark}>북마크</Text>
          </TouchableOpacity>
        </PostFilterCotainer>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          {bookMarkPost?.map(post => (
            <Post key={post.id} post={post} tab={'User'} />
          ))}
          {myPost?.map(post => (
            <Post key={post.id} post={post} tab={'User'} />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={onAddpost} style={AddPost.container}>
          <Text style={AddPost.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MainUser;

// {
//   id: 2,
//   title: 'Fuck1',
//   User: {
//     id: 1,
//     brand: 'GS25',
//     location: '군포',
//   },
//   content: '누군가의 글 2',
//   see: 3,
//   like: 2,
//   createdAt: new Date().getDate(),
//   comments: [
//     {
//       id: 1,
//       title: 'naski2',
//       User: {
//         id: 1,
//         nickname: 'sinski!',
//         brand: 'GS25',
//         location: '군포',
//       },
//       content: '누군가의 댓글1',
//       like: 3,
//       createdAt: new Date().getDate(),
//       recomments: [],
//     },
//   ],
// },
