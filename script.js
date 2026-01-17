const textarea = document.querySelector('textarea');
const addBtn = document.querySelector('.taskBarAdd');
const taskContainer = document.querySelector('.incompleteTasks');

let todoList = [];


function updateUI() {
    let newInnerHTML = '';
    todoList.forEach((todoElement) => {
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
                    <button class="iconBtn" onclick="editTask()">
                        <img src="assets/edit.png" alt="edit">
                    </button>

                    <button class="iconBtn" onclick="completeTask()">
                        <img src="assets/complete.png" alt="complete">
                    </button>

                    <button class="iconBtn" onclick="deleteTask()">
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
    if (!todo) { return; }

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

    todoList.push({
        name: todo,
        date: formattedDate,
    });
    
    textarea.value = '';
    updateUI();
}

addBtn.addEventListener('click', addTask);

function editTask() {

}

function completeTask() {
    
}

function deleteTask() {
    
}