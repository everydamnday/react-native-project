import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Post from '../../component/post';
import {set} from 'react-native-reanimated';
// import posts from '../user/user';

export const posts = [
  {
    // id :1
    id: 1,
    title: 'Fuck1',
    content: '누군가의 글 1',
    see: 3,
    like: 2,
    images: [
      {
        id: 1,
        uri:
          'https://item.kakaocdn.net/do/394adaa8e1f450f37d96ed2904b87bb28f324a0b9c48f77dbce3a43bd11ce785',
      },
      {
        id: 2,
        uri:
          'https://pbs.twimg.com/tweet_video_thumb/Eb5h02xUYAEFEmW.jpg:small',
      },
    ],
    createdAt: '2021-04-09',
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
        id: 3,
        title: 'naska',
        content: '누군가의 댓글2',
        like: 3,
        createdAt: '2021-03-20',
        User: {
          id: 1,
          brand: 'Emart24',
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
  // {
  //   // id: 2
  //   id: 2,
  //   title: 'Fuck2',
  //   content: '누군가의 글 2',
  //   see: 3,
  //   like: 2,
  //   image: [],
  //   createdAt: '2021-04-09',
  //   User: {
  //     id: 1,
  //     brand: 'CU',
  //     location: '산본',
  //   },
  //   comments: [
  //     {
  //       id: 1,
  //       title: 'naski',
  //       content: '누군가의 댓글1',
  //       like: 3,
  //       createdAt: '2021-03-20',
  //       User: {
  //         id: 1,
  //         brand: '7ELEVEN',
  //         location: '군포',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: 'naski',
  //       content: '누군가의 댓글2',
  //       like: 5,
  //       createdAt: '2021-03-22',
  //       User: {
  //         id: 1,
  //         brand: 'CU',
  //         location: '산본',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   //id : 3
  //   id: 3,
  //   title: 'Fuck2',
  //   content: '누군가의 글 2',
  //   see: 3,
  //   like: 2,
  //   image: [],
  //   createdAt: '2021-04-09',
  //   User: {
  //     id: 1,
  //     brand: 'CU',
  //     location: '산본',
  //   },
  //   comments: [
  //     {
  //       id: 1,
  //       title: 'naski',
  //       content: '누군가의 댓글1',
  //       like: 3,
  //       createdAt: '2021-03-20',
  //       User: {
  //         id: 1,
  //         brand: '7ELEVEN',
  //         location: '군포',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: 'naski',
  //       content: '누군가의 댓글2',
  //       like: 5,
  //       createdAt: '2021-03-22',
  //       User: {
  //         id: 1,
  //         brand: 'CU',
  //         location: '산본',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   //id : 4
  //   id: 4,
  //   title: 'Fuck2',
  //   content: '누군가의 글 2',
  //   see: 3,
  //   like: 2,
  //   image: [],
  //   createdAt: '2021-04-09',
  //   User: {
  //     id: 1,
  //     brand: 'CU',
  //     location: '산본',
  //   },
  //   comments: [
  //     {
  //       id: 1,
  //       title: 'naski',
  //       content: '누군가의 댓글1',
  //       like: 3,
  //       createdAt: '2021-03-20',
  //       User: {
  //         id: 1,
  //         brand: '7ELEVEN',
  //         location: '군포',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: 'naski',
  //       content: '누군가의 댓글2',
  //       like: 5,
  //       createdAt: '2021-03-22',
  //       User: {
  //         id: 1,
  //         brand: 'CU',
  //         location: '산본',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   //id : 5
  //   id: 5,
  //   title: 'Fuck2',
  //   content: '누군가의 글 2',
  //   see: 3,
  //   like: 2,
  //   image: [],
  //   createdAt: '2021-04-09',
  //   User: {
  //     id: 1,
  //     brand: 'CU',
  //     location: '산본',
  //   },
  //   comments: [
  //     {
  //       id: 1,
  //       title: 'naski',
  //       content: '누군가의 댓글1',
  //       like: 3,
  //       createdAt: '2021-03-20',
  //       User: {
  //         id: 1,
  //         brand: '7ELEVEN',
  //         location: '군포',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       title: 'naski',
  //       content: '누군가의 댓글2',
  //       like: 5,
  //       createdAt: '2021-03-22',
  //       User: {
  //         id: 1,
  //         brand: 'CU',
  //         location: '산본',
  //       },
  //       recomments: [
  //         {
  //           id: 1,
  //           User: {
  //             id: 1,
  //             brand: 'CU',
  //             location: '군포',
  //           },
  //           title: 'recommenter1',
  //           content: '누군가의 대댓글1',
  //           createdAt: '2021-03-20',
  //         },
  //         {
  //           id: 2,
  //           User: {
  //             id: 1,
  //             brand: 'GS25',
  //             location: '군포',
  //           },
  //           createdAt: '2021-03-20',
  //           title: 'recommenter2',
  //           content: '누군가의 대댓글2',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

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

const MainPost = ({route}) => {
  const [postlist, setPostlist] = useState(posts);
  const newPost = route.params;

  useEffect(() => {
    if (newPost) {
      setPostlist([newPost, ...postlist]);
    }
  }, [newPost]);

  const navigation = useNavigation();
  const onAddpost = () => {
    navigation.navigate('Addpost');
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{borderWidth: 1}}>
        {postlist.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={onAddpost} style={AddPost.container}>
        <Text style={AddPost.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPost;
