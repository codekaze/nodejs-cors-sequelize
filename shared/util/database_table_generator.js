const { Sequelize } = require('sequelize');

module.exports = {
    generateTables: async function () {

        global["user"] = sequelize.define('user', {
            username: { type: Sequelize.STRING},
            email: { type: Sequelize.STRING },
            password: { type: Sequelize.STRING},
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        }, {
            reezeTableName: true
        });

        global["user_token"] = sequelize.define('user_token', {
            user_id: { type: Sequelize.INTEGER},
            access_token: { type: Sequelize.STRING },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE,
        }, {
            reezeTableName: true
        });
 
        await sequelize.sync({ force: true });

        await user.create({
            username: "admin",
            password: "admin",
            email: "admin@gmail.com"
        });
    },
};

