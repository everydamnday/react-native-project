import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Post from '../../component/post';
import UserInfo from '../../component/userinfo';

const PostFilterCotainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border: 0.5px black;
  background-color: white;
  margin-bottom: 5px;
`;

const PostFilter = StyleSheet.create({
  myPost: {
    padding: 10,
  },
  bookMark: {
    padding: 10,
  },
});

export const posts = [
  {
    id: 1,
    title: 'Fuck1',
    content: '누군가의 글 1',
    see: 3,
    like: 2,
    createdAt: '2021-04-09',
    images: [],
    User: {
      id: 1,
      brand: 'GS25',
      location: '군포',
    },
    comments: [
      {
        id: 1,
        title: 'naski',
        content: '누군가의 댓글1',
        like: 3,
        createdAt: '2021-03-20',
        User: {
          id: 1,
          brand: '7ELEVEN',
          location: '군포',
        },
        recomments: [
          {
            id: 1,
            User: {
              id: 1,
              brand: 'CU',
              location: '군포',
            },
            title: 'recommenter1',
            content: '누군가의 대댓글1',
            createdAt: '2021-03-20',
          },
          {
            id: 2,
            User: {
              id: 1,
              brand: 'GS25',
              location: '군포',
            },
            createdAt: '2021-03-20',
            title: 'recommenter2',
            content: '누군가의 대댓글2',
          },
        ],
      },
      {
        id: 1,
        title: 'naski',
        content: '누군가의 댓글1',
        like: 3,
        createdAt: '2021-03-20',
        User: {
          id: 1,
          brand: '7ELEVEN',
          location: '군포',
        },
        recomments: [
          {
            id: 1,
            User: {
              id: 1,
              brand: 'CU',
              location: '군포',
            },
            title: 'recommenter1',
            content: '누군가의 대댓글1',
            createdAt: '2021-03-20',
          },
          {
            id: 2,
            User: {
              id: 1,
              brand: 'GS25',
              location: '군포',
            },
            createdAt: '2021-03-20',
            title: 'recommenter2',
            content: '누군가의 대댓글2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Fuck2',
    content: '누군가의 글 2',
    see: 3,
    like: 2,
    createdAt: '2021-04-09',
    images: [],
    User: {
      id: 1,
      brand: 'CU',
      location: '산본',
    },
    comments: [
      {
        id: 1,
        title: 'naski',
        content: '누군가의 댓글1',
        like: 3,
        createdAt: '2021-03-20',
        User: {
          id: 1,
          brand: '7ELEVEN',
          location: '군포',
        },
        recomments: [
          {
            id: 1,
            User: {
              id: 1,
              brand: 'CU',
              location: '군포',
            },
            title: 'recommenter1',
            content: '누군가의 대댓글1',
            createdAt: '2021-03-20',
          },
          {
            id: 2,
            User: {
              id: 1,
              brand: 'GS25',
              location: '군포',
            },
            createdAt: '2021-03-20',
            title: 'recommenter2',
            content: '누군가의 대댓글2',
          },
        ],
      },
      {
        id: 2,
        title: 'naski',
        content: '누군가의 댓글2',
        like: 5,
        createdAt: '2021-03-22',
        User: {
          id: 1,
          brand: 'CU',
          location: '산본',
        },
        recomments: [
          {
            id: 1,
            User: {
              id: 1,
              brand: 'CU',
              location: '군포',
            },
            title: 'recommenter1',
            content: '누군가의 대댓글1',
            createdAt: '2021-03-20',
          },
          {
            id: 2,
            User: {
              id: 1,
              brand: 'GS25',
              location: '군포',
            },
            createdAt: '2021-03-20',
            title: 'recommenter2',
            content: '누군가의 대댓글2',
          },
        ],
      },
    ],
  },
];

const loginuser = {
  id: 1,
  brand: 'CU',
  location: '산본',
  nickname: '꿀단지초코',
};

const MainUser = () => {
  const [postlist, setPostlist] = useState(posts);
  const [user, setUser] = useState(loginuser);
  const navigation = useNavigation();
  const gotoUserInfo = user => () => {
    navigation.navigate('UserInfoDetail', user);
  };
  const gotoPostDetail = post => () => {
    navigation.navigate('UserPostDetail', post);
  };
  return (
    <View>
      <TouchableOpacity onPress={gotoUserInfo(user)}>
        <UserInfo user={user} />
      </TouchableOpacity>
      <PostFilterCotainer>
        <Text style={PostFilter.myPost}>내 글</Text>
        <Text style={PostFilter.bookMark}>북마크</Text>
      </PostFilterCotainer>
      {postlist.map(post => (
        <TouchableOpacity onPress={gotoPostDetail(post)}>
          <Post id={post.id} post={post} />
        </TouchableOpacity>
      ))}
    </View>
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
