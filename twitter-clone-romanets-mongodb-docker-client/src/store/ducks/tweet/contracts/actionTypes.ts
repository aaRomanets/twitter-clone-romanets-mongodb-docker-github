import { Action } from 'redux';
import { LoadingStatus } from '../../../types';
import { TweetState } from './state';

export enum TweetActionsType {
    //тип помещения скаченного с сервера твита в store
    SET_TWEET_DATA = 'tweet/SET_TWEET_DATA',       
    //тип запроса на скачивание твита с сервера 
    FETCH_TWEET_DATA = 'tweet/FETCH_TWEET_DATA', 
    //type of process states of downloading tweet with server  
    SET_LOADING_STATE = 'tweet/SET_LOADING_STATE', 
}

//интерфейс данных скаченного твита
export interface SetTweetDataActionInterface extends Action<TweetActionsType> {
    type: TweetActionsType.SET_TWEET_DATA;
    payload: TweetState['data'];
}

//интерфейс на запрос по скачиванию твита по идентификатору payload с сервера
export interface FetchTweetDataActionInterface extends Action<TweetActionsType> {
    type: TweetActionsType.FETCH_TWEET_DATA;
    payload: string;
}

//интерфейс состояния процесса скачивания твита с сервера
export interface SetTweetLoadingStatusActionInterface extends Action<TweetActionsType> {
    type: TweetActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}
