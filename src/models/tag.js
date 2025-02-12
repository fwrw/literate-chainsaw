'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      
      Tag.belongsToMany(models.Task, {
        through: 'TaskTag',
        foreignKey: 'tagId',
      });

      Tag.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
      color: DataTypes.STRING,
      userId: DataTypes.INTEGER
    }, 
    {
      sequelize,
      modelName: 'Tag',
    }
  );
  return Tag;
};