/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Seller', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    TypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SellerType',
        key: 'ID'
      }
    },
    SellerParentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Seller',
        key: 'ID'
      }
    },
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    OwnerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    OwnerFamilyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LogoImage: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    EstablishedDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
      AuthCode: {
          type: DataTypes.STRING,
          allowNull: true},
    RegistrationDateTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Point: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PhoneNumberID: {
      type: DataTypes.INTEGER,
      allowNull: true,
          unique: true,
      references: {
        model: 'SellerPhoneNumber',
        key: 'ID'
      }
    },
    CompanyAddressCityID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Cities',
        key: 'ID'
      }
    },
    CompleteAddressDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    GoogleMapAddressLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    OwnerPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Seller'
  });
};
