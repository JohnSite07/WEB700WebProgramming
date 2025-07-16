const Sequelize = require('sequelize');

// set up sequelize to point to our postgres database
const sequelize = new Sequelize('SenecaDB', 'neondb_owner', 'npg_kaHgF7Ghb5mA', {
  host: 'ep-rough-firefly-aeyw1niu-pooler.c-2.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

// Define a "Project" model

const Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
});

// Define a "Student" model

const Student = sequelize.define('Student', {
  fName: Sequelize.STRING,
  lName: Sequelize.TEXT,
  city: Sequelize.STRING
});

// synchronize the Database with our models and automatically add the
// table if it does not exist

sequelize.sync().then(() => {
  // create a new "Project" and add it to the database
  Student.create({
    fName: 'Jean Luc',
    lName: 'Mbuya',
    city: 'Toronto'
  })
    .then((Student) => {
      // you can now access the newly created Project via the variable project
      console.log('success!');
    })
    .catch((error) => {
      console.log('something went wrong!');
    });
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });