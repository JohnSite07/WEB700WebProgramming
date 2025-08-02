const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    'SenecaDB',
    'neondb_owner',
    'npg_kaHgF7Ghb5mA',
    {
        host: 'ep-rough-firefly-aeyw1niu-pooler.c-2.us-east-2.aws.neon.tech',
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // This is important for self-signed certificates
            }
        }
    }
);

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });


const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.DATE,
    }
});

User.create({
    username: 'John_Doe',
    birthday: new Date(1990, 5, 17)
});



sequelize.sync(User).then(() => {
    console.log('Tables have been created');
});