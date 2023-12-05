/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.res = [];
  }

  add(todo) {
    this.res.push(todo);
  }

  remove(indexOfTodo) {
    this.res.splice(indexOfTodo, 1);
  }
  update(index, updatedTodo) {
    if (index >= this.res.length) return;
    this.res[index] = updatedTodo;
  }
  getAll() {
    return this.res;
  }
  get(indexOfTodo) {
    if (indexOfTodo >= this.res.length) return null;
    return this.res[indexOfTodo];
  }
  clear() {
    this.res = [];
  }
}

module.exports = Todo;
