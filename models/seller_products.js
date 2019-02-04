/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seller_products', {
    id: {
      type: DataTypes.INTEGER(11),
        autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    price_date_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    supply_of_product: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    unit_of_product: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    productid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    sellerid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'seller',
        key: 'id'
      }
    },
    unitid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'unit',
        key: 'id'
      }
    }
  }, {
    tableName: 'seller_products'
  });
};
