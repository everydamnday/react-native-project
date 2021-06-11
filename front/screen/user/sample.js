// // 북마크
// useEffect(() => {
//   // 자동으로 me.Bookmarked의 변화를 감지해서 실행한다.
//   // 일부 요소가 불완전 합니까? => 디시리얼라이즈/ 아니면 상태반영
//   console.log('북마크 새로고침');
//   if (
//     Object.keys((me.Bookmarked[me.Bookmarked.length - 1].length = 1)) &&
//     me.Bookmarked[0].title
//   ) {
//     console.log('북마크 디시리얼라이즈 in effect');
//     myBookMarkPostDeserialize(); // 디시리얼라이즈가 일어나고 다시한번 Effect 시에 else로 감.
//   } else if (
//     me.Bookmarked[me.Bookmarked.length - 1].title &&
//     me.Bookmarked[0].title
//   ) {
//     setBookMarkPost(me.Bookmarked); // 풀객체일 때는 그냥 상태만 반영.
//     setMyPost([]);
//   }
// }, [me.Bookmarked]); //me.Posts

// // 포스트
// useEffect(() => {
//   // me.Posts가 변화했다면 me.Posts를 디시리얼라이즈 한다.
//   if (
//     // 일부 요소가 불완전 합니까? => 디시리얼라이즈, 아니면 상태반영
//     Object.keys((me.Posts[me.Posts.length - 1].length = 1)) &&
//     me.Posts[0].title
//   ) {
//     console.log('포스트 디시리얼라이즈 in effect');
//     myPostDeserialize();
//   } else if (me.Posts[me.Posts.length - 1].title && me.Posts[0].title) {
//     console.log('포스트 상태 반영');
//     setMyPost(me.Posts);
//     setBookMarkPost([]);
//   }
// 마찬가지로, 포스트도. 새로 생성되면 변화가 감지되어서 디시리얼라이즈가 일어나도록 함.
// 단 상태에 반영하는 건 버튼을 눌렀을 때만.
// }, [me.Posts]);
