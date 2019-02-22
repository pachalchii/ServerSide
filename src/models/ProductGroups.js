/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ProductGroups', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ParentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ProductGroups',
        key: 'ID'
      }
    }
  }, {
    tableName: 'ProductGroups'
  });
};
