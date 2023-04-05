import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useStylesSignIn } from '..';
import { ModalBlock } from '../../../components/ModalBlock';
import { fetchSignIn, setUserLoadingStatus } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

//интерфейс данных про авторизируемого пользователя
export interface LoginFormProps {
    email: string;
    password: string;
}

//информациионный шаблон о информации про авторизируемого пользователя
const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Enter email'),
    password: yup.string().min(6, '​The minimum password length is 6 characters').required(),
});

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }): React.ReactElement => {
    //получаем стили верстки
    const classes = useStylesSignIn();

    //статус подачи информации об авторизируемом пользователе
    const loadingStatus = useSelector(selectUserStatus);

    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({
        resolver: yupResolver(LoginFormSchema)
    });

    const dispatch = useDispatch();
    const onSubmit = async (data: LoginFormProps) => {
        //начинаем процесс авторизации выбранного зарегистрированного пользователя
        setUserLoadingStatus(LoadingStatus.LOADING);

        //делаем запрос на сервер по авторизации пользователя
        dispatch(fetchSignIn(data));
        //закрываем диалог авторизации пользователя
        onClose();
    };

    return (
        <ModalBlock
            visible={open}
            onClose={onClose}
            title="Log in to your account"
        >
            <form 
                //авторизируем пользователя по этой функции кнопкой Авторизация
                onSubmit={handleSubmit(onSubmit)}  
            >
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                    <FormGroup aria-label="position" row>
                        {/*Почта авторизируемого пользователя */}
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field } ) => 
                                <TextField
                                    {...field}
                                    className={classes.loginSideField} 
                                    id="email"
                                    label="E-Mail"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    type="email"
                                    helperText={errors.email?.message}
                                    error={!!errors.email}            
                                    fullWidth    
                                    autoFocus   
                                />
                            }
                        />
                        {/*Пароль авторизируемого пользователя */}
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field } ) => 
                                <TextField
                                    {...field}
                                    className={classes.loginSideField} 
                                    id="password"
                                    label="Password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    type="password"
                                    helperText={errors.password?.message}
                                    error={!!errors.password}            
                                    fullWidth       
                                />
                            }
                        />
                        {/*когда идет подача информации об авторизируемом пользователе эта кнопка не активирована */}
                        <Button 
                            disabled={loadingStatus === LoadingStatus.LOADING} 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                        >
                            Enter
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </ModalBlock>
    )
}