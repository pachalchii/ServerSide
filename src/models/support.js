/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Support', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FamilyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Image: {
        type: DataTypes.STRING(200),
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true
    },
      AuthCode: {
          type: DataTypes.STRING,
          allowNull: true},
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'Support'
  });
};
