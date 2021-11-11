import { firstLoad } from './firstLoad';
import { firstRender } from './render';
import './style.css';

let mainTODOlist = [];
let projects = [];

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

firstLoad();

firstRender();

export  {mainTODOlist, projects, Project, singleTODO};