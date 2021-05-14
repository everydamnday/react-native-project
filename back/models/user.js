const { sequelize } = require(".");
const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT
        allowNull: false, //필수
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      brand: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING(30),
        allowNull: false,
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
  User.associate = (db) => {
    db.User.hasMany(db.Post); // 유저가 쓴 포스트(1)
    db.User.hasMany(db.Comment); // 유저가 쓴 코멘트(1)
    db.User.hasMany(db.Recomment); // 유저가 쓴 리코멘트(1)
    db.User.belongsToMany(db.Post, {
      through: "LikePost",
      as: "LikedPost",
      foreignKey: "PostLikerId",
    }); // 좋아요한 포스트(N) => 중앙테이블 Liker 칼럼 생성
    db.User.belongsToMany(db.Comment, {
      through: "LikeComment",
      as: "LikedComment",
      foreignKey: "CommentLikerId",
    }); // 좋아요한 코멘트(N) => 중앙테이블 Liker 칼럼 생성
    db.User.belongsToMany(db.Recomment, {
      through: "LikeRecomment",
      as: "LikedRecomment",
      foreignKey: "RecommentLikerId",
    }); // 좋아요한 리코멘트(N)  => 중앙테이블 Liker 칼럼 생성
    db.User.belongsToMany(db.Post, {
      through: "Bookmark",
      as: "Bookmarked",
      foreignKey: "BookmarkerId",
    }); // 유저가 북마크한 포스트(N) => BookmarkedId 칼럼 생성
  };
  return User;
};

// User 모델 테이블의 이름 : User
// 칼럼 : id | email | password | nickname | brand | region | createdAt | updatedAt | deletedAt |

// 중앙테이블( LikePost with Post)
// 칼럼 : PostLikerId | LikedPostid
// UserId를 참조하는 외래키의 이름이 Liker가 된다.

// 중앙테이블( LikeComment with Comment)
// 칼럼 : CommentLikerId | CommentLikedId
// UserId를 참조하는 외래키의 이름이 CommentLikerId 된다.

// 중앙테이블( LikeRecomment with Recomment)
// 칼럼 : RecommentLikerId | RecommentLikedId
// UserId를 참조하는 외래키의 이름이 RecommentLikerId 된다.

// 중앙테이블( Bookmark with Post)
// 칼럼 : BookmarkerId | BookmarkedId
// UserId를 참조하는 외래키의 이름이 BookmarkerId 된다.
