'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.User, { foreignKey: "HostId" });
      Room.hasMany(models.RoomPlayer, { foreignKey: "RoomId" });
    }
  }
  Room.init({
    code: {
      type: DataTypes.STRING
    },
    HostId: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    },
    questions: {
      type: DataTypes.JSONB
    },
    category: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};