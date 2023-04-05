import React from 'react'
import {useHomeStyles} from '../pages/theme';
import {IconButton} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

interface ImageListProps {
    images: string[];
    classes: ReturnType<typeof useHomeStyles>;
    removeImage?: (url: string) => void;
}

//выводим список изображений формируемого твита, если он есть
export const ImageList: React.FC<ImageListProps> = ({classes,images,removeImage}) => {
    if (!images.length) {
        return null;
    }

    return (
        <div className={classes.imagesList}>
            {images.map((url) => {
                return (
                    <div className={classes.imagesListItem}>
                        {/*формируем кнопку удаления изображения формируемого твита если такое изображение задано */}
                        {removeImage && (
                            <IconButton
                                className={classes.imagesListItemRemove}
                                onClick={(): void => removeImage(url)} 
                            >
                                <ClearIcon style={{fontSize: 15}}/>
                            </IconButton>
                        )}
                        {/*изображение формируемого твита*/}
                        <img key={url} src={url}  alt=""/>
                    </div> 
                )
            })}
        </div>
    )
}