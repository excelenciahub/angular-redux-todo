import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo';
import { IAppState } from 'src/app/store/store';
import { NgRedux, select } from '@angular-redux/store';
import { ADD_TODO, UPDATE_TODO } from 'src/app/store/actions/todo-action';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {


  @select() editTodo;

  todoForm: FormGroup;

  isFormSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit(): void {
    this.buildForm(new Todo({}));
    this.editTodo.subscribe(todo => {
      if (todo && todo.id) {
        this.buildForm(todo);
      }
    });
  }

  /**
   * Used to build form
   * @param data
   */
  buildForm(data: Todo) {
    this.isFormSubmitted = false;
    this.todoForm = this.formBuilder.group({
      id: [data.id],
      name: [data.name, Validators.required],
      completed: [data.completed]
    });
  }

  /**
     * Used to get the form control
     */
  get f() {
    return this.todoForm.controls;
  }

  /**
   * Used to add/edit chapter
   */
  onSubmit() {
    this.isFormSubmitted = true;

    if (this.todoForm.invalid) {
      return;
    }

    const todo: Todo = Object.assign(this.todoForm.value);

    if (todo && todo.id) {
      this.ngRedux.dispatch({ type: UPDATE_TODO, todo: todo });
    }
    else {
      this.ngRedux.dispatch({ type: ADD_TODO, todo: todo });
    }

    this.buildForm(new Todo({}));
  }

}

