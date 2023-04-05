import { all } from "@redux-saga/core/effects";
import {tweetsSaga} from './ducks/tweets/sagas';
import {tweetSaga} from './ducks/tweet/sagas';
import {userSaga} from './ducks/user/sagas';

//корневая сага
export default function* rootSaga() {
    yield all([tweetsSaga(),  tweetSaga(), userSaga()])
}