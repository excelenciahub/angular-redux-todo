import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, SAVE_TODO, EDIT_TODO, UPDATE_TODO } from './actions/todo-action';
import { Todo } from '../models/todo';
import { GlobalConstants } from '../models/global-constant';

export interface IAppState {
    todos: Todo[];
    editTodo: Todo
}

const list = localStorage.getItem(GlobalConstants.LOCAL_STORAGE_KEYS.TODOS);

export const INITIAL_STATE: IAppState = {
    todos: list ? JSON.parse(list) : [],
    editTodo: null
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_TODO:
            action.todo.id = state.todos.length + 1;
            return Object.assign({}, state, {
                todos: state.todos.concat(Object.assign({}, action.todo)),
                editTodo: null
            })

        case UPDATE_TODO:

            return Object.assign({}, state, {
                todos: state.todos.map(todo => {
                    if (todo.id === action.todo.id) {
                        return action.todo
                    }
                    return todo;
                }),
                editTodo: null
            })


        case TOGGLE_TODO:
            var todo = state.todos.find(t => t.id === action.id);
            var index = state.todos.indexOf(todo);
            return Object.assign({}, state, {
                todos: [
                    ...state.todos.slice(0, index),
                    Object.assign({}, todo, { completed: !todo.completed }),
                    ...state.todos.slice(index + 1),
                ],
                editTodo: null
            })
        case REMOVE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.filter(t => t.id !== action.id),
                editTodo: null
            })
        case EDIT_TODO:
            return Object.assign({}, state, {
                todos: state.todos.filter(t => t.id !== action.id),
                editTodo: action.todo
            })
        case SAVE_TODO:
            return state;
    }
    return state;
}


