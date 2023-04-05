import React from "react"
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";

export const BackButton: React.FC = (): React.ReactElement => {
    //хук перехода по веб страницам
    const history = useHistory();

    //функция возврата на предыдущую страницу
    const handleClickButton = () => {
        history.goBack();
    }

    return (
        //кнопка возврата на предыдущую страницу
        <IconButton onClick={handleClickButton} style={{marginRight: 20}} color="primary">
            <ArrowBackIcon/>
        </IconButton>
    )
}