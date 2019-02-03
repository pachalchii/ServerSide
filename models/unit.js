/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('unit', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    unit_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'unit'
  });
};
