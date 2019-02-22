/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CarModel', {
      ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
      ParentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CarModel',
        key: 'ID'
      }
    }
  }, {
    tableName: 'CarModel'
  });
};
