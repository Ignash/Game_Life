import { Injectable } from '@angular/core';
import { of, Observable, observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  rangeSource = new Subject<any>();
  rang$ = this.rangeSource.asObservable();

  serviceMatrix: object[];

  
  constructor() {}

  setRange(value: number): void{
    this.rangeSource.next(value);
    console.log(value)
  }

  setMatrix(matrix){
    this.serviceMatrix = matrix
    let size = matrix.length;
    matrix.forEach((i_elem, i_index )=> {
      i_elem.forEach((j_elem, j_index) => {
        let neighbors: [];
        if (i_index === 0)

      })
    });
  }


}
