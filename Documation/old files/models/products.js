/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    groupid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'product_groups',
        key: 'ID'
      }
    }
  }, {
    tableName: 'products'
  });
};
