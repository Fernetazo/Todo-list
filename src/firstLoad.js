import { mainTODOlist, projects, Project, singleTODO } from './index.js';
import { format, formatDistance, subDays } from 'date-fns'

// TO DO: 
// Add a cancel button when editing project title sidebar
// Add restrictions between user's action (dont let user add new task when editing)
// Check for already input task and project
// Add support local saving
// Placeholder in grey when editing or adding new task
// Find visual bug when adding new projects, the divs goes up each time
// UI
// Add date-fns to webpack config (its working, maybe? check after final push in github live preview)

const firstLoad = () => {
    
    let date = format(new Date(), 'yyyy-MM-dd');

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