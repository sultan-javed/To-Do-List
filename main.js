// user can create their own to-do list
// user delete tasks
// search tasks
// upadate tasks as completed

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let resultelement = document.querySelector('#result')

let renderTasks = (array) => {
    resultelement.innerHTML = '';
    array.forEach((item) => {
        let divElement = document.createElement('div');
        divElement.innerHTML += `<h1><input type="checkbox" ${item.iscompleted ? 'checked' : ''}>${item.name} - ${item.iscompleted ? 'Completed' : ''}</h1>
                                    <button >Remove</button>`;
        divElement.querySelector('input').addEventListener('change', () => {
            toggleCompleted(item.id);
        });
        divElement.querySelector('button').addEventListener('click', () => {
            removeTask(item.id);
        });
        resultelement.appendChild(divElement);
    });
}

renderTasks(tasks);

document.getElementById('addbtn').addEventListener('click', () => {

    // get the value from the input field

    let value = document.getElementById('taskinput').value;
    let object = { id: Date.now(), name: value, iscompleted: false };


    //push the value into the tasks array

    tasks.push(object);
    document.getElementById('taskinput').value = '';

    localStorage.setItem('tasks', JSON.stringify(tasks));
    //append the tasks to the result element

    renderTasks(tasks);

})


let removeTask = (taskId) => {
    // remove the task from the tasks array
    tasks = tasks.filter(item => item.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}

document.getElementById('searchinput').addEventListener('keyup', () => {

    let searchkey = document.getElementById('searchinput').value

    let searchedtasks = tasks.filter(item => {
        return item.name.includes(searchkey);
    })

    renderTasks(searchedtasks);
})

let toggleCompleted = (taskId) => {
    tasks = tasks.map(item => {
        if (item.id === taskId) {
            item.iscompleted = !item.iscompleted;
            return item;
        } else {
            return item;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}