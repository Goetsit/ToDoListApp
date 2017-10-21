console.log('js');

var editing = false;
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
}



function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasklist'
  }).done(function (response) {
    console.log('getting tasks: ', response);
    //Append to dom function
    console.log('looking for id', response);
    appendToDom(response);
  }).fail(function (error) {
    console.log('GET failed:', error);
  })
}




function addClicked() {
  var task = $('#taskIn').val();
  var dueDate = $('#dueDateIn').val();
  console.log('task', task);
  console.log('dueDate', dueDate);
  var task = {
    task: task,
    duedate: dueDate,
  };
  addTask(task);

  $('input').val('');
}



function addTask(taskToSend) {
  $.ajax({
    type: 'POST',
    url: '/addtask',
    data: taskToSend
  }).done(function (response) {
    console.log(response);
    getTasks();
    getCount();
  }).fail(function (error) {
    alert('Something went wrong.');
  });
}



function getCount() {
  $.ajax({
    type: 'GET',
    url: '/taskcounter'
  }).done(function (response) {
    console.log('getting task count: ', response);
    appendCounter(response);
  }).fail(function (error) {
    console.log('GET failed:', error);
  })

}

function appendCounter(count) {
  for (var ii = 0; ii < count.length; ii += 1) {
    var counter = count[ii]
    $('#count').html(counter.count);
  }
}



function taskComplete() {

  taskid = $(this).data('id');

  $.ajax({
    method: 'PUT',
    url: '/tasklist/complete/' + taskid,
  }).done(function (response) {
    getTasks();
    getCount();
  }).fail(function (error) {
    console.log('Error marking ready for transfer', error);
  })


}

function deleteTask() {
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


function appendToDom(tasks) {

  $('#viewTask').empty();
  // Loop through products and append to dom
  for (var i = 0; i < tasks.length; i += 1) {
    var task = tasks[i];
    //console.log('looking for ID in appendDOM',task.taskid);
    var $tr = $('<tr></tr>');
    $tr.append('<td class = "task">' + task.task + '</td>');
    $tr.append('<td>' + task.duedate + '</td>');
    $tr.append('<td>' + task.complete + '</td>');
    $tr.append('<td><button class="completeBtn btn" data-id="' + task.taskid + '">Completed</button></td>');
    $tr.append('<td><button class="noteBtn btn" data-id="' + task.taskid + '">Add Note</button></td>');
    $tr.append('<td><button class="deleteBtn btn btn-danger" data-id="' + task.taskid + '">Delete</button></td>');
    $tr.data('task', task[i]);
    $tr.data('taskid', task.taskid);
    console.log('console logging at end of append',$tr.data('taskid'));
    $('#viewTask').append($tr);
  }

}

function taskNote(taskid) {
  var taskid = $(this).closest('tr').data('taskid');
console.log(taskid);
  
 $.ajax({
    type: 'GET',
    url: '/tasklist/note/alert/' + taskid
  }).done(function (response) {
    console.log('getting task notes: ', response);
    console.log('note response',response);

    alert(response);
  }).fail(function (error) {
    console.log('GET failed:', error);
  });


}

function addNote() {
  taskid = $(this).data('id');
  note = prompt('enter note:'); //prompt text will be entered as note
  console.log(note);

  var taskNote = {
    taskid: taskid,
    note:note
  }

console.log('tasting taskNote variable', taskNote);

  $.ajax({
    type: 'POST',
    url: '/tasklist/note',
    data: taskNote
  }).done(function (response) {
    console.log(note, 'IS THERE AN ID?')
    console.log(response);
    getTasks();
    getCount();
  }).fail(function (error) {
    alert('Something went wrong.');
  });
}
