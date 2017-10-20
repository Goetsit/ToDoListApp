console.log('js');

var editing = false;
var editingId = 0;


$(document).ready(readyNow);

function readyNow() {
  console.log('JQ');
  getTasks();
  getCount();
  $('#addBtn').on('click', addClicked);

}

function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasklist'
  }).done(function (response) {
    console.log('getting tasks: ', response);
    //Append to dom function
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
addTask(task)
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
  }).fail(function(error){
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

function appendCounter(count){
  console.log(count[0]);
  for(var ii = 0; ii < count.length; ii += 1){
    var counter = count[ii]
    console.log('append counter test',counter.count);
    $('#count').html(counter.count);
  }
}

function appendToDom(tasks) {

  console.log(tasks);

  $('#viewTask').empty();
  // Loop through products and append to dom
  for (var i = 0; i < tasks.length; i += 1) {
    var task = tasks[i];
    var $tr = $('<tr></tr>');
    //$tr.data('task', tasks);
    $tr.append('<td>' + task.task + '</td>');
    $tr.append('<td>' + task.duedate + '</td>');
    $tr.append('<td>' + task.complete + '</td>');
    $('#viewTask').append($tr);
  }



}
