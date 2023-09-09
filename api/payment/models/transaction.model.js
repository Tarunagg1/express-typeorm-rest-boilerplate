const { transsactionStatusObj } = require('../../../common/constant');

module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('transaction',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            txnId: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false
            },
            amount: {
                type: DataTypes.INTEGER
            },
            coinTransfer: {
                type: DataTypes.INTEGER
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: transsactionStatusObj.PENDING
            },
            size: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            bucket: {
                type: DataTypes.STRING(24)
            },
            folder_id: {
                type: DataTypes.INTEGER
            },
            encrypt_version: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: true,
            underscored: true,
            indexes: [{ name: 'name', fields: ['name'] }]
        });

    file.associate = (models) => {
        file.belongsTo(models.folder);
    };

    return file;
};
