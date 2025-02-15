'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      // Relação muitos-para-muitos com Task através da tabela de junção TaskTag
      Tag.belongsToMany(models.Task, {
        through: 'TaskTag',
        foreignKey: 'tagId',
      });

      // Relação muitos-para-um com User
      Tag.belongsTo(models.User, {
        foreignKey: 'userId',
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