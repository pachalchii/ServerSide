/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderProduct', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'ID'
      }
    },
    Takhfif: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TakhfifProduct',
        key: 'ID'
      }
    },
    Supply: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CustomerStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    SellerOperatorID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'SellerOperator',
        key: 'ID'
      }
    },
    SellerOperatorStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    WareHouseID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'SellerWareHouse',
        key: 'ID'
      }
    },
    WareHouseStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    TransportarID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Transportation',
        key: 'ID'
      }
    },
    TransportarStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    TrasnportarCurrentLocation: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'OrderProduct'
  });
};
