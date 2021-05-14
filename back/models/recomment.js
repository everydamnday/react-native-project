const { sequelize } = require(".");
const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Recomment = sequelize.define(
    "Recomment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, //필수
        unique: false,
      },
      like: {
        type: DataTypes.INTEGER,
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
  Recomment.associate = (db) => {
    db.Recomment.belongsTo(db.User); // 유저가 쓴 리코멘트(N) => UserId 칼럼 생성
    db.Recomment.belongsTo(db.Post); // 포스트에 달린 리코멘트(N) => PostId 칼럼 생성
    db.Recomment.belongsToMany(db.User, {
      through: "LikeRecomment",
      as: "RecommentLiker",
      foreignKey: "LikedRecommentId",
    }); // 좋아요한 리코멘트(M) => 중앙테이블 Liker 칼럼 생성
  };
  return Recomment;
};

// Recomment 모델 테이블의 이름 : Recomment
// 칼럼 : id | content | like | UserId | PostId | createdAt | updatedAt | deletedAt |

// 중앙테이블( LikePost with User)
// 칼럼 : RecommentLiker | LikedRecommentId
// RecommentId를 참조하는 외래키의 이름이 LikedRecommentId 된다.
