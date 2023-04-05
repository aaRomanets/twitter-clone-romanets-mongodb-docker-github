import axios from 'axios';

//шаблон получаемых данных по файлу c cloudinary
interface UploadImageReturnProps {
    height: number;
    size: number;
    url: string;
    width: number;
}

//запрос на формирование образа изображения формируемого твита в cloudinary
export const uploadImage = async (image: File): Promise<UploadImageReturnProps> => {
    const formData = new FormData();
    formData.append('image', image);  

    //получаем данные по файлу с cloudinary при входных данных по файлу formData
    const { data } = await axios.post('http://localhost:4023/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}