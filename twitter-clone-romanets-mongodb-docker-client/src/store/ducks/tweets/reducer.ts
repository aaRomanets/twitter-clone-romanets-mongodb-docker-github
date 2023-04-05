import produce, { Draft } from 'immer';
import { TweetsActions } from './actionCreators';
import {TweetsActionsType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';
import {AddFormState,  TweetsState } from './contracts/state';

//начальное состояние
const initialTweetsState: TweetsState = {
  //список скаченных твитов вначале он пустой
  items: [], 
  //состояние формирования твита по данным на форме, вначале данных на форме нет и твит не формируется
  addFormState: AddFormState.NEVER,
  //скачивания твитов с сервера вначале ничего на сервер не загружается и ничего с сервера не скачивается
  loadingState: LoadingStatus.NEVER, 
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {
  switch (action.type) {
    //вытаскиваем скаченные твиты из store при этом фиксируем состояние процесса скачивания твитов в LOADED
    case TweetsActionsType.SET_TWEETS:
      draft.items = action.payload;
      draft.loadingState = LoadingStatus.LOADED;
      break;

    //скачиваем твиты с сервера в store твитов нет
    case TweetsActionsType.FETCH_TWEETS:
      draft.items = [];
      draft.loadingState = LoadingStatus.LOADING;
      break;

    //фиксируем состояние скачивания твитов с сервера или загрузки твитов на сервер
    case TweetsActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;

    //смотpим как фомируется новый твит по данным на форме
    case TweetsActionsType.SET_ADD_FORM_STATE:
      draft.addFormState = action.payload;
      break;

    //добавляем новый твит по авторизованому пользователю на сервер в store этого твита пока нет
    case TweetsActionsType.FETCH_ADD_TWEET:
      //твит формируется по данным на форме
      //tweet forms according to data on form
      draft.addFormState = AddFormState.LOADING;
      break;

    //удаляем твит по его идентификатору из имеющегося списка твитов
    case TweetsActionsType.REMOVE_TWEET:
      draft.items = draft.items.filter((obj) => obj._id !== action.payload);
      break;

    //вытаскиваем новый твит по авторизованному пользователю из store и заносим его на первое место всего списка твитов
    case TweetsActionsType.ADD_TWEET:
      draft.items.splice(0,0,action.payload);
      //твит сформировался по данным на форме
      draft.addFormState = AddFormState.NEVER;
      break;

    default:
      break;
  }
}, initialTweetsState);
