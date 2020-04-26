import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { AppComponent } from './components/app/app.component';
import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { IAppState, INITIAL_STATE, rootReducer } from './store/store';

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    ListTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    NgReduxModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
