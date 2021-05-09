const { Sequelize } = require('sequelize');
var databaseTableGenerator = require("./database_table_generator");

global["db"] = {
    connect: async function () {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await this.generateTables();
            console.log('Tables has been generated');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    generateTables: () => databaseTableGenerator.generateTables(),
};

