import {LoadingStatus} from '../../../types';

//интерфейс по самим данным о пользователе
export interface User {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  website?: string;
}

//интерфейс по данным о пользователе включая статус их формирования
export interface UserState {
  //данные по пользователю
  data: User | undefined; 
  //статус формирования данных по пользователю
  status: LoadingStatus;  
}