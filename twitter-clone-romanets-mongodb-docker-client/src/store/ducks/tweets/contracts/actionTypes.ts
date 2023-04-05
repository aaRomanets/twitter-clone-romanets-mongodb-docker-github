import {Action} from 'redux';
import {AddFormState,  Tweet, TweetsState} from './state';
import {LoadingStatus} from '../../../types';

export enum TweetsActionsType {
    //тип получения коллекции твитов из store
    SET_TWEETS = 'tweets/SET_TWEETS',                
    //тип скачивания твитов с сервера
    FETCH_TWEETS = 'tweets/FETCH_TWEETS',            
    //тип получения состояния скачивания твитов с сервера
    SET_LOADING_STATE = 'tweets/SET_LOADING_STATE', 
    //тип запроса на формирование нового твита 
    FETCH_ADD_TWEET = 'tweets/FETCH_ADD_TWEET',    
    //тип получения нового твита из store 
    ADD_TWEET = 'tweets/ADD_TWEET',                  
    //тип запроса на удаление твита по его идентификатору
    REMOVE_TWEET = 'tweets/REMOVE_TWEET',           
    //тип получения состояния формирования твита по данным на форме 
    SET_ADD_FORM_STATE = 'tweets/SET_ADD_FORM_STATE'
}

//интерфейс коллекции твитов
export interface SetTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_TWEETS;
    payload: TweetsState['items'];
}
  
//интерфейс данных для формирования нового твита на сервере по авторизованному пользователю
export interface FetchAddTweetActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.FETCH_ADD_TWEET;
    payload: {
        text: string;
        images: string[];
    };
}
  
//интерфейс данных нового твита в store
export interface AddTweetActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.ADD_TWEET;
    payload: Tweet;
}

//интерфейс запроса на удаление твита по его идентификатору
export interface RemoveTweetActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.REMOVE_TWEET;
    payload: string;
}
  
//интерфейс запроса на скачивание твитов с сервера либо всех, либо по идентификатору отдельного пользователя
export interface FetchTweetsActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.FETCH_TWEETS;
}

//интерфейс состояния скачивания твитов с сервера
export interface SetTweetsLoadingStateActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_LOADING_STATE;
    //состояние скачивания твитов с сервера
    payload: LoadingStatus; 
}
 
//интерфейс состояния формирования твита по данным на форме
export interface SetAddFormStateActionInterface extends Action<TweetsActionsType> {
    type: TweetsActionsType.SET_ADD_FORM_STATE;
    //состояние формирования твита по данным на форме
    payload: AddFormState;
}