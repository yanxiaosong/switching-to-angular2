import {Component, Input, Output, EventEmitter} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

interface Todo {
  completed: boolean;
  label: string;
}

// We can think of the inputs as properties (or even arguments) that the given directive accepts.
//   The outputs could be considered as events that it  triggers.
//
// When we use a directive provided by a 3-rd party library, mostly we care about is its inputs and outputs because they define its API.


@Component({
  selector: 'input-box',
  template: `
    <input #todoInput [placeholder]="inputPlaceholder">  <!--declare a text input  -->
    <button (click)="emitText(todoInput.value); todoInput.value = '';">
      {{buttonLabel}}
    </button>
  `
})
class InputBox {
  @Input() inputPlaceholder: string;
  @Input() buttonLabel: string;
  // all the outputs of all the components need to be instances of EventEmitter
  @Output() inputText = new EventEmitter<string>();
  emitText(text: string) {
    this.inputText.emit(text);
  }
}

@Component({
  selector: 'todo-list',
  template: `
    <ul>
      <li *ngFor="let todo of todos; let index = index" [class.completed]="todo.completed">
        <input type="checkbox" [checked]="todo.completed"
          (change)="toggleCompletion(index)">
        {{todo.label}}
      </li>
    </ul>
  `,
  styles: [
    `ul li {
      list-style: none;
    }
    .completed {
      text-decoration: line-through;
    }`
  ]
})
class TodoList {
  @Input() todos: Todo[];
  @Output() toggle = new EventEmitter<Todo>();
  toggleCompletion(index: number) {
    let todo = this.todos[index];
    this.toggle.emit(todo);
  }
}

@Component({
  selector: 'todo-app',
  directives: [TodoList, InputBox],
  template: `
    <h1>Hello {{name}}!</h1>

    <p>
      Add a new todo:
      <input-box inputPlaceholder="New todo..."
        buttonLabel="Add"
        (inputText)="addTodo($event)">
      </input-box>
    </p>

    <p>Here's the list of pending todo items:</p>
    <todo-list [todos]="todos"
      (toggle)="toggleCompletion($event)">
    </todo-list>
  `
})
class TodoApp {
  todos: Todo[] = [{
    label: 'Buy milk',
    completed: false
  }, {
    label: "Save the world",
    completed: false
  }];
  name: string = 'John';
  addTodo(label: string) {
    this.todos.push({
      label,
      completed: false
    });
  }
  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
  }
}

bootstrap(TodoApp);
