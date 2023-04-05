import { RootState } from '../../store';
import { UserState } from './contracts/state';

//получаем полные данные о пользователе из ./reducer.ts включая статус их формирования
export const selectUserState = (state: RootState): UserState =>{ return state.user;}

//получаем данные о пользователе
export const selectUserData = (state: RootState): UserState['data'] => selectUserState(state).data;

//получаем логическую информацию есть ли авторизованный пользователь или нет
export const selectIsAuth = (state: RootState): boolean => selectUserState(state).data !== undefined;

//получаем текущий статус формирования данных о пользователе
export const selectUserStatus = (state: RootState): UserState['status'] => selectUserState(state).status;