/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pachal_chi_roles', {
    id: {
      type: DataTypes.INTEGER(11),
        autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'pachal_chi_roles'
  });
};
