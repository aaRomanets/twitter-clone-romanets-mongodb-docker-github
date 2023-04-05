import { call, put, takeEvery } from 'redux-saga/effects';
import { TweetsApi } from '../../../services/api/tweetsApi';
import { LoadingStatus } from '../../types';
import { Tweet } from '../tweets/contracts/state';
import { setTweetData, setTweetLoadingStatus } from './actionCreators';
import { FetchTweetDataActionInterface, TweetActionsType } from './contracts/actionTypes';

//функция реализации запроса на скачивание твита по его идентификатору с сервера
export function* fetchTweetDataRequest({ payload: tweetId }: FetchTweetDataActionInterface):any {
  try {
    //скачиваем твит с сервера по идентификатору tweetId
    const data: Tweet = yield call(TweetsApi.fetchTweetData, tweetId);
    //фиксируем скаченный твит с сервера 
    yield put(setTweetData(data));
  } catch (error) {
    //скачать твит с сервера по идентификатору tweetId не получилось
    yield put(setTweetLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* tweetSaga() {
   //делаем запрос на скачивание твита с сервера по имеющемуся идентификатору
  yield takeEvery(TweetActionsType.FETCH_TWEET_DATA, fetchTweetDataRequest);
}