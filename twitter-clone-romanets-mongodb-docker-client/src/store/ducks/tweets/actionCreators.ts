import {
  //интерфейс данных нового твита в store
  AddTweetActionInterface, 
  //интерфейс данных для формирования нового твита на сервере по авторизованному пользователю
  FetchAddTweetActionInterface, 
  //интерфейс запроса на скачивание твитов с сервера либо всех, либо по идентификатору отдельного пользователя
  FetchTweetsActionInterface, 
  //интерфейс состояния формирования твита по данным на форме
  SetAddFormStateActionInterface,
  //интерфейс запроса на удаление твита по его идентификатору 
  RemoveTweetActionInterface, 
  //интерфейс коллекции твитов
  SetTweetsActionInterface,
  //интерфейс состояния скачивания твитов с сервера
  SetTweetsLoadingStateActionInterface, 
  //типы действий с твитами
  TweetsActionsType 
} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';
import { AddFormState,  Tweet, TweetsState } from './contracts/state';

//фиксируем скаченные твиты при отправке в store
export const setTweets = (payload: TweetsState['items']): SetTweetsActionInterface => ({
  //по этому типу будем получать из store коллекцию твитов
  type: TweetsActionsType.SET_TWEETS,
  payload,
});

//передаем в сагу составление запроса на добавление твита
export const fetchAddTweet = (payload: {
  text: string, 
  images: string[]
}): FetchAddTweetActionInterface => ({
  type: TweetsActionsType.FETCH_ADD_TWEET,
  payload
});

//фиксируем полученный из саги новый твит в store по авторизованному пользователю
export const addTweet = (payload: Tweet): AddTweetActionInterface => ({
  //по этому типу получаем новый твит из store через reducer
  type: TweetsActionsType.ADD_TWEET, 
  payload,
});

//фиксируем в store состояние скачивания твитов с сервера
export const setTweetsLoadingState = ( payload: LoadingStatus): SetTweetsLoadingStateActionInterface => ({
  type: TweetsActionsType.SET_LOADING_STATE,
  payload
});

//фиксируем в store состояние формирования твита по данным на форме
export const setAddFormState = ( payload: AddFormState): SetAddFormStateActionInterface => ({
  type: TweetsActionsType.SET_ADD_FORM_STATE,
  payload
});

//передаем запрос в сагу на удаление твита по его идентификатору payload
export const removeTweet = (payload: string): RemoveTweetActionInterface => ({
  type: TweetsActionsType.REMOVE_TWEET,
  payload
});

//передаем в сагу составление запроса о скачивании твитов с сервера
export const fetchTweets = (): FetchTweetsActionInterface => ({
  //по этому типу
  type: TweetsActionsType.FETCH_TWEETS
});

//обЪединяем все интерфейсы данных по твитам для reducer
export type TweetsActions =
  | SetTweetsActionInterface
  | FetchTweetsActionInterface
  | SetTweetsLoadingStateActionInterface
  | FetchAddTweetActionInterface
  | AddTweetActionInterface
  | SetAddFormStateActionInterface
  | RemoveTweetActionInterface;
