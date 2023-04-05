import { RootState } from '../../store';
import {LoadingStatus} from '../../types';
import { AddFormState, TweetsState } from './contracts/state';

//получаем всю информацию о твитах из store через reducer
export const selectTweetsState = (state: RootState): TweetsState => state.tweets;

//контролируем процесс скачивания всех твитов с сервера
export const selectLoadingState = (state: RootState): LoadingStatus =>
  selectTweetsState(state).loadingState;

export const selectAddFormState = (state: RootState): AddFormState =>
  selectTweetsState(state).addFormState;

//проверяем скачиваются или нет все твиты с сервера 
export const selectIsTweetsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingStatus.LOADING;

//проверяем скачились или нет все твиты с сервера
export const selectIsTweetsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingStatus.LOADED;

//получем сами твиты
export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items;