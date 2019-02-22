/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_product', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    seller_operator_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    supply: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    takhfif: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    transportar_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    trasnportar_current_location: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    ware_house_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    orderid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    seller_operatorid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'seller_operator',
        key: 'ID'
      }
    },
    ware_houseid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'seller_ware_house',
        key: 'ID'
      }
    },
    productid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'takhfif_product',
        key: 'ID'
      }
    },
    transportarid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'transportation',
        key: 'ID'
      }
    }
  }, {
    tableName: 'order_product'
  });
};
