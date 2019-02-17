/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date_time_send: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    message: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    seen_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'chat'
  });
};
