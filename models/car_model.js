/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car_model', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    parentid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'car_model',
        key: 'id'
      }
    }
  }, {
    tableName: 'car_model'
  });
};
