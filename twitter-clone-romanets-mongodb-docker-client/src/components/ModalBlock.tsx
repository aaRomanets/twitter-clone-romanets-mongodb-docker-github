import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

//интерфейс модального окна по регистрации или авторизации пользователя
interface ModalBlockProps {
  title?: string;
  children: React.ReactNode;
  visible?: boolean;
  onClose: () => void;
}

//модальное окно регистрации пользователя, авторизации пользователя или страницы формирования твита авторизованным пользователем
export const ModalBlock: React.FC<ModalBlockProps> = ({
  //название модального окна
  title,            
  //функция закрытия модального окна
  onClose,          
  //флаг видимости модального окна
  visible = false,  
  //компоненты содержимого модального окна
  children          
}: ModalBlockProps): React.ReactElement | null => {
  if (!visible) {
    return null;
  }

  return (
    <Dialog open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
         {/*кнопка закрытия модального окна */}
        <IconButton onClick={onClose} color="secondary" aria-label="close">
          <CloseIcon style={{ fontSize: 26 }} color="secondary" />
        </IconButton>
        {/*Название модального окна */}
        {title}
      </DialogTitle>
       {/*Показываем все компоненты модального окна */}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
