import React from 'react';
import classNames from 'classnames';
import Avatar from "@material-ui/core/Avatar";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { useHomeStyles } from "../pages/theme";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTweet, setAddFormState } from '../store/ducks/tweets/actionCreators';
import { selectAddFormState } from '../store/ducks/tweets/selectors';
import { AddFormState } from '../store/ducks/tweets/contracts/state';
import { UploadImages } from './UploadImages';
import { uploadImage } from '../utils/uploadImage';

interface AddTweetFormProps {
    classes: ReturnType<typeof useHomeStyles>;
    maxRows?: number;
}

//максимальная длина текста в твите
const MAX_LENGTH = 280;

//интерфейс данных по изображению
export interface ImageObj {
    blobUrl: string;
    file: File;
}

export const AddTweetForm: React.FC<AddTweetFormProps> = ({
    classes,
    maxRows
}: AddTweetFormProps): React.ReactElement => {
    const dispatch = useDispatch();
    //текст формируемого твита (максимальные размер текста твита 280 символов)
    const [text, setText] = React.useState<string>('');
    //изображения формируемого твита, если они загружены 
    const [images, setImages] = React.useState<ImageObj[]>([]);

    //состояние процесса формирования твита по данным формы
    const addFormState = useSelector(selectAddFormState);

    //какой процент символов текста уже введен по отношению 
    //к максимальному числу символов, которое можно ввести для текста формируемого твита
    const textLimitPercent = (text.length / 280) * 100; 
    //сколько символов текста формируемого твита еще можно ввести
    const textCount = MAX_LENGTH - text.length;

    const handleChangeTextArea = (e: React.FormEvent<HTMLTextAreaElement>): void => {
        if (e.currentTarget) {
            //фиксируем текст твита
            setText(e.currentTarget.value)
        }
    }

    const handleClickAddTweet = async (): Promise<void> => {
        let result = [];
        
        //твит формируется по данным формы
        dispatch(setAddFormState(AddFormState.LOADING))
        
        //фиксируем изображения твита
        for (let i = 0; i < images.length; i++) {
            const file = images[i].file;
            //помещаем изображение в cloudinary через сервер
            const {url} = await uploadImage(file);
            result.push(url);
        }
        
        //делаем запрос на добавление твита по его тексту и изображениям
        dispatch(fetchAddTweet({ text, images: result }));
        
        //после проведения указанного запроса поле текста твита обнуляем
        setText('');
        
        //после проведения указанного запроса список изображений твита очищаем
        setImages([]);
    };

    return (
        <div>
            <div className={classes.addFormBody}>
                {/*Аватарка пользователя*/}
                <Avatar
                    className={classes.tweetAvatar}
                    alt={'User avatar UserAvatar'} 
                />
                {/*Поле набора текста твита */}
                <TextareaAutosize
                    onChange={handleChangeTextArea}
                    className={classes.addFormTextarea}
                    placeholder="What is going on?" 
                    value={text}
                    rowsMax={maxRows}
                />
            </div>
            <div className={classes.addFormBottom}>
                <div className={classNames(classes.tweetFooter, classes.addFormBottomActions)}>
                    {/*Загрузка и формирование изображений для твита*/}
                    <UploadImages images={images} onChangeImages={setImages} />
                </div>
                <div className={classes.addFormBottomRight}>
                    {text && (
                        <>
                            {/*Эта диаграмма говорит о том, сколько еще символов можно включить в текст для твита*/}
                            <span>{textCount}</span>
                            <div className={classes.addFormCircleProgress}>
                                <CircularProgress 
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={text.length >= MAX_LENGTH ? 100 : textLimitPercent}
                                    style={text.length >= MAX_LENGTH ? {color: 'red'} : undefined}
                                />
                                <CircularProgress 
                                    style={{color: 'rgba(0,0,0,0.1)'}}
                                    variant="static"
                                    size={20}
                                    thickness={5}
                                    value={100}
                                />
                            </div>
                        </>
                    )}
                    {/*Кнопка формирования твита */}
                    <Button
                        onClick={handleClickAddTweet}
                        disabled={addFormState === AddFormState.LOADING || !text || text.length >= MAX_LENGTH}
                        color="primary"
                        variant="contained"
                    > 
                        {/*Если данные для твита формирования твита готовы, то авторизованный пользователь может сформировать твит */}
                        {addFormState === AddFormState.LOADING ? (
                            <CircularProgress color="inherit" size={16}/> 
                        ) : ( 
                            'Tweet'
                        )}
                    </Button>
                </div>
            </div> 
            { 
                addFormState === AddFormState.ERROR && (
                <Alert severity="error">
                    Error when adding a tweet{' '}
                    <span aria-label="emoji-plak" role="img">
                        😞
                    </span>
                </Alert>      
            )}
        </div>
    )
}