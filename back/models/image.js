const { sequelize } = require(".");
const DataTypes = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      uri: {
        type: DataTypes.STRING(200),
        allowNull: false, //필수
        unique: false,
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
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post); // 포스트에 첨부된 이미지(N) => PostId 칼럼 생성
  };
  return Image;
};

// Image 모델 테이블의 이름 : Image
// 칼럼 : id | uri | PostId | createdAt | updatedAt | deletedAt |
