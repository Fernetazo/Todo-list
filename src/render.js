import { mainTODOlist, projects } from './index.js';
import { format, isThisWeek, parseISO, formatDistance, subDays } from 'date-fns';
import { submitNewProject, 
         makeNewTask, 
         editProjectTitle, 
         editProjectDescription, 
         deleteProject, 
         deleteTask, 
         editTask, 
         getDetails, 
         changeDoneStatus, 
         getIndex,
         checkDuplication } from './actions.js';

const firstRender = () => {

    let projectItems = document.querySelector('.projectItems');

    projects.forEach(e => {
        projectItems.appendChild(renderNewProjectItem(e));
    });
    
    prepareListeners();
    renderNonProjectTitle('H O M E');

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
    projectTitle.classList.add('projectTitleSidebar');
    projectTitle.textContent = e.title;
    projectTitle.addEventListener('click', renderProject);

    let projectItemRightSide = document.createElement('div');
    projectItemRightSide.classList.add('projectItemRightSide');

    let editProjectButton = document.createElement('span');
    editProjectButton.classList.add('editProjectTitleButton');
    editProjectButton.classList.add('material-icons');
    editProjectButton.textContent = 'edit';
    editProjectButton.addEventListener('click', editProjectTitleDOM);

    let deleteProjectButton = document.createElement('span');
    deleteProjectButton.classList.add('material-icons');
    deleteProjectButton.classList.add('deleteProjectButton');
    deleteProjectButton.textContent = 'delete';
    deleteProjectButton.addEventListener('click', deleteProjectDOM);

    projectItem.appendChild(projectTitle);
    projectItemRightSide.appendChild(editProjectButton);
    projectItemRightSide.appendChild(deleteProjectButton);
    projectItem.appendChild(projectItemRightSide);
    
    return projectItem;

}

const editProjectTitleDOM = (e) => {

    let target = e.target.parentNode.parentNode;
    let title = target.querySelector('.projectTitleSidebar');
    let editButton = target.querySelector('.editProjectTitleButton');
    let deleteButton = target.querySelector('.deleteProjectButton');
    let titleInput = document.createElement('input');
    let sendButton = document.createElement('span');
    let cancelButton = document.createElement('span');

    title.replaceWith(titleInput);
    editButton.replaceWith(sendButton);
    deleteButton.replaceWith(cancelButton);

    titleInput.value = title.textContent;

    cancelButton.textContent = "highlight_off";
    cancelButton.classList.add('material-icons');
    
    sendButton.textContent = "check_circle_outline";
    sendButton.classList.add('material-icons');

    cancelButton.addEventListener('click', () => {

        titleInput.replaceWith(title);
        sendButton.replaceWith(editButton);
        cancelButton.replaceWith(deleteButton);

    });

    sendButton.addEventListener('click', () => {
        
        if (!titleInput.value) {

            alert ('Something is missing');

        } else {

            if (title.textContent == titleInput.value) {

                editProjectTitle(titleInput.value, title.textContent);

                const mainTitle = document.querySelector('.projectTitle');
                if (mainTitle && (mainTitle.textContent == title.textContent)) mainTitle.textContent = titleInput.value;

                titleInput.replaceWith(title);
                sendButton.replaceWith(editButton);
                cancelButton.replaceWith(deleteButton);

                title.textContent = titleInput.value;

            } else {

                if (checkDuplication('projectTitle', titleInput.value)) {

                    alert('That title already exists!');

                } else {

                    editProjectTitle(titleInput.value, title.textContent);

                    const mainTitle = document.querySelector('.projectTitle');
                    if (mainTitle && (mainTitle.textContent == title.textContent)) mainTitle.textContent = titleInput.value;
    
                    titleInput.replaceWith(title);
                    sendButton.replaceWith(editButton);
                    cancelButton.replaceWith(deleteButton);
    
                    title.textContent = titleInput.value;

                }
            }
        }
    });
}

const editProjectDescriptionDOM = (e) => {
    
    let target = e.target.parentNode;
    let description = target.querySelector('.projectDescription');
    let editButton = target.querySelector('.editProjectDetailsButton');
    let descriptionInput = document.createElement('input');
    let sendButton = document.createElement('button');

    description.replaceWith(descriptionInput);
    editButton.replaceWith(sendButton);
    
    descriptionInput.value = description.textContent;
    sendButton.textContent = "OK";

    sendButton.addEventListener('click', () => {
        
        editProjectDescription(descriptionInput.value, description.textContent)
        
        descriptionInput.replaceWith(description);
        sendButton.replaceWith(editButton);

        description.textContent = descriptionInput.value;
    });
}

const deleteProjectDOM = (e) => {
    
    if (confirm('Are you sure do you want to delete this project?')) {
        
        const parent = e.target.parentNode.parentNode;
        const sidebarTitle = parent.querySelector('.projectTitleSidebar');
        const mainTitle = document.querySelector('.projectTitle');
    
        if ((sidebarTitle && mainTitle) && (sidebarTitle.textContent == mainTitle.textContent)) {
            
            clearMainDisplay();
    
        }
    
        parent.remove();
        deleteProject(sidebarTitle);
    }
}

const prepareListeners = () => {
    
    const home = document.querySelector('.home');
    home.addEventListener('click', renderHome);

    const today = document.querySelector('.today');
    today.addEventListener('click', renderToday);
    
    const week = document.querySelector('.week');
    week.addEventListener('click', renderWeek);

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

    submitButton.addEventListener('click', () => {

        (!titleInput.value) ? 
            alert ('Something is missing') 
            : checkDuplication('projectTitle', titleInput.value) ?  
                alert('That title already exists!') 
                : submitNewProject();
        
    });

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
    const priority = document.createElement('select');
    const title = document.createElement('input');
    const dueDate = document.createElement('input');
    const details = document.createElement('input');
    const submitButton = document.createElement('button');

    newTaskModal.classList.add('newTaskModal');
    form.classList.add('newTaskForm');
    form.onsubmit = () => {return false};
    title.placeholder = 'Title';
    title.setAttribute('required', '');
    dueDate.type = 'date';
    dueDate.setAttribute('required', '');
    details.placeholder = 'Details';
    submitButton.textContent = 'Submit new task';
    
    submitButton.addEventListener('click', () => {

        (!priority.value || !title.value || !dueDate.value) ? 
            alert ('Something is missing') 
            : checkDuplication('TODOtitle', title.value) ?  alert('That title already exists!') : makeNewTask();
    
    });

    let optionDefault = document.createElement('option');
    let optionLow = document.createElement('option');
    let optionMedium = document.createElement('option');
    let optionHigh = document.createElement('option');
    optionDefault.setAttribute('selected', '');
    optionDefault.setAttribute('disabled', '');
    optionDefault.setAttribute('hidden', '');
    optionDefault.value = '';
    optionDefault.textContent = '-- Select Priority --';  
    optionLow.value = 'Low';
    optionLow.textContent = 'Low';
    optionMedium.value = 'Medium';
    optionMedium.textContent = 'Medium';
    optionHigh.value = 'High';
    optionHigh.textContent = 'High';
    
    priority.append(optionDefault, optionHigh, optionMedium, optionLow);
    priority.placeholder = 'Priority';
    priority.setAttribute('required', '');

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
    renderNonProjectTitle('H O M E');
    renderTODOList(mainTODOlist);

}

const renderToday = () => {

    clearMainDisplay();
    renderNonProjectTitle('T O D A Y');

    const array = mainTODOlist.filter((e) => {
        return e.dueDate == format(new Date(), 'yyyy-MM-dd') && e.checked == false;
    })
    renderTODOList(array);
    document.querySelector('.newTaskButtonContainer').style.visibility = 'hidden';

}

const renderWeek = () => {

    clearMainDisplay();
    renderNonProjectTitle('W E E K');

    const array = mainTODOlist.filter((e) => {
            return isThisWeek(parseISO(e.dueDate), 0) && e.checked == false;
    })
    renderTODOList(array);
    document.querySelector('.newTaskButtonContainer').style.visibility = 'hidden';

}

const renderNonProjectTitle = (title) => {

    let mainDisplay = document.querySelector('.mainDisplay');
    let projectHeader = document.createElement('div');
    projectHeader.classList.add('projectHeader');
    projectHeader.textContent = title;
    mainDisplay.appendChild(projectHeader);

}

const renderProject = (e) => {

    clearMainDisplay();
    const targetProject = projects.find( (project) => project.title == e.target.textContent );

    let mainDisplay = document.querySelector('.mainDisplay');

    let projectItem = document.createElement('div');
    let projectHeader = document.createElement('div');
    let projectTitle = document.createElement('div');
    let projectDescription = document.createElement('div');
    let editProjectDetailsButton = document.createElement('button');

    projectItem.classList.add('projectItem');
    projectHeader.classList.add('projectHeader');
    projectTitle.classList.add('projectTitle');
    projectDescription.classList.add('projectDescription');
    editProjectDetailsButton.classList.add('editProjectDetailsButton');

    projectTitle.textContent = targetProject.title;
    projectDescription.textContent = targetProject.description;
    
    editProjectDetailsButton.textContent = 'edit';
    editProjectDetailsButton.addEventListener('click', editProjectDescriptionDOM);

    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectDescription);
    projectHeader.appendChild(editProjectDetailsButton);  
    projectItem.appendChild(projectHeader);

    mainDisplay.appendChild(projectItem);

    renderTODOList(targetProject.TODOlist);        
};

const renderTODOList = (target) => {

    let todos = document.createElement('div');
    let todosDone = document.createElement('div');
    todos.classList.add('todos');
    todosDone.classList.add('todosDone');
    
    target.forEach(e => {
        if (e.checked == false) {
            todos.appendChild(renderTODOItem(e));
        } else {
            todosDone.appendChild(renderTODOItem(e));
        }
    });

    document.querySelector('.mainDisplay').appendChild(todos);
    renderNewTaskButton();
    document.querySelector('.mainDisplay').appendChild(todosDone);
    
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
    let detailsButton = document.createElement('span');
    let editButton = document.createElement('span');
    let deleteButton = document.createElement('span');

    todoItem.classList.add('todoItem');
    leftSide.classList.add('todoLeftSide');
    rightSide.classList.add('todoRightSide');
    
    priority.classList.add('priority');
    priority.classList.add(e.priority);

    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('click', changeDoneStatusDOM);

    label.for = 'todoExample';
    label.textContent = e.title;
    label.classList.add('TODOTitle');

    dueDate.classList.add('dueDate');
    dueDate.textContent = e.dueDate;

    detailsButton.classList.add('detailsButton');
    detailsButton.classList.add('material-icons');
    detailsButton.textContent = 'description';
    detailsButton.addEventListener('click', showDetailsModal);

    editButton.classList.add('editButton');
    editButton.classList.add('material-icons');
    editButton.textContent = 'edit';
    editButton.addEventListener('click', editTaskDOM);

    deleteButton.classList.add('deleteButton');
    deleteButton.classList.add('material-icons');
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', deleteTaskDOM);

    if (e.checked) {
        checkbox.checked = true;
        label.style.color = 'gray';
        dueDate.style.color = 'gray';
        label.style.textDecoration = 'line-through';
        dueDate.style.textDecoration = 'line-through';
        priority.classList.add('done');
    }

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
    let newTaskButton = document.createElement('icon') ;
    let newTaskText = document.createElement('div');

    newTaskButtonContainer.classList.add('newTaskButtonContainer');
    newTaskButton.classList.add('newTaskButton');
    newTaskButton.classList.add('material-icons');
    newTaskText.classList.add('newTaskText');

    newTaskButton.textContent = 'add';
    newTaskText.textContent = 'Add new task';
    newTaskButtonContainer.addEventListener('click', showNewTaskModal);

    newTaskButtonContainer.appendChild(newTaskButton);
    newTaskButtonContainer.appendChild(newTaskText);

    document.querySelector('.mainDisplay').appendChild(newTaskButtonContainer);

}

const deleteTaskDOM = (e) => {
    
    if (confirm('Are you sure do you want delete this task?')) {

        let target = e.target.parentNode.parentNode;
        target.remove();
        target = target.querySelector('.TODOTitle').textContent;
        deleteTask(target);

    };
}

const editTaskDOM = (e) => {
    
    let target = e.target.parentNode.parentNode;

    let priority = target.querySelector('.priority');
    let checkbox = target.querySelector('.checkbox');
    let title = target.querySelector('.TODOTitle');
    let dueDate = target.querySelector('.dueDate');
    let detailsButton = target.querySelector('.detailsButton');
    let editButton = target.querySelector('.editButton');
    let deleteButton = target.querySelector('.deleteButton');

    let priorityInput = document.createElement('select');
    let optionLow = document.createElement('option');
    let optionMedium = document.createElement('option');
    let optionHigh = document.createElement('option');
    optionLow.value = 'Low';
    optionMedium.value = 'Medium';
    optionHigh.value = 'High';
    optionLow.textContent = 'Low';
    optionMedium.textContent = 'Medium';
    optionHigh.textContent = 'High';
    priorityInput.append(optionHigh, optionMedium, optionLow);
    priorityInput.value = priority.classList[1];

    let titleInput = document.createElement('input');
    let dueDateInput = document.createElement('input');
    dueDateInput.type = 'date';
    let detailsInput = document.createElement('input');
    let sendButton = document.createElement('span');
    sendButton.classList.add('material-icons');
    let cancelButton = document.createElement('span');
    cancelButton.classList.add('material-icons');

    priority.replaceWith(priorityInput);
    title.replaceWith(titleInput);
    dueDate.replaceWith(dueDateInput);
    detailsButton.replaceWith(detailsInput);
    editButton.replaceWith(sendButton);
    deleteButton.replaceWith(cancelButton);

    titleInput.value = title.textContent;
    dueDateInput.value = dueDate.textContent;
    detailsInput.value = getDetails(title.textContent);
    sendButton.textContent = "check_circle_outline";
    cancelButton.textContent = "highlight_off";
    checkbox.style.visibility = 'hidden';

    cancelButton.addEventListener('click', () => {
        cancelEditDOM(priority, title, dueDate, detailsButton, editButton, deleteButton, priorityInput, 
                     titleInput, dueDateInput, detailsInput, sendButton, cancelButton, checkbox)
    });

    sendButton.addEventListener('click', () => {
        
        if (!priorityInput.value || !titleInput.value || !dueDateInput.value) {

            alert ('Something is missing');

        } else {

            if (title.textContent == titleInput.value) {
                
                sendEditDOM(priority, title, dueDate, detailsButton, editButton, deleteButton, priorityInput, 
                            titleInput, dueDateInput, detailsInput, sendButton, cancelButton, checkbox);
            } else {

                checkDuplication('TODOtitle', titleInput.value) ?
                alert('That title already exists!') 
                : sendEditDOM(priority, title, dueDate, detailsButton, editButton, deleteButton, priorityInput, 
                             titleInput, dueDateInput, detailsInput, sendButton, cancelButton, checkbox);

            }
        }
    });
}

const cancelEditDOM = (priority, title, dueDate, detailsButton, editButton, deleteButton, priorityInput, 
                      titleInput, dueDateInput, detailsInput, sendButton, cancelButton, checkbox) => {
    
    priorityInput.replaceWith(priority);
    titleInput.replaceWith(title);
    dueDateInput.replaceWith(dueDate);
    detailsInput.replaceWith(detailsButton);
    sendButton.replaceWith(editButton);
    cancelButton.replaceWith(deleteButton);
    checkbox.style.visibility = 'visible';

}

const sendEditDOM = (priority, title, dueDate, detailsButton, editButton, deleteButton, priorityInput, 
                    titleInput, dueDateInput, detailsInput, sendButton, cancelButton, checkbox) => {

    editTask(priorityInput.value, titleInput.value, dueDateInput.value, title.textContent, detailsInput.value)

    priorityInput.replaceWith(priority);
    titleInput.replaceWith(title);
    dueDateInput.replaceWith(dueDate);
    detailsInput.replaceWith(detailsButton);
    sendButton.replaceWith(editButton);
    cancelButton.replaceWith(deleteButton);

    priority.classList.remove(priority.classList[1]);
    priority.classList.add(priorityInput.value);
    title.textContent = titleInput.value;
    dueDate.textContent = dueDateInput.value;
    
    checkbox.style.visibility = 'visible';
}

const showDetailsModal = (e) => {

    let detailsModal = document.createElement('div');
    let detailsContainer = document.createElement('div');
    let title = document.createElement('div');
    let dueDate = document.createElement('div');
    let priority = document.createElement('div');
    let details = document.createElement('div');

    detailsModal.classList.add('detailsModal');
    detailsContainer.classList.add('detailsContainer');

    let target = e.target.parentNode.parentNode;
    title.textContent = target.querySelector('.TODOTitle').textContent;
    dueDate.textContent = target.querySelector('.dueDate').textContent;
    priority.textContent = target.querySelector('.priority').textContent;
    details.textContent = getDetails(title.textContent);

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(dueDate);
    detailsContainer.appendChild(priority);
    detailsContainer.appendChild(details);

    detailsModal.appendChild(detailsContainer);
    document.querySelector('body').appendChild(detailsModal);

    window.onclick = function(event) {
        if (event.target == detailsModal) {
            detailsModal.style.opacity = "0";
            detailsModal.style.visibility = "hidden";
            
            setTimeout(() => {
                document.querySelector('body').removeChild(detailsModal);
            }, 200);
        }
    }
}

const changeDoneStatusDOM = (e) => {
    
    let status = e.target.checked;
    let target = e.target.parentNode.parentNode;

    let title = target.querySelector('.TODOTitle');
    let dueDate = target.querySelector('.dueDate');
    let priority = target.querySelector('.priority');

    let todos = document.querySelector('.todos');
    let todosDone = document.querySelector('.todosDone');

    let index = getIndex(title.textContent);
    
    if (status) {

        title.style.color = 'gray';
        dueDate.style.color = 'gray';
        title.style.textDecoration = 'line-through';
        dueDate.style.textDecoration = 'line-through';
        priority.classList.add('done');

        // Get (logically) the array index where the task will be put
        let finder = Array.from(todosDone.children).find(child => {

            return getIndex(child.querySelector('.TODOTitle').textContent) > index;

        });
        // Put task before found index or last one
        (finder) ? finder.before(target) : todosDone.appendChild(target);

    } else {

        title.style.color = 'black';
        dueDate.style.color = 'black';
        title.style.textDecoration = 'none';
        dueDate.style.textDecoration = 'none';
        priority.classList.remove('done');

        // Get (logically) the array index where the task will be put
        let finder = Array.from(todos.children).find(child => {

            return getIndex(child.querySelector('.TODOTitle').textContent) > index;

        });
        // Put task before found index or last one
        (finder) ? finder.before(target) : todos.appendChild(target);

    }

    changeDoneStatus(status, title.textContent);

}

export { firstRender, 
         renderNewProjectItem, 
         renderSingleNewProjectItem, 
         renderTODOList, 
         renderSingleTODO };