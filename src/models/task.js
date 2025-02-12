'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

    static associate(models) {
      Task.belongsToMany(models.Tag, {
        through: 'TaskTag',
        foreignKey: 'taskId',
      });

      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

    }
  }
  Task.init({
    title: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('in progress', 'finished'),
      defaultValue: 'in progress'
    },
    priority: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10,
      }
    },
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};