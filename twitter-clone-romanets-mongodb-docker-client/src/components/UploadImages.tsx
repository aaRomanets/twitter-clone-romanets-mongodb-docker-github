import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

import { useHomeStyles } from '../pages/theme';
import { ImageList } from './ImageList';

import {ImageObj} from './AddTweetForm';

interface UploadImageProps {
    images: ImageObj[];
    onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

export const UploadImages: React.FC<UploadImageProps> = ({images, onChangeImages}) => {
    const classes = useHomeStyles();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    //удаляем изображение с именем url из списка изображений 
    //we removing image with name url from list images
    const removeImage = (url: string) => {
        onChangeImages(prev => prev.filter((obj) => obj.blobUrl !== url));
    }

    const handleChangeFileInput = React.useCallback ((event: Event) => {
        if (event.target) {
            const target = (event.target as HTMLInputElement);
            const file = target.files?.[0];
            if (file) {
                const fileObj = new Blob([file]);
                onChangeImages(prev => [...prev, { 
                    blobUrl: URL.createObjectURL(fileObj),
                    file 
                }])
            }
        }   
    },[onChangeImages]);

    //вызываем функцию формирования списка изображений твита
    //calling the function of formation the list of images tweet
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleChangeFileInput)
        }
    }, [handleChangeFileInput, inputRef])

    return (
        <div>
            {/*Иллюстрация списка изображений формируемого твита*/}
            {/*Illustration of the list of images of the generated tweet*/}
            <ImageList images={images.map(obj => obj.blobUrl)} classes={classes} removeImage={removeImage}/>
            {/*кнопка открывания диалогового окна Windows*/}
            {/*the button for opening the dialog box Windows*/} 
            <IconButton onClick={handleClickImage} color="primary">
                <ImageOutlinedIcon style={{fontSize: 26}}/>
            </IconButton>
            <input ref={inputRef} type="file" id = "upload-input" hidden/>
        </div>
    )
}