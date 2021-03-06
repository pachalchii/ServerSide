/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
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
        IsForgetPasswordVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
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
        SocketID: {
            type: DataTypes.STRING,
            allowNull: true
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
            type: DataTypes.STRING,
            allowNull: false
        },
        PartTime2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        EstablishedDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RegistrationDateTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        AuthCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Point: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Policy: {
            default:false,
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        PhoneNumberID: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Seller',
        timestamps: false
    });
};
