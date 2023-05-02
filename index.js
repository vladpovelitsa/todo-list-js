class TodoApp {
  static todoAppWrap = document.querySelector('.app__tasks-list')
  constructor(taskList) {
    this.taskList = taskList;
  }
  renderTaskList(){
    this.taskList.forEach(task => {
      TodoApp.todoAppWrap.appendChild(new Task(task.taskId, task.taskText, task.taskDone).createTask())
    })
  }
  renderNewTask(task) {
    TodoApp.todoAppWrap.appendChild(task)
  }
  removeTask(){

  }
}
class Task {
  constructor(taskId, taskText, taskDone) {
    this.taskId = taskId
    this.taskText = taskText
    this.taskDone = taskDone
  }
  createTask(){
    let task = document.createElement('div')
    task.classList.add('app__task')
    let taskText = document.createElement('h3')
    taskText.classList.add('app__task-label')
    taskText.innerText = this.taskText;
    task.appendChild(taskText);
    let taskDone = document.createElement('button')
    taskDone.classList.add('app__done')
    this.taskDone ? taskDone.classList.add('--done') : null
    let taskEdit = document.createElement('button')
    taskEdit.classList.add('app__edit')
    taskEdit.innerHTML = '<span class="material-symbols-outlined">edit</span>'
    let taskRemove = document.createElement('button')
    taskRemove.classList.add('app__remove')
    taskRemove.innerHTML = '<span class="material-symbols-outlined">delete</span>'
    taskDone.onclick = () => {
      event.target.classList.toggle('--done')
      this.markAsDone()
    }
    taskRemove.onclick = () => {
      this.deleteTask()
    }
    task.appendChild(taskDone);
    task.appendChild(taskEdit);
    task.appendChild(taskRemove);

    task.id = this.taskId;
    return task
  }
  markAsDone() {
    let taskArray = JSON.parse(localStorage.getItem('myTodoList'))
    let taskToMark = taskArray.findIndex(item => item.taskId === this.taskId)
    if(taskToMark >= 0) {
      taskArray[taskToMark].taskDone = !taskArray[taskToMark].taskDone
    }
    localStorage.setItem('myTodoList', JSON.stringify(taskArray));
  }
  deleteTask() {
    let taskArray = JSON.parse(localStorage.getItem('myTodoList'))
    let taskToDelete = taskArray.findIndex(item => item.taskId === this.taskId)
    if(taskToDelete >= 0) {
      taskArray.splice(taskToDelete, 1)
      document.getElementById(this.taskId).remove()
    }
    localStorage.setItem('myTodoList', JSON.stringify(taskArray));
  }
  editTask() {
    // code
  }
}
let taskArray = JSON.parse(localStorage.getItem('myTodoList')) || [];
let myTodoApp = new TodoApp(taskArray);
myTodoApp.renderTaskList()

document.forms[0].addEventListener('submit', function (){
  event.preventDefault()
  let newTask = new Task(taskArray.length, this.elements.taskText.value)
  taskArray.push(newTask)
  myTodoApp.renderNewTask(newTask.createTask())
  localStorage.setItem('myTodoList', JSON.stringify(taskArray));
  this.reset()
})
