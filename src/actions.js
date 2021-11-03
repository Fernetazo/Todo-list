import {mainTODOlist, projects, Project} from './index.js';
import {renderNewProjectItem} from './render';

function submitNewProject() {

    let newProjectForm = document.querySelector('.newProjectForm');
    let title = newProjectForm[0].value;
    let description = newProjectForm[1].value;
    projects.push(new Project(title, description));
    renderNewProjectItem();
    
}

function makeNewTask() {

}

function deleteProject(e) {

    let targetProject = projects.find( (project) => project.title == e.target.previousElementSibling.textContent );
    let index = projects.findIndex(project => project.title == targetProject.title);
    
    projects.splice([index], 1);
}

export  {submitNewProject, makeNewTask, deleteProject};