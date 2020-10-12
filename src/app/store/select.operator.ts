import { Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

export const select = <Predicate extends (data: any) => any>(predicate: Predicate) => {
  // tslint:disable-next-line: only-arrow-functions
  return function<State>(source: Observable<State>): Observable<ReturnType<Predicate>> {
    return source
      .pipe(
        debounceTime(0),
        map<State, ReturnType<Predicate>>(predicate),
        // distinctUntilChanged((a, b) => isDeepEqual(a, b)),
        // shareReplay(1)
      );
  };
};

export const createFeatureSelector = <
  AppState extends Record<string, any>,
  FeatureKey extends keyof AppState
>(featureKey: FeatureKey): (state: AppState) => Observable<AppState[FeatureKey]> => {
  // tslint:disable-next-line: only-arrow-functions
  return function(source: AppState): Observable<AppState[FeatureKey]> {
    return source
      .pipe(
        map(state => state[featureKey])
      );
  };
};

export function createSelector<
  FeatureSelector extends typeof createFeatureSelector,
  Projector extends (data: any) => any
>(featureSelector: FeatureSelector, projector: Projector) {
  const projectorSelector = select(output => projector(output));
  // tslint:disable-next-line: only-arrow-functions
  return function<State>(source$: Observable<State>): Observable<ReturnType<Projector>> {
    return source$
      .pipe.apply(null, [featureSelector, projectorSelector]);
  };
}
