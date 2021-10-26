const firstLoad = () => {
    
    class TODOlist {
        constructor() {
            this.todos = [];
        }
    };

    class Projects {
        constructor() {
            this.projects = [];
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

    const mainTODOlist = new TODOlist();
    const projects = new Projects();
    
    let date = Date();

    mainTODOlist.todos.push(new singleTODO('High', true,'Do the dishes', date,'Remember to use the sponge!'));
    mainTODOlist.todos.push(new singleTODO('Medium', false,'Wash the car', date));
    mainTODOlist.todos.push(new singleTODO('Low', true,'Pet the cat', date,'Miau'));

    projects.projects.push(new TODOlist());

    console.log(mainTODOlist);
    console.log(projects);

}

export default firstLoad;