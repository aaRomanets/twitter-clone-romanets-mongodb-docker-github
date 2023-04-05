import {combineReducers} from "redux";
import { tweetsReducer } from "./ducks/tweets/reducer";
import { tweetReducer } from "./ducks/tweet/reducer";
import { userReducer } from "./ducks/user/reducer";

//корневой редюсер
export const rootReducer = combineReducers({
    //редюсер твитов
    tweets: tweetsReducer, 
    //редюсер твита
    tweet: tweetReducer,   
    //редюсер пользователей
    user: userReducer      
}) 