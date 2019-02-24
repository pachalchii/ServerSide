/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PachalChiAdmins&Supports', {
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
      type: DataTypes.STRING,
      allowNull: false
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    RoleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PachalChiRoles',
        key: 'ID'
      }
    }
  }, {
    tableName: 'PachalChiAdmins&Supports'
  });
};
