const { sequelize } = require(".");
const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
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
      freezeTableName: true, // 모델의 이름을 변형 없이 테이블 이름으로 설정
      timestamps: true, // createdAt, updatedAt 칼럼 생성
      paranoid: true, // deletedAt 칼럼 생성
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User); // 유저가 쓴 코멘트(N) => UserId 칼럼 생성
    db.Comment.belongsTo(db.Post); // 포스트에 달린 코멘트(N) => PostId 칼럼 생성
    db.Comment.hasMany(db.Recomment); // 코멘트에 달린 리코멘트(1)
    db.Comment.belongsToMany(db.User, {
      through: "LikeComment",
      as: "CommentLiker",
      foreignKey: "LikedCommentId",
    }); // 좋아요한 코멘트(M) => 중앙테이블 Liked 칼럼 생성
  };
  return Comment;
};

// Comment 모델 테이블의 이름 : Comment
// 칼럼 : id | content | see | like | UserId | PostId | createdAt | updatedAt | deletedAt |

// 중앙테이블( LikePost with User)
// 칼럼 : Liker | Liked
// CommentId를 참조하는 외래키의 이름이 Liked가 된다.
