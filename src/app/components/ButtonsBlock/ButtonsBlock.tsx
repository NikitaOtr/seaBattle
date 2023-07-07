import React from 'react';
import s from './ButtonsBlock.module.css';

import { ButtonApp } from './../ButtonApp/ButtonApp';
import { createRandomField } from './../../utils/createRadomField';
import { ICountShips, TField } from '../../types/commonTypes';

interface IProps {
    userName: string
    setIsWelcomingPopup: React.Dispatch<React.SetStateAction<boolean>>
    setUserField: React.Dispatch<React.SetStateAction<TField>>
    setBotField: React.Dispatch<React.SetStateAction<TField>>

    countShips: ICountShips
    setCountShips: React.Dispatch<React.SetStateAction<ICountShips>>

    isPlaying: boolean
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>

    wasPlaying: boolean,
    setWasPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export const ButtonsBlock: React.FC<IProps> = ({ userName, setIsWelcomingPopup, setUserField, setBotField, 
    countShips, setCountShips, isPlaying, setIsPlaying, wasPlaying, setWasPlaying }) => {

    const createNewFields = () => {
        setUserField(createRandomField());
        setBotField(createRandomField());
    };

    const onClickNewGame = () => {
        wasPlaying && createNewFields();
        setIsPlaying(true);
        setWasPlaying(false);
        setCountShips({ bot: 20, player: 20 });
    };

    const onClickChangeField = () => {
        createNewFields();
        setWasPlaying(false);
    };

    const onClickPlus = () => {
        setIsPlaying(prev => !prev);
    };

    const onClickWelcomingPopup = () => {
        setIsWelcomingPopup(true);
    };

    const isDisableButtonPause = () => {
        if (isPlaying) {
            return false;
        } else {
            return !wasPlaying || countShips.bot === 0 || countShips.player === 0;
        }
    };

    return (
        <div className={s.buttonsBlock}>
            <ButtonApp disabled={!userName || isPlaying} onClick={onClickNewGame}>Начать новую игру</ButtonApp>
            <ButtonApp disabled={isDisableButtonPause()} onClick={onClickPlus}>
                {isPlaying ? 'Остановить игру' : 'Продолжить игру'}
            </ButtonApp>
            <ButtonApp disabled={isPlaying} onClick={onClickChangeField}>Изменить расстановку</ButtonApp>
            <ButtonApp disabled={isPlaying} onClick={onClickWelcomingPopup}>Изменить имя</ButtonApp>
        </div>
    );
};