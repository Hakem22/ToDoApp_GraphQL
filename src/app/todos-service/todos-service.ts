import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { ToDo } from '../model/todo.model';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from './todos.queries';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private apollo: Apollo) { }

  delete(id: string): Observable<unknown> {
    return this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      }
    })
  }

  add(todo: ToDo): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        name: todo.name,
        description: todo.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })
  }

  get(): Observable<ToDo[]> {
    return this.apollo.watchQuery({
      query: GET_TODOS
    }).valueChanges.pipe(
      map(result => (<any>result.data).todos)
    )
  }
}

