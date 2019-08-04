/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Customer', {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        FamilyName: {
            type: DataTypes.STRING,
            allowNull: true
        },

        Username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        AuthCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        SocketID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CityID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Cities',
                key: 'ID'
            }
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Point: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        BirthDate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        RegistrationDateTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Theme: {
            type: DataTypes.STRING,
            allowNull: true
        },
        IsForgetPasswordVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        CompanyName: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'Customer',
        timestamps: false
    });
};
