import firstLoad from './firstLoad';
import firsRender from './render';
import './style.css';

let mainTODOlist = [];
let projects = [];

firstLoad();

firsRender();

export  {mainTODOlist, projects};