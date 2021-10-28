import {mainTODOlist, projects} from './index.js';

const clearMainDisplay = () => {

    const main = document.querySelector('main');
    const mainDisplay = document.createElement('div');
    mainDisplay.classList.add('mainDisplay');
    main.removeChild(document.querySelector('.mainDisplay'));
    main.appendChild(mainDisplay);

}

const renderProject = (e) => {

    clearMainDisplay();
    
    const targetProject = projects.find( (project) => project.title == e.target.textContent );

    let mainDisplay = document.querySelector('.mainDisplay');

    let projectItem = document.createElement('div');
    let projectHeader = document.createElement('div');
    let projectTitle = document.createElement('div');
    let projectDescription = document.createElement('div');
    let todos = document.createElement('div');

    projectItem.classList.add('projectItem');
    projectHeader.classList.add('projectHeader');
    projectTitle.classList.add('projectTitle');
    projectDescription.classList.add('projectDescription');
    todos.classList.add('todos');

    projectTitle.textContent = targetProject.title;
    projectDescription.textContent = targetProject.description;

    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectDescription);
    projectItem.appendChild(projectHeader);
    projectItem.appendChild(todos);

    mainDisplay.appendChild(projectItem);

    renderTODOList(targetProject.TODOlist);
        
};

function render() {

    let projectItems = document.querySelector('.projectItems');

    projects.forEach(e => {
        let projectItem = document.createElement('div');
        projectItem.classList.add('projectItem');
        projectItem.textContent = e.title;
        projectItem.addEventListener('click', renderProject);
        projectItems.appendChild(projectItem);
    });

    renderTODOList(mainTODOlist);
}

const renderTODOList = (target) => {


    let mainList = document.querySelector('.todos');
    
    target.forEach(e => {

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

        editButton.classList.add('editButton');
        editButton.textContent = 'Edit';

        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = 'Delete';

        leftSide.appendChild(priority);
        leftSide.appendChild(checkbox);
        leftSide.appendChild(label);
        rightSide.appendChild(dueDate);
        rightSide.appendChild(detailsButton);
        rightSide.appendChild(editButton);
        rightSide.appendChild(deleteButton);
        todoItem.appendChild(leftSide);
        todoItem.appendChild(rightSide);
        mainList.appendChild(todoItem);
    });
}

export default (render);