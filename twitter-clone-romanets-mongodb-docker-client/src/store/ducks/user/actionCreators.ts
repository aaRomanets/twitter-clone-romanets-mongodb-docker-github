//форма авторизации пользователя
import { LoginFormProps } from '../../../pages/SignIn/components/LoginModal';
//форма регистрации пользователя
import { RegisterFormProps } from '../../../pages/SignIn/components/RegisterModal';
import { 
  //этот интерфейс говорит о том что данные о пользователе есть на сервере но нет авторизированого пользователя
  SignOutActionInterface,         
  //интерфейс запроса по авторизации пользователя   
  FetchSignInActionInterface,           
  //интерфейс запроса по регистрации нового пользователя
  FetchSignUpActionInterface,           
  //интерфейс запроса данных об авторизованном пользователе
  FetchUserDataActionInterface,         
  //интефейс получения данных нового авторизованного пользователя
  SetUserDataActionInterface,      
  //интерфейс статуса формирования данных о пользователе     
  SetUserLoadingStatusActionInterface, 
  //типы действий с данными о пользователе и статусами их формирования 
  UserActionsType                       
} from './contracts/actionTypes';
import {UserState} from './contracts/state';

//передаем данные о авторизованном пользователе в редюсер
export const setUserData = (payload: UserState['data']): SetUserDataActionInterface => ({
  //метка отправляемая в reducer.ts
  type: UserActionsType.SET_USER_DATA, 
  //данные отправляемые в reducer.ts
  payload, 
});

//снимаем регистрацию с пользователя
export const signOut = (): SignOutActionInterface => ({
  //метка отправляемая в reducer.ts
  type: UserActionsType.SIGN_OUT 
});

//запрос на регистрацию нового пользователя
export const fetchSignUp = (payload: RegisterFormProps): FetchSignUpActionInterface => ({
  //по этому флагу этот запрос передается в sagas.ts
  type: UserActionsType.FETCH_SIGN_UP, 
  payload
});

//запрос на авторизацию уже зарегистрированного пользователя
export const fetchSignIn = (payload: LoginFormProps): FetchSignInActionInterface => ({
  //по этому флагу этот запрос передается в sagas.ts
  type: UserActionsType.FETCH_SIGN_IN,  
  payload,
});

//запрос на получение информации есть ли авторизованный пользователь или нет
export const fetchUserData = (): FetchUserDataActionInterface => ({
  //по этому флагу этот запрос передается в sagas.ts
  type: UserActionsType.FETCH_USER_DATA 
});

//устанавливаем статус создания данных о пользователях
export const setUserLoadingStatus = (payload: UserState['status']): SetUserLoadingStatusActionInterface => ({
  //метка в reducer.ts
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});

//обЪединяем интерфейсы по пользовательским данным
export type UserActions =
  | SetUserDataActionInterface
  | FetchSignInActionInterface
  | SetUserLoadingStatusActionInterface
  | FetchUserDataActionInterface
  | SignOutActionInterface;