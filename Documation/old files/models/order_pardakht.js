/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_pardakht', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code_peygiri: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    date_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    mablagh: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'order_pardakht'
  });
};
