import {mainTODOlist, projects, Project} from './index.js';

function submitNewProject() {
    
    let newProjectForm = document.querySelector('.newProjectForm');
    let title = newProjectForm[0].value;
    let description = newProjectForm[1].value;
    console.log(title, description);
    projects.push(new Project(title, description));

    console.log(projects);
}

export  {submitNewProject};