const textarea = document.querySelector('textarea');
const addBtn = document.querySelector('.taskBarAdd');
const taskContainer = document.querySelector('.incompleteTasks');
const dateInput = document.querySelector('.taskBarDate');

let todoList = [];
let bin = [];


function updatedashboardUI() {
    let newInnerHTML = '';
    todoList.forEach((todoElement, todoIndex) => {
        newInnerHTML += `            
            <div class="incompleteRow">
                <div class="incompleteText">
                    <p class="taskTitle">${todoElement.name}</p>
                
                    <div class="taskDate">
                        <img src="assets/calendar.png" alt="calendar">
                        <p>${todoElement.date}</p>
                    </div>
                </div>

                <div class="incompleteActions">
                    <button class="iconBtn" onclick="editTask(${todoIndex})">
                        <img src="assets/edit.png" alt="edit">
                    </button>

                    <button class="iconBtn" onclick="deleteTask(${todoIndex})">
                        <img src="assets/bin.png" alt="bin">
                    </button>

                </div>
            </div>`
    })

    taskContainer.innerHTML = newInnerHTML;
    newInnerHTML = '';
}

function addTask() {
    const todo = textarea.value;
    const date = dateInput.value;
    if (!todo) { return; }

    todoList.push({
        name: todo,
        date: date,
    });
    
    textarea.value = '';
    dateInput.value = '';
    updatedashboardUI();
}

function editTask(index) {
    textarea.value = todoList[index].name;
    dateInput.value = todoList[index].date;

    todoList.splice(index, 1);

    updatedashboardUI();
}

function deleteTask(index) {
    bin.push(todoList[index]);

    todoList.splice(index, 1);
    updatedashboardUI();
}