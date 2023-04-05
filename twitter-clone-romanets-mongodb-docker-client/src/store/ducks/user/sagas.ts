import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthApi } from '../../../services/api/authApi';
import {
  //тип статуса формирования данных пользователя
  LoadingStatus 
} from '../../types';
import {
  //функция передачи данных о авторизованном пользователе в редюсер
  setUserData,        
  //функция установки статуса создания данных о пользователях
  setUserLoadingStatus 
} from './actionCreators';
import { 
  //интерфейс по данным авторизации пользователя
  FetchSignInActionInterface, 
  //интерфейс по данным регистрации нового пользователя
  FetchSignUpActionInterface,
  //типы действий с данными по пользователям 
  UserActionsType            
} from './contracts/actionTypes';

//функция запроса на регистрацию нового пользователя
export function* fetchSignUpRequest( { payload }: FetchSignUpActionInterface):any {   
  try {
    //флаг подачи данных о новом регистрируемом пользователе
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    //запрос подачи данных о новом регистрируемом пользователе
    yield call(AuthApi.signUp, payload);
    //флаг говорящий о том что новый пользователь зарегистрировался
    yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    //флаг говорящий о том что новый пользователь не зарегистрировался
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

//функция запроса на авторизацию нового пользователя
export function* fetchSignInRequest( { payload }: FetchSignInActionInterface):any {
  try { 
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    //получаем информацию об авторизованном пользователе по данным на авторизованного пользователя payload
    const {data} = yield call(AuthApi.signIn, payload);
    console.log("data.token");
    console.log(data.token);
    
    //формируем токен авторизованного пользователя
    window.localStorage.setItem('token', data.token);
    //фиксируем данные авторизованного пользователя
    yield put(setUserData(data));
  } catch (error) {
    //авторизация пользователя не удалась
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

//функция запроса на получение данных по авторизованному пользователю если такой пользователь есть
export function* fetchUserDataRequest():any {
  try {
    //статус скачивания информации с сервера об авторизованном пользователе 
    yield put(setUserLoadingStatus(LoadingStatus.LOADING));
    //получаем информацию об авторизованном пользователе
    const {data} = yield call(AuthApi.getMe);  
    if (data !== undefined) 
    {
      //если информация есть об авторизованном пользователе то ее фиксируем
      yield put(setUserData(data.data));
    }
    else
    {
      //если ее нет то выдаем статус ошибочного скачивания информации с сервера
      yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
  } catch (error) {
    //получить данные по авторизованному пользователю вообще не получилось
    yield put(setUserLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* userSaga() {
  //подаем данные о новом регистрируемом пользователе по сагам
  yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
  //подаем данные об авторизируемом пользователе по сагам
  yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
  //запрос на получение данных об авторизованном пользователе по сагам
  yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
}