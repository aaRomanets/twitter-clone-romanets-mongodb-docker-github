import {Action} from 'redux';
import { LoginFormProps } from '../../../../pages/SignIn/components/LoginModal';
import { RegisterFormProps } from '../../../../pages/SignIn/components/RegisterModal';
import {LoadingStatus} from '../../../types';
import {User} from './state';

export enum UserActionsType {
    //тип получения данных об авторизированном пользователе
    SET_USER_DATA = 'user/SET_USER_DATA',          
    //тип запроса на авторизацию пользователя
    FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',          
    //тип запроса на сервер о пользователе с токеном (авторизированном пользователе)
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',     
    //тип запроса на сервер по регистрации нового пользователя 
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',         
    //тип на получение статуса формирования данных о пользователе
    SET_LOADING_STATE = 'user/SET_LOADING_STATE',  
    //тип снятия авторизации с пользователя но он есть на сервере
    SIGN_OUT = 'user/SIGN_OUT'                     
}

//этот интерфейс говорит о том что данные о пользователе есть на сервере но нет авторизированого пользователя
export interface SignOutActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SIGN_OUT;
}

//интерфейс запроса по авторизации пользователя
export interface FetchSignInActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_IN;
    payload: LoginFormProps;
}

//интерфейс запроса по регистрации нового пользователя
export interface FetchSignUpActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_UP;
    payload: RegisterFormProps;
}

//интерфейс запроса данных об авторизованном пользователе
export interface FetchUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_USER_DATA;
}

//интефейс получения данных нового авторизованного пользователя
export interface SetUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_DATA;
    payload: User | undefined;
}

//интерфейс статуса формирования данных о пользователе
export interface SetUserLoadingStatusActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}