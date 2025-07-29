const Sequelize = require('sequelize');
// const ProjectDao = require('./projectDao')



const Project = sequelize.define('Project', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
});


// synchronize the Database with our models and automatically add the
// table if it does not exist
const addProject = async (title, description) => {
    try {
        const project = await Project.create({
        title,
        description})
        return { status: true, data: project}
    } catch (error) {
        return { status: false, error}
    }   
}

const deleteProject = async (title) => {
    // Delete a project
    const project = await Project.destroy({
        where: { 'title': title }
    });
    console.log('Project deleted successfully');
    return project;
}

const updateProject = async (title, description) => {
    // Update a project
    const project = await Project.update({
        'description': description
    }, {
        where: { 'title': title }
    });
    console.log('Project updated successfully');
    return project;
}

const getProjects = async () => {
    // Query the projects
    const projects = await Project.findAll();
    //console.log('All projects:', JSON.stringify(projects, null, 4));
    return projects;
}

const getProjectByTitle = async (title) => {
    const projects = await Project.findAll({
          attributes: ['title', 'description'],
          where: { 'title': title }})
    //console.log('Project 2:', JSON.stringify(project, null, 4));
    return projects
}

async function dbOperations() {
  try {
      await sequelize.sync()
     // create a new "Project" and add it to the database
     // const newProject = await addProject('New Project', "Project description")
     // console.log(newProject)
     //const deletedProject = await deleteProject('Project1')
     //console.log(deletedProject)
     //const updatedProject = await updateProject('New Project', 'Updated Project Description')
     //console.log(updatedProject)
    //const allProjects = await getProjects()
    //console.log(JSON.stringify(allProjects, null, 4))

    const projects = await getProjectByTitle('Project2')
    console.log(JSON.stringify(projects, null, 4))


    } catch (error) {
    console.log(error)
  }
  
}

dbOperations()

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');

//     //Create Model

//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });