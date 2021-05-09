const { Sequelize } = require('sequelize');
var databaseTableGenerator = require("./database_table_generator");

global["sequelize"] = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// // Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });


module.exports = {
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

