/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
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
        AuthCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        SocketID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        RoleID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Roles',
                key: 'ID'
            }
        }
        ,
        IsForgetPasswordVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {
        tableName: 'PachalChiAdmins&Supports',
        timestamps: false
    });
};
