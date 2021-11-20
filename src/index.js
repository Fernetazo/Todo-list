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

if (mainTODOlist) {

    console.log('hay mainTODOlist en localStorage');

} else {
    
    mainTODOlist = [];

    mainTODOlist.push(new singleTODO('High', true,'Do the dishes', date,'Remember to use the sponge!'));
    mainTODOlist.push(new singleTODO('Medium', false,'Wash the car', date));
    mainTODOlist.push(new singleTODO('Low', true,'Pet the cat', date,'Miau'));

}

if (projects) {

    console.log('hay projects en localStorage');

} else {
    
    projects = [];

    projects.push(new Project('Vacation', 'Going to Rome!'));
    projects.push(new Project('Buy new car', 'I like the white one'));

    projects[0].TODOlist.push(new singleTODO('Medium', true,'Buy tickets', date,'Should buy on despegar.com'));
    projects[0].TODOlist.push(new singleTODO('High', true,'Check prices]', date,'Check on google flights'));

    projects[1].TODOlist.push(new singleTODO('High', true,'Check model T', date,'I really want a Tesla'));
    projects[1].TODOlist.push(new singleTODO('Low', true,'Buy the goddam car', date,'Oh yeah!'));

}

firstRender();

export  {mainTODOlist, projects, Project, singleTODO};