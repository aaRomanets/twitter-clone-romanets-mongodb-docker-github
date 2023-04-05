import { axios } from '../../core/axios';
//форма данных авторизации пользователя
import { LoginFormProps } from '../../pages/SignIn/components/LoginModal';
//форма данных регистрации пользователя
import { RegisterFormProps } from '../../pages/SignIn/components/RegisterModal';

interface ResponseApi {
    status: string;
    data: any;
}

export const AuthApi = {
    //запрос на сервер по регистрации нового пользователя
    async signIn(postData: LoginFormProps): Promise<ResponseApi> {
        const { data } = await axios.post<ResponseApi>('http://localhost:4023/auth/login', { username: postData.email, password: postData.password });
        return data;
    },
    //запрос на сервер по авторизации пользователя
    async signUp(postData: RegisterFormProps): Promise<ResponseApi> {
        const { data } = await axios.post<ResponseApi>('http://localhost:4023/auth/register', { email: postData.email, username: postData.username, fullname: postData.fullname, password: postData.password, password2: postData.password2 });
        return data;
    },
    //запрос на сервер для получения информации по авторизованному пользователю, если в localStorage
    //есть токен, иначе авторизованного пользователя нет 
    async getMe(): Promise<ResponseApi> {
        const { data } = await axios.get<ResponseApi>('http://localhost:4023/users/me');
        return data;
    },
    //запрос на получение всей информации по пользователю с идентификатором userId включая твиты этого пользователя
    async getUserInfo(userId: string): Promise<ResponseApi> {
        const { data } = await axios.get<ResponseApi>('http://localhost:4023/users/' + userId);
        return data;
    },
};

// @ts-ignore
window.AuthApi = AuthApi;
