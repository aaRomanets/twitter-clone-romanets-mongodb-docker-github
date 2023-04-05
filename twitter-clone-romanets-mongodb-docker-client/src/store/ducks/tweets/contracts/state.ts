import {LoadingStatus} from '../../../types';

//состояние формирования твита на форме
export enum AddFormState {
  //формируется форма твита
  LOADING = 'LOADING', 
  //ошибка в формировании формы твита
  ERROR = 'ERROR',     
  //либо твит сфомирован от данных на форме либо он не формировался
  NEVER = 'NEVER',     
}

//интерфейс твита
export interface Tweet {
  _id: string;
  text: string;
  images?: string[];
  createdAt: string;
  //пользователь, который ввел твит
  user: { 
    fullname: string;
    username: string;
    avatarUrl: string;
  };
}

//интерфейс по данным о твитах включая статус их скачивания
export interface TweetsState {
  //список твитов
  items: Tweet[]; 
  //состояние скачивания твитов с сервера
  loadingState: LoadingStatus;
  //состояние формирования твитов по данным на форме 
  addFormState: AddFormState; 
}