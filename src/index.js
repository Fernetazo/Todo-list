import firstLoad from './firstLoad';
import render from './render';
import './style.css';

let mainTODOlist = [];
let projects = [];

firstLoad();

render();

export  {mainTODOlist, projects};