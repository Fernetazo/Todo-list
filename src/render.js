import {mainTODOlist, projects, Project} from './index.js';
import {submitNewProject, makeNewTask, deleteProject, deleteTask} from './actions.js';

const firstRender = () => {

    let projectItems = document.querySelector('.projectItems');

    projects.forEach(e => {
        projectItems.appendChild(renderNewProjectItem(e));
    });
    
    prepareListeners();
    renderTODOList(mainTODOlist);

}

const renderSingleNewProjectItem = (e) => {

    let projectItems = document.querySelector('.projectItems');
    projectItems.appendChild(renderNewProjectItem(e));
}

const renderNewProjectItem = (e) => {

    let projectItem = document.createElement('div');
    projectItem.classList.add('projectItem');

    let projectTitle = document.createElement('div');
    projectTitle.textContent = e.title;
    projectTitle.addEventListener('click', renderProject);

    let deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add('deleteProjectButton');
    deleteProjectButton.textContent = 'del';
    deleteProjectButton.addEventListener('click', deleteProject);
    deleteProjectButton.addEventListener('click', deleteProjectDOM);

    projectItem.appendChild(projectTitle);
    projectItem.appendChild(deleteProjectButton);
    
    return projectItem;

}

const deleteProjectDOM = (e) => {
    
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

const prepareListeners = () => {
    
    const home = document.querySelector('.home');
    home.addEventListener('click', renderHome);

    const newProjectButton = document.querySelector('.newProjectButton');
    newProjectButton.addEventListener('click', showNewProjectModal);
}

const showNewProjectModal = () => {
    
    const newProjectModal = document.createElement('div');
    const form = document.createElement('form');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');
    const submitButton = document.createElement('button');

    newProjectModal.classList.add('newProjectModal');
    form.classList.add('newProjectForm');
    form.onsubmit = () => {return false};
    titleLabel.textContent = 'Title:';
    descriptionLabel.textContent = 'Description:';
    submitButton.textContent = 'Submit new project';
    submitButton.addEventListener('click', submitNewProject);

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(submitButton);
    newProjectModal.appendChild(form);
    document.querySelector('body').appendChild(newProjectModal);

    window.onclick = function(event) {
        if (event.target == newProjectModal) {
            newProjectModal.style.opacity = "0";
            newProjectModal.style.visibility = "hidden";
            
            setTimeout(() => {
                document.querySelector('body').removeChild(newProjectModal);
            }, 200);
        }
    }
}

const showNewTaskModal = () => {
    
    const newTaskModal = document.createElement('div');
    const form = document.createElement('form');
    const priority = document.createElement('input');
    const title = document.createElement('input');
    const dueDate = document.createElement('input');
    const details = document.createElement('input');
    const submitButton = document.createElement('button');

    newTaskModal.classList.add('newTaskModal');
    form.classList.add('newTaskForm');
    form.onsubmit = () => {return false};
    priority.placeholder = 'Priority';
    title.placeholder = 'Title';
    dueDate.placeholder = 'Date';
    details.placeholder = 'Details';
    submitButton.textContent = 'Submit new task';
    submitButton.addEventListener('click', makeNewTask);

    form.appendChild(priority);
    form.appendChild(title);
    form.appendChild(dueDate);
    form.appendChild(details);
    form.appendChild(submitButton);
    newTaskModal.appendChild(form);
    document.querySelector('body').appendChild(newTaskModal);

    window.onclick = function(event) {
        if (event.target == newTaskModal) {
            newTaskModal.style.opacity = "0";
            newTaskModal.style.visibility = "hidden";
            
            setTimeout(() => {
                document.querySelector('body').removeChild(newTaskModal);
            }, 200);
        }
    }
}

const clearMainDisplay = () => {

    const main = document.querySelector('main');
    const mainDisplay = document.createElement('div');
    mainDisplay.classList.add('mainDisplay');
    main.removeChild(document.querySelector('.mainDisplay'));
    main.appendChild(mainDisplay);

}

const renderHome = () => {

    clearMainDisplay();
    renderTODOList(mainTODOlist);
}

const renderProject = (e) => {

    clearMainDisplay();
    const targetProject = projects.find( (project) => project.title == e.target.textContent );

    let mainDisplay = document.querySelector('.mainDisplay');

    let projectItem = document.createElement('div');
    let projectHeader = document.createElement('div');
    let projectTitle = document.createElement('div');
    let projectDescription = document.createElement('div');

    projectItem.classList.add('projectItem');
    projectHeader.classList.add('projectHeader');
    projectTitle.classList.add('projectTitle');
    projectDescription.classList.add('projectDescription');

    projectTitle.textContent = targetProject.title;
    projectDescription.textContent = targetProject.description;

    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectDescription);
    projectItem.appendChild(projectHeader);

    mainDisplay.appendChild(projectItem);

    renderTODOList(targetProject.TODOlist);
        
};

const renderTODOList = (target) => {

    let todos = document.createElement('div');
    todos.classList.add('todos');
    
    target.forEach(e => {
        todos.appendChild(renderTODOItem(e));
    });

    document.querySelector('.mainDisplay').appendChild(todos);
    renderNewTaskButton();
    
}

const renderSingleTODO = (e) => {

    let todos = document.querySelector('.todos');
    todos.appendChild(renderTODOItem(e));

}

const renderTODOItem = (e) => {

    let todoItem = document.createElement('div');
    let leftSide = document.createElement('div');
    let rightSide = document.createElement('div');
    let priority = document.createElement('div');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let dueDate = document.createElement('div');
    let detailsButton = document.createElement('button');
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    todoItem.classList.add('todoItem');
    leftSide.classList.add('todoLeftSide');
    rightSide.classList.add('todoRightSide');
    
    priority.classList.add('priority');
    priority.classList.add(e.priority);
    priority.textContent = e.priority; //Delete this when style is added

    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.textContent = e.checkbox;

    label.for = 'todoExample';
    label.textContent = e.title;

    dueDate.classList.add('dueDate');
    dueDate.textContent = e.dueDate;

    detailsButton.classList.add('detailsButton');
    detailsButton.textContent = 'Details';
    detailsButton.addEventListener('click', showTaskDetails);

    editButton.classList.add('editButton');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editTaskDOM);

    deleteButton.classList.add('deleteButton');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTaskDOM);

    leftSide.appendChild(priority);
    leftSide.appendChild(checkbox);
    leftSide.appendChild(label);
    rightSide.appendChild(dueDate);
    rightSide.appendChild(detailsButton);
    rightSide.appendChild(editButton);
    rightSide.appendChild(deleteButton);
    todoItem.appendChild(leftSide);
    todoItem.appendChild(rightSide);

    return todoItem;
}

const renderNewTaskButton = () => {

    let newTaskButtonContainer = document.createElement('div');
    let newTaskButton = document.createElement('button') ;
    let newTaskText = document.createElement('div');

    newTaskButtonContainer.classList.add('newTaskButtonContainer');
    newTaskButton.classList.add('newTaskButton');
    newTaskText.classList.add('newTaskText');

    newTaskButton.textContent = '+';
    newTaskText.textContent = 'Add new task';
    newTaskButtonContainer.addEventListener('click', showNewTaskModal);

    newTaskButtonContainer.appendChild(newTaskButton);
    newTaskButtonContainer.appendChild(newTaskText);

    document.querySelector('.mainDisplay').appendChild(newTaskButtonContainer);

}

const deleteTaskDOM = (e) => {
    
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
    deleteTaskDOM();

}

const editTaskDOM = () => {
    // TODO
}

const showTaskDetails = () => {
    // TODO
}

export {firstRender, renderNewProjectItem, renderSingleNewProjectItem, renderTODOList, renderSingleTODO};