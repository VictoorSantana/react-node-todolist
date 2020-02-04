const Sequelize = require('sequelize');
const db = require('../database/connection');


const credentials = db.define('tb_credentials', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER
    }
  }, {
    timestamps: false
});

module.exports = credentials;