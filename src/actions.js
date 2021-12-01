/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */

import {
  mainTODOlist, SingleTODO, projects, Project,
} from './index';
import { renderSingleNewProjectItem, renderSingleTODO } from './render';

function submitNewProject() {
  const newProjectForm = document.querySelector('.newProjectForm');
  const title = newProjectForm[0].value;
  const description = newProjectForm[1].value;
  projects.push(new Project(title, description));
  renderSingleNewProjectItem(projects.at(-1));

  save('projects');
}

function editProjectTitle(title, targetTitle) {
  const indexProject = projects.findIndex((project) => project.title === targetTitle);

  projects[indexProject].title = title;

  save('projects');
}

function editProjectDescription(description, targetDescription) {
  const indexProject = projects.findIndex((project) => project.description === targetDescription);

  projects[indexProject].description = description;

  save('projects');
}

function deleteProject(sidebarTitle) {
  const targetProject = projects.find((project) => project.title === sidebarTitle.textContent);
  const index = projects.findIndex((project) => project.title === targetProject.title);

  projects.splice([index], 1);

  save('projects');
}

function makeNewTask() {
  const target = document.querySelector('.projectTitle');

  const newTaskForm = document.querySelector('.newTaskForm');
  const priority = newTaskForm[0].value;
  const title = newTaskForm[1].value;
  const dueDate = newTaskForm[2].value;
  const details = newTaskForm[3].value;

  if (target) {
    const index = projects.findIndex((project) => project.title === target.textContent);
    projects[index].TODOlist.push(new SingleTODO(priority, false, title, dueDate, details));
    renderSingleTODO(projects[index].TODOlist.at(-1));
  } else {
    mainTODOlist.push(new SingleTODO(priority, false, title, dueDate, details));
    renderSingleTODO(mainTODOlist.at(-1));
  }

  save(target);
}

function deleteTask(e) {
  const target = document.querySelector('.projectTitle');

  if (target) {
    const indexProject = projects.findIndex((project) => project.title === target.textContent);
    const indexTODO = projects[indexProject].TODOlist.findIndex((task) => task === e);
    projects[indexProject].TODOlist.splice(indexTODO, 1);
  } else {
    const index = mainTODOlist.findIndex((mainTODOlist) => mainTODOlist.title === e);
    mainTODOlist.splice(index, 1);
  }

  save(target);
}

function editTask(priority, title, dueDate, targetTitle, details) {
  const target = document.querySelector('.projectTitle');

  if (target) {
    const indexProject = projects.findIndex((project) => project.title === target.textContent);
    const indexTODO = projects[indexProject].TODOlist.findIndex((task) => task.title === targetTitle);

    projects[indexProject].TODOlist[indexTODO].priority = priority;
    projects[indexProject].TODOlist[indexTODO].title = title;
    projects[indexProject].TODOlist[indexTODO].dueDate = dueDate;
    projects[indexProject].TODOlist[indexTODO].details = details;
  } else {
    const index = mainTODOlist.findIndex((mainTODOlist) => mainTODOlist.title === targetTitle);
    mainTODOlist[index].priority = priority;
    mainTODOlist[index].title = title;
    mainTODOlist[index].dueDate = dueDate;
    mainTODOlist[index].details = details;
  }

  save(target);
}

function getDetails(targetTitle) {
  const target = document.querySelector('.projectTitle');

  if (target) {
    const indexProject = projects.findIndex((project) => project.title === target.textContent);
    const indexTODO = projects[indexProject].TODOlist.findIndex((task) => task.title === targetTitle);

    return (projects[indexProject].TODOlist[indexTODO].details);
  }

  const index = mainTODOlist.findIndex((mainTODOlist) => mainTODOlist.title === targetTitle);

  return (mainTODOlist[index].details);
}

function changeDoneStatus(status, targetTitle) {
  const target = document.querySelector('.projectTitle');

  if (target) {
    const indexProject = projects.findIndex((project) => project.title === target.textContent);
    const indexTODO = projects[indexProject].TODOlist.findIndex((task) => task.title === targetTitle);

    projects[indexProject].TODOlist[indexTODO].checked = status;
  } else {
    const index = mainTODOlist.findIndex((mainTODOlist) => mainTODOlist.title === targetTitle);

    mainTODOlist[index].checked = status;
  }

  save(target);
}

function getIndex(targetTitle) {
  const target = document.querySelector('.projectTitle');

  if (target) {
    const indexProject = projects.findIndex((project) => project.title === target.textContent);
    const indexTODO = projects[indexProject].TODOlist.findIndex((task) => task.title === targetTitle);

    return indexTODO;
  }

  const index = mainTODOlist.findIndex((mainTODOlist) => mainTODOlist.title === targetTitle);

  return index;
}

function checkDuplication(type, input) {
  if (type === 'TODOtitle') {
    const projectTitle = document.querySelector('.projectTitle');

    if (projectTitle) {
      const indexProject = projects.findIndex((project) => project.title === projectTitle.textContent);
      return projects[indexProject].TODOlist.some((task) => task.title === input);
    }

    return mainTODOlist.some((task) => task.title === input);
  }

  return projects.some((project) => project.title === input);
}

function save(type) {
  if (type == null) {
    window.localStorage.setItem('mainTODOlist', JSON.stringify(mainTODOlist));
  } else {
    window.localStorage.setItem('projects', JSON.stringify(projects));
  }
}

export {
  submitNewProject,
  makeNewTask,
  editProjectTitle,
  editProjectDescription,
  deleteProject,
  deleteTask,
  editTask,
  getDetails,
  changeDoneStatus,
  getIndex,
  checkDuplication,
};
