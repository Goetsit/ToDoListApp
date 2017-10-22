# ToDoList

## Table Creation
Below is the table set up for task and task_note.
I've included initial values for both tables
There are two ALTER TABLE statements at the bottom that you will want to make sure are run as well. 
The necessity for these changes came after the application started to take form, these include setting the default values for Completed to false and altering a constraint on the task_notes table so tasks can be deleted if from the application if they also include a note.

```
CREATE TABLE "task" (
			"taskid" serial PRIMARY KEY
			,"task" VARCHAR(500) NOT NULL
			,"duedate" DATE NOT NULL
			,"complete" BOOLEAN		
			)

INSERT INTO "task"(
		   "task"
		   ,"duedate"
		   ,"complete"
		   )
VALUES(
	'make my bed'
	,'2017-10-01'
	,FALSE
	),
      (
	'feed the dog'
	,'2017-10-18'
	,FALSE
	);


CREATE TABLE "task_note"(
			"tasknoteid" SERIAL PRIMARY KEY		
			,"taskid" INT REFERENCES task
			,"recurring" BOOLEAN
			,"note" VARCHAR(500)				
			)


INSERT INTO "task_note" ("taskid"
                         ,"note" ) 
VALUES
    ((SELECT "taskid" from "task" WHERE "taskid"=1)
    ,'I do not like making my bed'),
    
    ((SELECT "taskid" from "task" WHERE "taskid"=2)
    ,'I forgot to feed the dog, oops')
    ((SELECT "taskid" from "task" WHERE "taskid"=2)
    ,'On October 14th, I did not forget to feed the dog');
    

ALTER TABLE "public"."task" ALTER COLUMN "complete" SET DEFAULT false;

ALTER TABLE "public"."task_note"
  DROP CONSTRAINT "task_note_taskid_fkey",
  ADD CONSTRAINT "task_note_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "public"."task"("taskid") ON DELETE CASCADE;



```

# Client-Facing To Do List Functionality

## Add Task Functionality and Complete Task Functionality

The user has the ability to add a Task and a Due Date, this is added to the table using the Add Task button.
Per my table creation, each task will be created with a FALSE default for the Completed column.
Tasks are ordered first by whether or not they are completed, then by their due date. False will appear first on the list.

The user can change this column to True using the Completed button.

## Delete Button Functionality

The Delete button deletes both from task and, if present, task_note.
This button should be used with caution as these tables are not backed up - if the task is deleted, all data will be removed.

## Add/View Note Functionality

The Add Note button inserts a note to the task_note table.
Notes are inserted via a prompt().
It inserts based on the taskid of the task it is associated to.
The note can be accessed by selecting the Task on the table of the To Do List; for example, if you use the dummy data provided, click the text that says "make my bed" - this should alert the user with the notes.
Notes will appear as alerts and will cause an alert for each note on the task.

## "Uncompleted Task Counter" Functionality

The UNCOMPLETED TASK counter counts the rows on the table where the Completed values is FALSE.
This is determined by using the aggergate function COUNT() within the task_counter.js router.

# Server-Side To Do List Functionality

See code comments in client.js for brief description of client side code and the respective routes

## server.js

Each route is required as a variable and then included with app.use

## task_route.js

Initial GET request, selects from the "task" table

## task_counter.js

GET request, counts from "task" where completed is false, appends this to the DOM in client.js

## task_add.js

POST request, inserts new task with default of False for complete and appends the new task to the DOM. This uses the Add Task button to star the request

## task_complete.js

PUT request, updates the completed column to reflect true

## task_delete.js

DELETE request, uses the delete button to initilize request, deletes subsequent task and task_note(s)

## task_note.js

POST request, inserts a note with the corresponding taskid into "task_note"

## task_note_alert.js

GET request, when selecting on the task in the table, requests the note(s) from the "task_note" table and alerts the users with those notes

