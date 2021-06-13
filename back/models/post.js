const { sequelize } = require(".");
const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT
        allowNull: false, //필수
        unique: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false, //필수
        unique: false,
      },
      see: {
        type: DataTypes.INTEGER,
        defaultValue: [],
      },
      like: {
        type: DataTypes.INTEGER,
        defaultValue: [],
      },
    },
    {
      freezeTableName: true, // Post 모델의 이름을 변형 없이 테이블 이름으로 설정
      timestamps: true, // createdAt, updatedAt 칼럼 생성
      paranoid: true, // deletedAt 칼럼 생성
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 유저가 쓴 포스트(N) // => UserId 칼럼 생성
    db.Post.hasMany(db.Comment); // 포스트에 달린 코멘트(1)
    db.Post.hasMany(db.Image); // 포스트에 첨부된 이미지(1)
    db.Post.belongsToMany(db.User, {
      through: "LikePost",
      as: "PostLiker",
      foreignKey: "LikedPostId",
    }); // 좋아요한 포스트(M) => 중앙테이블 Liked 칼럼 생성
    db.Post.belongsTo(db.Post, { as: "SharePost" }); // 포스트를 공유한 포스트(1:N) => SharePostId 칼럼 생성
    db.Post.belongsToMany(db.User, {
      through: "Bookmark",
      as: "Bookmarker",
      foreignKey: "BookmarkedId", // Post 테이블에서 지정할 포린키를 입력해라 가 아니라, 포린키는 PostId 인데 중앙테이블에서 이름을 어떻게 할거냐 임.
    }); // 유저가 북마크한 포스트(M) => BookmarkedId 칼럼 생성
  };
  return Post;
};

// Post 모델 테이블의 이름 : Post
// 칼럼 : id | title | content | see | like | UserId | SharePostId | createdAt | updatedAt | deletedAt

// 중앙테이블( LikePost with User) 1:N(User)
// 칼럼 : PostLikerId | LikedPostId
// PostId를 참조하는 외래키의 이름이 LikedPostId 된다.

// 중앙테이블( Bookmark with User) N:M(Post)
// 칼럼 : BookmarkerId | BookmarkedId
// PostId를 참조하는 외래키의 이름이 BookmarkedId가 된다.
