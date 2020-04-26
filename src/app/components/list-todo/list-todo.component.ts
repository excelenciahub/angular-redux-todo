import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/models/global-constant';
import { Todo } from 'src/app/models/todo';
import { IAppState } from 'src/app/store/store';
import { EDIT_TODO, REMOVE_TODO, TOGGLE_TODO, VISIBILITY_FILTER } from '../../store/actions/todo-action';

import { TODO_FILTER } from '../../models/todo-filter';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {

  @select() todos;

  allTotos: Todo[] = [];
  todoList: Todo[] = [];

  todoFilter = TODO_FILTER;

  selectedFilter = TODO_FILTER.ALL;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit(): void {
    this.todos.subscribe(todoList => {
      this.allTotos = todoList;
      this.todoList = this.filterData();
      this.saveData(this.allTotos);
    })
  }

  filterData() {
    switch (this.selectedFilter) {
      case this.todoFilter.COMPLETED:
        return this.allTotos.filter(t => t.completed === true);
      case this.todoFilter.INCOMPLETE:
        return this.allTotos.filter(t => t.completed === false);
      default:
        return this.allTotos;
    }
  }

  saveData(todoList: Todo[]) {
    localStorage.setItem(GlobalConstants.LOCAL_STORAGE_KEYS.TODOS, JSON.stringify(todoList));
  }

  toggleTodo(todo) {
    this.ngRedux.dispatch({ type: TOGGLE_TODO, id: todo.id });
  }

  removeTodo(todo) {
    this.ngRedux.dispatch({ type: REMOVE_TODO, id: todo.id });
  }

  editTodo(todo) {
    this.ngRedux.dispatch({ type: EDIT_TODO, todo: todo });
  }

  changeFilter() {
    this.ngRedux.dispatch({ type: VISIBILITY_FILTER, filter: this.selectedFilter });
  }
}
