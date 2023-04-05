import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { TweetActions } from './actionCreators';
import { TweetActionsType } from './contracts/actionTypes';
import { TweetState } from './contracts/state';

//начальное состояние
const initialTweetState: TweetState = {
  //твита скаченного с сервера нет
  data: undefined,    
  //твит не был скачен с сервера               
  LoadingStatus: LoadingStatus.NEVER 
};

export const tweetReducer = produce((draft: Draft<TweetState>, action: TweetActions) => {
  switch (action.type) {
    //твит скаченный с сервера по заданному идентификатору и помещенный в store, берется из store
    case TweetActionsType.SET_TWEET_DATA:
      draft.data = action.payload;
      //состояние, говорящее о том что твит скачался с сервера
      draft.LoadingStatus = LoadingStatus.LOADED; 
      break;

    //твит скачивается с сервера по заданному идентификатору
    case TweetActionsType.FETCH_TWEET_DATA:
      draft.data = undefined;
      //состояние, говорящее о том что твит скачивается с сервера
      draft.LoadingStatus = LoadingStatus.LOADING;
      break;

    //фиксируем ход процесса скачивания твита по заданному идентификатору с сервера
    case TweetActionsType.SET_LOADING_STATE:
      draft.LoadingStatus = action.payload;
      break;

    default:
      break;
  }
}, initialTweetState);