const { Sequelize } = require('sequelize');

module.exports = {
    generateTables: async function () {

        global["user"] = sequelize.define('user', {
            name: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        }, {
            reezeTableName: true
        });

        await sequelize.sync({ force: true });

        //Dummy Data
        await user.create({
            name: "Naruto",
            email: "Uzumaki@gmail.com",
        });

    },
};

