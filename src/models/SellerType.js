/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SellerType', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'SellerType'
  });
};
