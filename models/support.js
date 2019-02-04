/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('support', {
    id: {
      type: DataTypes.INTEGER(11),
        autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    family_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'support'
  });
};
