import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class Store<S> {
  
  protected source: BehaviorSubject<S>;
  public state$: Observable<S>;

  constructor(private initialState: S) {
    this.source = new BehaviorSubject(initialState);
    this.state$ = this.source.asObservable();
  }

  public get<T extends S, K extends keyof S>(key: K): T[K] {
    return { ...this.source.getValue()[key] as T[K] };
  }

  public getAll(): S {
    return { ...this.source.getValue() };
  }

  public put<T extends S, K extends keyof S>(key: K, data: T[K]): void {
    this.source.next({
      ...this.source.getValue(),
      [key]: { ...data }
    });
  }

  public patch<T extends S>(data: Partial<T>): void {
    this.source.next({
      ...this.source.getValue(),
      ...data
    });
  }

  public clear(key?: keyof S): void {
    if (!key) {
      this.source.next(this.initialState);
      return;
    }

    this.source.next({
      ...this.source.getValue(),
      [key]: this.initialState[key]
    });
  }
}