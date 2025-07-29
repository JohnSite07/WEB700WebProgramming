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

const addNewProject = async(title, description) => {
    //Insert a new project
    const project = await ProjectModel.create({
        title,
        description
    });
    console.log('Project Inserted successfully');
    return project;
}

const deleteProject = async (title) => {
    // Delete a project
    const project = await ProjectModel.destroy({
        'where': { 'title': title }
    });
    console.log('Project deleted successfully');
    return project;
}

const updateProject = async (title, description) => {
    // Update a project
    const project = await ProjectModel.update({
        'description': description
    }, {
        'where': { 'title': title }
    });
    console.log('Project updated successfully');
    return project;
}
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });