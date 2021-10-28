import {mainTODOlist, projects} from './index.js';

const clearMainDisplay = () => {

    const main = document.querySelector('main');
    const mainDisplay = document.createElement('div');
    mainDisplay.classList.add('mainDisplay');
    main.removeChild(document.querySelector('.mainDisplay'));
    main.appendChild(mainDisplay);

}

const renderProject = () => {

    clearMainDisplay();

    projects.forEach(e => {

        let projectItem = document.createElement('div');
        projectItem.classList.add('projectItem');

        let projectHeader = document.createElement('div');
        projectHeader.classList.add('projectHeader');

        let projectTitle = document.createElement('div');
        projectTitle.classList.add('title');

        let projectDescription = document.createElement('div');
        projectDescription.classList.add('description');

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

function render() {

    let projectItems = document.querySelector('.projectItems');

    projects.forEach(e => {
        let projectItem = document.createElement('div');
        projectItem.classList.add('projectItem');
        projectItem.textContent = e.title;
        projectItem.addEventListener('click', renderProject);
        projectItems.appendChild(projectItem);
    });

    renderMainList();
}

const renderMainList = () => {

    let mainList = document.querySelector('.todos');

    mainTODOlist.forEach(e => {

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