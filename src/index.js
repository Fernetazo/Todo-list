import { firstRender } from './render';
import { format } from 'date-fns';
import './style.css';

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.TODOlist = [];
    }
};

class singleTODO {
    constructor(priority, checked, title, dueDate, details) {
        this.priority = priority;
        this.checked = checked;
        this.title = title;
        this.dueDate = dueDate;
        this.details = details;
    }
};

let mainTODOlist = [];
let projects = [];

mainTODOlist = JSON.parse(window.localStorage.getItem('mainTODOlist'));
projects = JSON.parse(window.localStorage.getItem('projects'));

let date = format(new Date(), 'yyyy-MM-dd');

if (!mainTODOlist) {

    mainTODOlist = [];

    mainTODOlist.push(new singleTODO('High', false,'High priority task example', date,'Remember to be happy! :)'));
    mainTODOlist.push(new singleTODO('Medium', false,'Medium priority task example', date));
    mainTODOlist.push(new singleTODO('Low', false,'Low priority task example', date,'Details example'));
    mainTODOlist.push(new singleTODO('Low', true,'Done task example 1', date,'Details example'));
    mainTODOlist.push(new singleTODO('Medium', true,'Done task example 2', date,'Details example'));
    mainTODOlist.push(new singleTODO('High', true,'To do and done tasks stay sorted!', date,'Details example'));

}

if (!projects) {

    projects = [];

    projects.push(new Project('Project example', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));
    projects[0].TODOlist.push(new singleTODO('Medium', false,'Buy something', date,'Should buy on Mercado Libre'));
    projects[0].TODOlist.push(new singleTODO('High', false,'Check something', date,'Check on Google Flights'));
    projects[0].TODOlist.push(new singleTODO('Low', true,'Done thing 1', date,'Yup!'));
    projects[0].TODOlist.push(new singleTODO('Low', true,'Done thing 2', date,'Wacka!'));

    projects.push(new Project('Buy new car', 'The red one will be mine!'));
    projects[1].TODOlist.push(new singleTODO('High', true,'Check model T', date,'I really want a Tesla'));
    projects[1].TODOlist.push(new singleTODO('Low', false,'Buy the car', date,'Oh yeah!'));

}

firstRender();

export  {mainTODOlist, projects, Project, singleTODO};