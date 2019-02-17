/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    birth_date: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    family_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone_number: {
        unique: true,

        type: DataTypes.STRING(50),
      allowNull: false
    },
    point: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    registration_date_time: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    theme: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    username: {
        unique: true,

        type: DataTypes.STRING(50),
      allowNull: false
    },
    cityid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'cities',
        key: 'id'
      }
    }
  }, {
    tableName: 'customer'
  });
};
