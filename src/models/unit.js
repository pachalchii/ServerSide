/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Unit', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UnitName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Unit'
  });
};
