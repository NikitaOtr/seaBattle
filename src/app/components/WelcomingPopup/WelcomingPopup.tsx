import React from 'react';
import s from './WelcomingPopup.module.css';

import { ButtonApp } from './../ButtonApp/ButtonApp';
import { isValidUserName } from './../../utils/isValidUserName';

interface IProps {
    userName: string
    setUserName: React.Dispatch<React.SetStateAction<string>>
    setIsWelcomingPopup: React.Dispatch<React.SetStateAction<boolean>>
}

export const WelcomingPopup: React.FC<IProps> = ({ userName, setUserName, setIsWelcomingPopup }) => {
    const [valueInput, setValueInput] = React.useState(userName);
    const [isError, setIsError] = React.useState(false);
    const refInput = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        refInput.current && refInput.current.focus();
    }, []);

    const onClickWrapper = () => {
        setIsWelcomingPopup(false)
    };

    const onClickPopup = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const onClickCloseModal = () => {
        setIsWelcomingPopup(false);
    };

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidUserName(valueInput)) {
            setUserName(valueInput);
            setIsWelcomingPopup(false);
        } else {
            setIsError(true);
        }
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValueInput(value);
        isValidUserName(value) && setIsError(false);
    };

    const onBlurInput = () => {
        isValidUserName(valueInput) ? setIsError(false) : setIsError(true);
    };

    return (
        <div className={s.wrapper} onClick={onClickWrapper}>
            <div className={s.popup} onClick={onClickPopup}>
                <div className={s.closeModal} onClick={onClickCloseModal}></div>

                <h2>Вас приветствует игра:</h2>
                <h2 className={s.title}>"Морской бой"</h2>
                
                <form className={s.form} onSubmit={onSubmitForm} >
                    <label>
                        <p className={s.labelText}>Для продолжения необходимо ввести имя</p>  
                        <input ref={refInput} className={`${s.input} ${isError ? s.inputError : ''}`} value={valueInput}
                            onChange={onChangeInput} onBlur={onBlurInput}/>
                        <div className={isError ? s.active : s.inActive}>
                            <p className={s.error}>Имя должно начинаться большой буквы</p>
                            <p className={s.error}>и иметь не менее 3 символов</p>
                        </div>
                    </label>
                    <ButtonApp>Продолжить</ButtonApp>
                </form>
            </div>
        </div>
    );
};