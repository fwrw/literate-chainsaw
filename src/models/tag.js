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
      });

      Tag.belongsTo(models.Task, {
        foreignKey: 'taskId',
        onDelete: 'CASCADE'
      });
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: '#000000'
      },
      taskId: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: { 
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, 
    {
      sequelize,
      modelName: 'Tag',
    }
  );
  return Tag;
};