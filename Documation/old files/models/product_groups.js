/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_groups', {
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
        model: 'product_groups',
        key: 'ID'
      }
    }
  }, {
    tableName: 'product_groups'
  });
};
