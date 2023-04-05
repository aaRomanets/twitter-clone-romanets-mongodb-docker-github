import {axios} from '../../core/axios';
import {Tweet} from '../../store/ducks/tweets/contracts/state';

interface Response<T> {
  status: string;
  data: T;
}

export const TweetsApi = {
  //запрос на сервер по скачиванию с сервера твитов. Если определен идентификатор авторизованного пользователя то с сервера
  //скачиваются все твиты по авторизованному пользователю, в противном случае с сервера скачиваются абсолютно все твиты
  async fetchTweets(userId?: string): Promise<Tweet[]> {
    const {data} = await axios.get<Response<Tweet[]>>(userId ? `http://localhost:4023/tweets/user/${userId}` : 'http://localhost:4023/tweets');
    return data.data;
  },
  //запрос на сервер по скачиванию с него твита с идентификатором id
  async fetchTweetData(id: string): Promise<Tweet> {
    const {data} = await axios.get<Response<Tweet>>('http://localhost:4023/tweets/'+id);
    return data.data;
  },
  //запрос на сервер на добавление нового твита по авторизованному пользователю
  async addTweet(payload: {text: string; images: string[]}): Promise<Tweet> {
    const {data} = await axios.post<Response<Tweet>>('http://localhost:4023/tweets', payload);
    return data.data;
  },
  //запрос на удаление с сервера твита по его идентификатору
  removeTweet: (id: string): Promise<void> => axios.delete('http://localhost:4023/tweets/' + id),
};