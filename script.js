// Persistance logic
// Intialising
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateDashboardUI();
    updateCalendarUI();
    updateTrashUI();
});

let todoList = [];
let bin = [];

function loadData() {
    const savedTodosRaw = localStorage.getItem('todos');
    const savedBinRaw = localStorage.getItem('bin');
  
    let savedTodos = [];
    let savedBin = [];
  
    try { savedTodos = JSON.parse(savedTodosRaw || '[]'); } catch { savedTodos = []; }
    try { savedBin = JSON.parse(savedBinRaw || '[]'); } catch { savedBin = []; }
  
    if (savedTodos && !Array.isArray(savedTodos) && Array.isArray(savedTodos.todoList)) {
      savedTodos = savedTodos.todoList;
    }

    if (savedBin && !Array.isArray(savedBin) && Array.isArray(savedBin.bin)) {
      savedBin = savedBin.bin;
    }
  
    todoList = Array.isArray(savedTodos) ? savedTodos : [];
    bin = Array.isArray(savedBin) ? savedBin : [];
  }
  
  
function saveData() {
    localStorage.setItem('todos', JSON.stringify(todoList));
    localStorage.setItem('bin', JSON.stringify(bin));
}


// Dashboard logic
const textarea = document.querySelector('textarea');
const addBtn = document.querySelector('.taskBarAdd');
const taskContainer = document.querySelector('.incompleteTasks');
const dateInput = document.querySelector('.taskBarDate');


function updateDashboardUI() {
    if (!taskContainer) { return; }

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
    
    saveData();
}

function addTask() {
    const todo = textarea.value;
    const date = dateInput.value;
    if (!todo) { return; }

    todoList.push({name: todo, date: date});
    
    textarea.value = '';
    dateInput.value = '';

    updateDashboardUI();
}

function editTask(index) {
    textarea.value = todoList[index].name;
    dateInput.value = todoList[index].date;

    todoList.splice(index, 1);

    updateDashboardUI();
}

function deleteTask(index) {
    bin.push(todoList[index]);

    todoList.splice(index, 1);

    updateDashboardUI();
    updateTrashUI();
}


// Bin logic
const deletedTaskContainer = document.querySelector(".deletedTasks");

function updateTrashUI() {
    if (!deletedTaskContainer) { return; }
    
    let newInnerHTML = '';
    bin.forEach((binElement, index) => {
        newInnerHTML += `
            <div class="deletedRow">
              <p class="deletedText">${binElement.name}</p>
          
              <!-- Buttons -->
              <div class="deletedActions">
                <!-- Recover -->
                <button class="iconBtn" onclick="recoverTask(${index})">
                  <img src="assets/recover.png" alt="recover">
                </button>
    
                <!-- Delete -->
                <button class="iconBtn" onclick="deleteTaskForever(${index})">
                  <img src="assets/delete.png" alt="delete">
                </button>
              </div>
            </div>`
    });

    deletedTaskContainer.innerHTML = newInnerHTML;
    newInnerHTML = '';
    
    saveData();
}

function recoverTask(index) {
    const name = bin[index].name;
    const date = bin[index].date;
    todoList.push({name: name, date: date});

    bin.splice(index, 1);

    updateTrashUI();
    updateDashboardUI();
}

function deleteTaskForever(index) {
    bin.splice(index, 1);

    updateTrashUI();
}

// Calendar logic
const daysBoard = document.querySelector('.daysBoard');

function updateCalendarUI() {
    if (!daysBoard) return;
    
    const dates = getDatesISO();
    let newInnerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const dayDate = dates[i];
    
        newInnerHTML += `
        <div class="dayCol">
            <p class="calendarDate">${formatDateGB(dayDate)}</p>
        `;
    
        const tasksForDay = todoList.filter((task) => task.date === dayDate);
    
        tasksForDay.forEach((task) => {
            newInnerHTML += `<div class="calendarTaskCard">${task.name}</div>`;
        });
    
        newInnerHTML += `</div>`;
    }
    
    daysBoard.innerHTML = newInnerHTML;
}

function formatDateGB(isoDate) {
    if (!isoDate) return '';
    return new Date(isoDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit'
    });
}

function getDatesISO() {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().slice(0, 10)); 
    }
    return dates;
  }