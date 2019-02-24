/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SellerProducts', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
        autoIncrement: true

    },
    SellerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Seller',
        key: 'ID'
      }
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'ID'
      }
    },
    PriceDateTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SupplyOfProduct: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UnitOfProduct: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UnitID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Unit',
        key: 'ID'
      }
    },
    Image: {
        type: DataTypes.STRING(200),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'SellerProducts'
  });
};
