import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { TweetsState } from './ducks/tweets/contracts/state';

//импортируем корневой редюсер
import {rootReducer} from './rootReducer'
//импортируем корневую сагу;
import rootSaga from './saga';           
import { TweetState } from './ducks/tweet/contracts/state';
import { UserState } from './ducks/user/contracts/state';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware()

//корневое состояние данных
export interface RootState {
    tweets: TweetsState;
    tweet: TweetState;
    user: UserState;
}

//загружаем редюсеры, которые в корневом редюсере rootReducer
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

//загружаем корневую сагу
sagaMiddleware.run(rootSaga);