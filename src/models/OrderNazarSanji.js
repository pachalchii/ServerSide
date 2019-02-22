/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderNazarSanji', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PachalChi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Seller: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    SellerOperator: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Transportar: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Support: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'OrderNazarSanji'
  });
};
