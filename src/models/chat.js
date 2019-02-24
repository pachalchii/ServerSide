/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Chat', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    FromID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ToID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DateTimeSend: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Chat'
  });
};
