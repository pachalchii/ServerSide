/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'ID'
      }
    },
    OrderDateTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CustomerAddressID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Addresses',
        key: 'ID'
      }
    },
    DateTimeErsal: {
      type: DataTypes.STRING,
      allowNull: true
    },
    JameKol: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Takhfif: {
      type: DataTypes.STRING,
      allowNull: true
    },
    JameKolAfterTakhfif: {
      type: DataTypes.STRING,
      allowNull: true
    },
    NazarSanjiID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'OrderNazarSanji',
        key: 'ID'
      }
    },
    PardakhtID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'OrderPardakht',
        key: 'ID'
      }
    },
    OrderStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    HashCode: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Order'
  });
};
