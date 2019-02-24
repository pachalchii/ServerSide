/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PachalChiRoles', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
        autoIncrement: true

    },
    Role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'PachalChiRoles'
  });
};
