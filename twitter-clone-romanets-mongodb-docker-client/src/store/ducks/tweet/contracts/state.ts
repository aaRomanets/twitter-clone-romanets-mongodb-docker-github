
import { LoadingStatus } from '../../../types';
import { Tweet } from '../../tweets/contracts/state';

//интерфейс полного состояния твита
export interface TweetState {
    //данные твита
    data?: Tweet;  
    //состояние скачивания данных твита с сервера
    LoadingStatus: LoadingStatus; 
}
