import {mainTODOlist, singleTODO, projects, Project} from './index.js';
import {renderNewProjectItem, renderSingleNewProjectItem, renderTODOList, renderSingleTODO} from './render';
//import { formatDistance, subDays } from 'date-fns'

//console.log(formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true }));


function submitNewProject() {

    let newProjectForm = document.querySelector('.newProjectForm');
    let title = newProjectForm[0].value;
    let description = newProjectForm[1].value;
    projects.push(new Project(title, description));
    renderSingleNewProjectItem(projects.at(-1));
    
}

function makeNewTask() {

    let target = document.querySelector('.projectTitle');

    let newTaskForm = document.querySelector('.newTaskForm');
    let priority = newTaskForm[0].value;
    let title = newTaskForm[1].value;
    let dueDate = newTaskForm[2].value; // TODO use input date
    let details = newTaskForm[3].value;

    if (target != null) {

        let index = projects.findIndex(project => project.title == target.textContent);
        projects[index].TODOlist.push(new singleTODO(priority, false, title, Date(), details));
        renderSingleTODO(projects[index].TODOlist.at(-1));
        
    } else {

        mainTODOlist.push(new singleTODO(priority, false, title, Date(), details));
        renderSingleTODO(mainTODOlist.at(-1));

    }
}

function deleteProject(e) {

    let targetProject = projects.find( (project) => project.title == e.target.previousElementSibling.textContent );
    let index = projects.findIndex(project => project.title == targetProject.title);
    
    projects.splice([index], 1);
}

function deleteTask(e) {
    
    let target = document.querySelector('.projectTitle');

    if (target != null) {

        let indexProject = projects.findIndex(project => project.title == target.textContent);
        let indexTODO = projects[indexProject].TODOlist.findIndex(task => task == e);
        projects[indexProject].TODOlist.splice(indexTODO, 1);
    } else {

        let index = mainTODOlist.findIndex(mainTODOlist => mainTODOlist.title == e);
        mainTODOlist.splice(index, 1);
    }

}

function editTask(priority, title, dueDate, targetTitle, details) {
    
    let target = document.querySelector('.projectTitle');

    if (target != null) {

        let indexProject = projects.findIndex(project => project.title == target.textContent);
        let indexTODO = projects[indexProject].TODOlist.findIndex(task => task.title == targetTitle);

        projects[indexProject].TODOlist[indexTODO].priority = priority;
        projects[indexProject].TODOlist[indexTODO].title = title;
        projects[indexProject].TODOlist[indexTODO].dueDate = dueDate;
        projects[indexProject].TODOlist[indexTODO].details = details;
        
    } else {

        let index = mainTODOlist.findIndex(mainTODOlist => mainTODOlist.title == targetTitle);
        mainTODOlist[index].priority = priority;
        mainTODOlist[index].title = title;
        mainTODOlist[index].dueDate = dueDate;
        mainTODOlist[index].details = details;

    }
}

function getDetails(targetTitle) {
    
    let target = document.querySelector('.projectTitle');

    if (target != null) {

        let indexProject = projects.findIndex(project => project.title == target.textContent);
        let indexTODO = projects[indexProject].TODOlist.findIndex(task => task.title == targetTitle);

        return (projects[indexProject].TODOlist[indexTODO].details);
        
    } else {

        let index = mainTODOlist.findIndex(mainTODOlist => mainTODOlist.title == targetTitle);
        
        return (mainTODOlist[index].details);

    }
}

function changeDoneStatus(status, targetTitle) {
    
    let target = document.querySelector('.projectTitle');

    if (target != null) {

        let indexProject = projects.findIndex(project => project.title == target.textContent);
        let indexTODO = projects[indexProject].TODOlist.findIndex(task => task.title == targetTitle);

        projects[indexProject].TODOlist[indexTODO].checked = status;
        
    } else {

        let index = mainTODOlist.findIndex(mainTODOlist => mainTODOlist.title == targetTitle);
        
        mainTODOlist[index].checked = status;

    }
}

export  {submitNewProject, makeNewTask, deleteProject, deleteTask, editTask, getDetails, changeDoneStatus};