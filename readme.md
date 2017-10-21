# ToDoList

### Table Creation
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
                         ,"recurring"
                         ,"note" ) 
VALUES
    ((SELECT "taskid" from "task" WHERE "taskid"=1)
    ,TRUE
    ,'I do not like making my bed'),
    
    ((SELECT "taskid" from "task" WHERE "taskid"=2)
    ,TRUE
    ,'I forgot to feed the dog, oops')
    ((SELECT "taskid" from "task" WHERE "taskid"=2)
    ,TRUE
    ,'On October 14th, I did not forget to feed the dog');
    

ALTER TABLE "public"."task" ALTER COLUMN "complete" SET DEFAULT false;

ALTER TABLE "public"."task_note"
  DROP CONSTRAINT "task_note_taskid_fkey",
  ADD CONSTRAINT "task_note_taskid_fkey" FOREIGN KEY ("taskid") REFERENCES "public"."task"("taskid") ON DELETE CASCADE;



```



My initial plan for this is to have a To Do List

have the task listed with the task_note data available as an accordian list or drop down type menu below it


Instructions for the assignment:

Here are the specific components for the challenge:

Create a front end experience that allows a user to create a task.
When the task is created, it should be stored inside of a database (SQL)
Whenever a task is created the front end should refresh to show all tasks that need to be completed.
Each task should have an option to 'Complete' or 'Delete'.
When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete)
Whether or not a task is complete should also be stored in the database.
Deleting a task should remove it both from the Front End as well as the Database.
