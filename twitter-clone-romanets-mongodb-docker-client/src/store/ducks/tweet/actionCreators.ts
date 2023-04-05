import { LoadingStatus } from '../../types';
import {
  //интерфейс на запрос по скачиванию твита по идентификатору payload с сервера
  FetchTweetDataActionInterface,          
  //интерфейс данных скаченного твита
  SetTweetDataActionInterface,            
  //интерфейс состояния процесса скачивания твита с сервера
  SetTweetLoadingStatusActionInterface,   
  //тип действий с данными твита
  TweetActionsType,                       
} from './contracts/actionTypes';
import { TweetState } from './contracts/state';

//отправляем твит в store
export const setTweetData = (payload: TweetState['data']): SetTweetDataActionInterface => ({
  type: TweetActionsType.SET_TWEET_DATA,
  payload,
});

//отправляем в store статус скачивания твита с сервера по идентификатору
export const setTweetLoadingStatus = (
  payload: LoadingStatus,
): SetTweetLoadingStatusActionInterface => ({
  type: TweetActionsType.SET_LOADING_STATE,
  payload,
});

//передаем в сагу запрос на скачивание твита из сервера с идентификатором payload
export const fetchTweetData = (payload: string): FetchTweetDataActionInterface => ({
  type: TweetActionsType.FETCH_TWEET_DATA,
  payload,
});

//обЪединяем интерфейсы данных по скачиваемому твиту с сервера
export type TweetActions =
  | SetTweetDataActionInterface
  | FetchTweetDataActionInterface
  | SetTweetLoadingStatusActionInterface;
