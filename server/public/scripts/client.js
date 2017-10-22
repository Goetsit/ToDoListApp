console.log('js');

var taskId = 0;


$(document).ready(readyNow);

function readyNow() {
  console.log('JQ');
  getTasks();
  getCount();
  $('#addBtn').on('click', addClicked);
  $('#viewTask').on('click', '.completeBtn', taskComplete);
  $('#viewTask').on('click', '.deleteBtn', deleteTask);
  $('#viewTask').on('click', '.task', taskNote);
  $('#viewTask').on('click', '.noteBtn', addNote);
} //CLICK HANDLERS



function getTasks() { //BEGIN INITIAL GET REQUEST TO POPULATE TASKS FROM DB TASK_ROUTE.JS
  $.ajax({
    type: 'GET',
    url: '/tasklist'
  }).done(function (response) {
    console.log('getting tasks: ', response);
    //Append to dom function
    console.log('looking for id', response);
    appendToDom(response); //CALL APPENDTODOM TO APPEND THE RESPONSE
  }).fail(function (error) {
    console.log('GET failed:', error);
  })
} //END GET TASKS




function addClicked() { //FUNCTION FOR ADD TASK BUTTON 
  var task = $('#taskIn').val();
  var dueDate = $('#dueDateIn').val();
  console.log('task', task);
  console.log('dueDate', dueDate);
  var task = {
    task: task,
    duedate: dueDate,
  };
  addTask(task); //BEING AJAX POST REQUEST

  $('input').val(''); //CLEAR INPUT VALUES
} //END ADDCLICKED



function addTask(taskToSend) { //TASK_ADD.JS
  $.ajax({
    type: 'POST',
    url: '/addtask',
    data: taskToSend
  }).done(function (response) {
    console.log(response);
    getTasks(); //RUN GET TASKS AGAIN TO REFRESH TABLE
    getCount(); //UPDATE COUNT OF UNCOMPLETE TASKS
  }).fail(function (error) {
    alert('Something went wrong.');
  });
} //END ADDTASK



function getCount() { //GET CURRENT COUNT OF UNCOMPLETE TASKS >>> TASK_COUNTER.JS
  $.ajax({
    type: 'GET',
    url: '/taskcounter'
  }).done(function (response) {
    console.log('getting task count: ', response);
    appendCounter(response); //APPEND THE COUNT FROM THE SELECT IN THE ROUTE
  }).fail(function (error) {
    console.log('GET failed:', error);
  })

} //END GETCOUNT

function appendCounter(count) { // APPEND COUNT TO SPAN
  for (var ii = 0; ii < count.length; ii += 1) {
    var counter = count[ii]
    $('#count').html(counter.count);
  }
} //END APPEND COUNTER



function taskComplete() { //UPDATE TASKS AS COMPLETE WITH COMPLETE BUTTON  TASK_COMPLETE.JS

  taskid = $(this).data('id');

  $.ajax({
    method: 'PUT',
    url: '/tasklist/complete/' + taskid,
  }).done(function (response) {
    getTasks(); //REFRESH TASKS
    getCount(); //REFRESH COUNT
  }).fail(function (error) {
    console.log('Error marking ready for transfer', error);
  })
}// END TASK COMPLETE

function deleteTask() { //DELETE A TASK AND ANY ASSOCIATED NOTES TASK_DELETE.JS
  taskid = $(this).data('id');
  $.ajax({
    method: 'DELETE',
    url: '/tasklist/delete/' + taskid
  }).done(function (response) {
    getTasks();
    getCount();
  }).fail(function (error) {
    console.log('Error deleting', error);
  })
}


function appendToDom(tasks) { //APPEND TASKS TO TABLE

  $('#viewTask').empty(); //PREVENTS DUPLICATION
  // Loop through tasks and append to dom
  for (var i = 0; i < tasks.length; i += 1) {
    var task = tasks[i];
    var $tr = $('<tr></tr>');
    $tr.append('<td class = "task">' + task.task + '</td>');
    $tr.append('<td>' + task.duedate + '</td>');
    $tr.append('<td>' + task.complete + '</td>');
    $tr.append('<td><button class="completeBtn btn" data-id="' + task.taskid + '">Completed</button></td>');
    $tr.append('<td><button class="noteBtn btn" data-id="' + task.taskid + '">Add Note</button></td>');
    $tr.append('<td><button class="deleteBtn btn btn-danger" data-id="' + task.taskid + '">Delete</button></td>');
    $tr.data('task', task[i]);
    $tr.data('taskid', task.taskid);
    console.log('console logging at end of append', $tr.data('taskid'));
    $('#viewTask').append($tr);
  }

}

function taskNote(taskid) { //GET REQUEST FOR TASKS WITH NOTES TASK_NOTE_ALERT.JS
  var taskid = $(this).closest('tr').data('taskid');
  $.ajax({
    type: 'GET',
    url: '/tasklist/note/alert/' + taskid
  }).done(function (response) {
    noteAlert(response); //RUN ALERT
  }).fail(function (error) {
    console.log('GET failed:', error);
  });


}

function addNote() { //ADD NOTE BUTTON, INSERTS INTO TASK_NOTE, VIEWABLE WHEN CLICKING ON TASK ON DOM  TASK_NOTE.JS
  taskid = $(this).data('id');
  note = prompt('enter note:'); //prompt text will be entered as note

  var taskNote = {
    taskid: taskid,
    note: note
  }

  $.ajax({
    type: 'POST',
    url: '/tasklist/note',
    data: taskNote
  }).done(function (response) {
    getTasks();
    getCount();
  }).fail(function (error) {
    alert('Something went wrong.');
  });
}

function noteAlert(note) { //ALERTS USER WITH NOTE ON TASK >> *****TASKS ARE VIEWED WHEN CLICKING ON THE TASK IN THE TABLE
  for (var i = 0; i < note.length; i += 1) {
    var taskNote = note[i];
    alert(taskNote.note);
  }
}
