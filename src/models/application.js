/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('application', {
        ID: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,      autoIncrement: true

        },
        ClientVersion: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        UpdateLink: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Slider1: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Slider2: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Slider3: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Slider4: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        Slider5: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        UpdateMessage: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'application'
    });
};
