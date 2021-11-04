import {mainTODOlist, singleTODO, projects, Project} from './index.js';
import {renderNewProjectItem, renderSingleNewProjectItem, renderTODOList, renderSingleTODO} from './render';

function submitNewProject() {

    let newProjectForm = document.querySelector('.newProjectForm');
    let title = newProjectForm[0].value;
    let description = newProjectForm[1].value;
    projects.push(new Project(title, description));
    renderSingleNewProjectItem(projects.at(-1));
    
}

function makeNewTask() {

    let todos = document.querySelector('.todos');
    let target = document.querySelector('.projectTitle');

    if (target != null) {

        let index = projects.findIndex(project => project.title == target.textContent);
        projects[index].TODOlist.push(new singleTODO('High', true,'New task example', Date(),'Details details and details'));
        renderSingleTODO(projects[index].TODOlist.at(-1));
        
    } else {

        mainTODOlist.push(new singleTODO('High', true,'New task example', Date(),'Details details and details'));
        renderSingleTODO(mainTODOlist.at(-1));

    }
}

function deleteProject(e) {

    let targetProject = projects.find( (project) => project.title == e.target.previousElementSibling.textContent );
    let index = projects.findIndex(project => project.title == targetProject.title);
    
    projects.splice([index], 1);
}

export  {submitNewProject, makeNewTask, deleteProject};