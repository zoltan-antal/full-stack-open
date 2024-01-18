const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../utils/db');

class ReadingList extends Model {}

ReadingList.init(
  {
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'reading_list',
  }
);

module.exports = ReadingList;
