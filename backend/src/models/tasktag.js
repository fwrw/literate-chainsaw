'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskTag extends Model {

    static associate(models) {
      
    }
  }
  TaskTag.init({
    taskId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TaskTag',
  });
  return TaskTag;
};