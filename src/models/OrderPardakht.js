/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderPardakht', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DateTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CodePeygiri: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Mablagh: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'OrderPardakht'
  });
};
