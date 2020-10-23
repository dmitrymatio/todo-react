import React, { useState, useEffect } from "react";
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  NotStarted: task => task.status == 0,
  Started: task => task.status == 1,
  Completed: task => task.status == 2
};

const DATA = [
  { id: "todo-0", name: "Eat", status: 0 },
  { id: "todo-1", name: "Sleep", status: 1 },
  { id: "todo-2", name: "Repeat", status: 2 }
];

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home(props) {

  const [tasks, setTasks] = useState(DATA);

  const [filter, setFilter] = useState('All');

  // As shown in example with empty array [] for single run on initial load
  useEffect(() => {
    const data = localStorage.getItem('listOfTasks');
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  // As shown in example with [tasks] dependency for optimization
  // this will only run if state of tasks changed 
  useEffect(() => {
    localStorage.setItem('listOfTasks', JSON.stringify(tasks));
  }, [tasks]);

  const taskList = tasks
    .filter(task => FILTER_MAP[filter](task))
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        status={task.status}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, status: 0 };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id, statusCode) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, status: statusCode }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
        <button
          className="btn"
          onClick={() => {
            setTasks([]);
          }} >Clear Tasks</button></h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default Home;