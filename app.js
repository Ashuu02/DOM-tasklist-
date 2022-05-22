
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addTask);

    document.addEventListener('DOMContentLoaded', getTasks);

    taskList.addEventListener('click',removeTask);

    clearBtn.addEventListener('click',clearTask);

    filter.addEventListener('keyup', filterTasks);
};


//Load tasks from localStorage
function getTasks(){
    let tasks ;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML  = '<i class="fa fa-remove"></i>';

        //apend link to li
        li.appendChild(link);

        taskList.appendChild(li);

    });
}


//Add a new task
function addTask(e){
    
    if(taskInput===''){
        alert('Add a task');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML  = '<i class="fa fa-remove"></i>';

    //apend link to li

    li.appendChild(link);

    taskList.appendChild(li);

    addtoLocalStorage(taskInput.value);
    
    taskInput.value = '';
    e.preventDefault();
}


//add to local storage
function addtoLocalStorage(task){
    let tasks ;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks))
}


//remove the task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure"))
            e.target.parentElement.parentElement.remove();
    }

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}


//clear tasks using the clear tasks button 
function clearTask(){
    while(taskList.firstChild){
        taskList.firstChild.remove();
    }

    // use above or below method(above is faster)
    // taskList.innerHTML ='';

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// remove the task from Local storage as well
function removeTaskFromLocalStorage(taskItem){
    let tasks ;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
};


function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }

    });
}