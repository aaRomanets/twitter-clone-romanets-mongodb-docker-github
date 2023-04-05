import { call, put, takeLatest } from 'redux-saga/effects';
import { TweetsApi } from '../../../services/api/tweetsApi';
import { 
  addTweet,  
  setAddFormState,  
  setTweets, 
  setTweetsLoadingState 
} from './actionCreators';
import {LoadingStatus} from '../../types';
import { FetchAddTweetActionInterface, RemoveTweetActionInterface, TweetsActionsType} from './contracts/actionTypes';
import { AddFormState } from './contracts/state';

//функция реализации запроса на скачивание либо всех твитов либо твитов,
//которые имеют отношение к авторизованному пользователю
export function* fetchTweetsRequest():any {
  try {
    const pathname = window.location.pathname;
    //идентификатор авторизованного пользователя, если его можно определить по pathname, в противном случае идентификатора нет
    const userId = pathname.includes('/user') ? pathname.split('/').pop() : undefined;
    //либо скачиваем все твиты, либо твиты, которые относятся к авторизованному пользователю 
    const items = yield call(TweetsApi.fetchTweets, userId);
    //фиксируем скаченные твиты
    yield put(setTweets(items));
  } catch (error) {
    //скачать твиты не удалось
    yield put(setTweetsLoadingState(LoadingStatus.ERROR));
  }
}

//функция реализации запроса на формирование нового твита по авторизованному пользователю
export function* fetchAddTweetRequest({payload}: FetchAddTweetActionInterface):any {
  try {
    //формируем новый твит item по авторизованному пользователю 
    const item = yield call(TweetsApi.addTweet, payload);
    //фиксируем новый сформированный твит item по авторизованному пользователю
    yield put(addTweet(item));
  } catch (error) {
    //сформировать новый твит по авторизованному пользователю не получилось
    yield put(setAddFormState(AddFormState.ERROR));
  }
}

//функция реализации запроса по удаление твита по его идентификатору с сервера
export function* fetchRemoveTweetRequest({payload}: RemoveTweetActionInterface):any {
  try {
    //удаляем твит по его идентификатору payload c сервера
    yield call(TweetsApi.removeTweet, payload);
  } catch (error) {
    //удалить твит не удалось
    alert('The error at removing tweet')
  }
}

export function* tweetsSaga() {
  //делаем запрос на скачивание твитов с сервера
  yield takeLatest(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  //делаем запрос на формирование нового твита по авторизованному пользователю
  yield takeLatest(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
  //делаем запрос на удаление твита по его идентификатору
  yield takeLatest(TweetsActionsType.REMOVE_TWEET, fetchRemoveTweetRequest);
}
