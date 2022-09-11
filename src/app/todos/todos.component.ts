import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToDo } from '../model/todo.model';
import { TodosService } from '../todos-service/todos-service';
import { DELETE_TODO } from '../todos-service/todos.queries';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: ToDo[] = [];
  error: any;

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
    this.todoService.get().subscribe(
      data => this.todos = data,
      error => this.error = error
    );
  }

  deleteTodo(id: string): void {
    this.todoService.delete(id).subscribe(
      () => this.todos = this.todos.filter(todo => todo.id !== id),
      error => this.error = error
    );
  }

  addTodo(): void {
    const todo = <ToDo>{
      name: this.todoForm.value.name,
      description: this.todoForm.value.description
    }
    this.todoService.add(todo).subscribe(({ data, error }: any)  => {
      if(!error) {
        this.todos = data.addTodo;
        this.todoForm.reset();
      }
      this.error = error;
    }
    );
  }
}
