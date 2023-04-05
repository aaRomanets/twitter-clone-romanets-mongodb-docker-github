import produce, { Draft } from 'immer';
import {LoadingStatus} from '../../types';
import {  UserActions } from './actionCreators';
import {UserActionsType} from './contracts/actionTypes';
import {UserState} from './contracts/state';

const initialUserState: UserState = {
  //вначале нет данных о пользователях
  data: undefined,           
  //вначале нет никаких действий с данными о пользователях    
  status: LoadingStatus.NEVER   
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {
  switch (action.type) {
    case UserActionsType.SET_USER_DATA:
      //получаем данные о пользователе (будем получать из ./selectors.ts)
      draft.data = action.payload;           
      //данные о пользователе успешно получены (узнаем про этот статус из ./selectors.ts)
      draft.status = LoadingStatus.SUCCESS;   
      break;

    case UserActionsType.SET_LOADING_STATE:
      //статус формирования данных о пользователе (узнаем про этот статус из ./selectors.ts)
      draft.status = action.payload;          
      break;

    case UserActionsType.SIGN_OUT:
      //данные о некотором пользователе сформированы (узнаем про этот статус из ./selectors.ts)
      draft.status = LoadingStatus.LOADED; 
      //данные про авторизованного пользователя стерты
      draft.data = undefined;              
      break;

    default:
      break;
  }
}, initialUserState);
