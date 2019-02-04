/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_nazar_sanji', {
    id: {
      type: DataTypes.INTEGER(11),
        autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    pachal_chi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    seller: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    seller_operator: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    support: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    transportar: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'order_nazar_sanji'
  });
};
