// user can create their own to-do list
// user delete tasks
// search tasks
// upadate tasks as completed

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let resultelement = document.getElementById('result')

let renderTasks = (array) => {
    resultelement.innerHTML = '';
    array.forEach((item, index) => {
        resultelement.innerHTML += `<div>
                                      <h1><input type="checkbox" onchange="toggleCompleted(${item.id})" ${item.iscompleted ? 'checked' : ''}>${item.name} - ${item.iscompleted ? 'Completed' : ''}</h1>
                                      <button onclick="removeTask(${item.id})">Remove</button>
                                     </div>`;
    });
}

renderTasks(tasks);

document.getElementById('addbtn').addEventListener('click', () => {

    // get the value from the input field

    let value = document.getElementById('taskinput').value;
    let object = { id: Date.now(), name: value, iscompleted: false };


    //push the value into the tasks array

    tasks.push(object);

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