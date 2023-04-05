
import {RootState} from "../../store";
import { Tweet } from '../tweets/contracts/state';
import {LoadingStatus} from '../../types';
import { TweetState} from "./contracts/state";

//берем из reducer скаченный твит по заданному идентификатору
export const selectTweet = (state: RootState): TweetState => state.tweet;

//отслеживаем по reducer процесс скачивания твита по заданному идентификатору
export const selectLoadingState = (state: RootState): LoadingStatus => 
    selectTweet(state).LoadingStatus;

//проверяем по reducer скачивается ли твит по заданному идентификатору 
export const selectIsTweetLoading = (state: RootState): boolean => 
    selectLoadingState(state) === LoadingStatus.LOADING;

//берем из reducer по store данные скаченного твита с сервера по заданному идентификатору если такой твит есть 
export const selectTweetData = (state: RootState): Tweet | undefined => 
    selectTweet(state).data;