'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomPlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomPlayer.belongsTo(models.User, { foreignKey: "UserId" });
      RoomPlayer.belongsTo(models.Room, { foreignKey: "RoomId" })
    }
  }
  RoomPlayer.init({
    RoomId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    score: {
      type: DataTypes.INTEGER
    },
    answers: {
      type: DataTypes.JSONB
    },
  }, {
    sequelize,
    modelName: 'RoomPlayer',
  });
  return RoomPlayer;
};