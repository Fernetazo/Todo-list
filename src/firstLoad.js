import {mainTODOlist, projects, Project, singleTODO} from './index.js';

const firstLoad = () => {
    
    let date = Date();

    mainTODOlist.push(new singleTODO('High', true,'Do the dishes', date,'Remember to use the sponge!'));
    mainTODOlist.push(new singleTODO('Medium', false,'Wash the car', date));
    mainTODOlist.push(new singleTODO('Low', true,'Pet the cat', date,'Miau'));

    projects.push(new Project('Vacation', 'Going to Rome!'));
    projects.push(new Project('Buy new car', 'I like the white one'));
    
    projects[0].TODOlist.push(new singleTODO('Medium', true,'Buy tickets', date,'Should buy on despegar.com'));
    projects[0].TODOlist.push(new singleTODO('High', true,'Check prices]', date,'Check on google flights'));

    projects[1].TODOlist.push(new singleTODO('High', true,'Check model T', date,'I really want a Tesla'));
    projects[1].TODOlist.push(new singleTODO('Low', true,'Buy the goddam car', date,'Oh yeah!'));
};

export {firstLoad};