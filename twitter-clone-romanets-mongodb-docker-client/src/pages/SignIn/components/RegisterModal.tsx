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
import {  fetchSignUp } from '../../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../../store/ducks/user/selectors';
import { LoadingStatus } from '../../../store/types';

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

//интерфейс данных про нового регистрируемого пользователя
export interface RegisterFormProps {
    fullname: string;
    username: string;
    email: string;
    password: string;
    password2: string;
}

//информациионный шаблон о информации про нового регистрируемого пользователя
const RegisterFormSchema = yup.object().shape({
    fullname: yup.string().required('Enter your name'),
    email: yup.string().email('Invalid email').required('Enter email'),
    username: yup.string().required('Invalid login'),
    password: yup.string().min(6, 'The minimum password length is 6 characters').required(),
    password2: yup.string().oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }): React.ReactElement => {
    //получаем стили верстки
    const classes = useStylesSignIn();
    
    //статус передачи информации о пользователе на сервер
    const loadingStatus = useSelector(selectUserStatus);

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormProps>({
        resolver: yupResolver(RegisterFormSchema)
    });

    const dispatch = useDispatch();
    const onSubmit = async (data: RegisterFormProps) => {
        //делаем запрос на сервер для нового регистрируемого пользователя
        dispatch(fetchSignUp(data));
        //закрываем окно регистрации пользователя
        onClose();
    };

    return  (
        <ModalBlock
            visible={open}
            onClose={onClose}
            title="Создать аккаунт"
        >
            <form 
                //регистрируем пользователя по этой функции кнопкой Регистрация
                onSubmit={handleSubmit(onSubmit)} 
            >
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                    <FormGroup aria-label="position" row>
                        {/*Почта нового регистрируемого пользователя*/}
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field } ) => 
                                <TextField
                                    {...field}
                                    className={classes.registerField} 
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
                        {/*Логин нового регистрируемого пользователя*/}
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field } ) => 
                                <TextField
                                    {...field}
                                    className={classes.registerField} 
                                    id="username"
                                    label="Login"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="filled"
                                    type="text"
                                    helperText={errors.username?.message}
                                    error={!!errors.username}            
                                    fullWidth       
                                />
                            }
                        />
                        {/*Имя нового регистрируемого пользователя*/}
                        <Controller
                            name="fullname"
                            control={control}
                            defaultValue=""
                            render={({ field } ) => 
                                <TextField
                                    {...field}
                                    className={classes.registerField} 
                                    id="fullname"
                                    label="Our name"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="filled"
                                    type="text"
                                    helperText={errors.fullname?.message}
                                    error={!!errors.fullname}            
                                    fullWidth       
                                />
                            }
                        />
                        {/*Пароль нового регистрируемого пользователя*/}
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field } ) => 
                                <TextField
                                    {...field}
                                    className={classes.registerField} 
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
                        {/*Повторение пароля нового регистрируемого пользователя*/}
                        <Controller
                            name="password2"
                            control={control}
                            defaultValue=""
                            render={({ field } ) => 
                                <TextField
                                    {...field}
                                    className={classes.registerField} 
                                    id="password2"
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
                        {/*когда идет подача информации о новом регистрируемом пользователе эта кнопка не активирована */}
                        <Button 
                            disabled={loadingStatus === LoadingStatus.LOADING} 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                        >
                            Registration
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </ModalBlock>
    )
}