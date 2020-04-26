import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store/store';
import { REMOVE_TODO, SAVE_TODO, TOGGLE_TODO, EDIT_TODO } from '../../store/actions/todo-action';
import { Todo } from 'src/app/models/todo';
import { GlobalConstants } from 'src/app/models/global-constant';


@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit, OnDestroy {

  @select() todos;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit(): void {
    this.todos.subscribe(todoList => {
      this.saveData(todoList)
    })
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

  ngOnDestroy() {
    this.ngRedux.dispatch({ type: SAVE_TODO, id: 0 });
  }

}
