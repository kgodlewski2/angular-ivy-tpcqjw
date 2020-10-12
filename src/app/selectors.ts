import { AppStateInterface, StateInterface } from './state';
import * as selectors from './store/select.operator';

const selectGlobalFeature = selectors.createFeatureSelector<AppStateInterface, StateInterface>('global');

export const selectFirstName = selectors.createSelector(
  selectGlobalFeature,
  (state) => state.firstName
);
