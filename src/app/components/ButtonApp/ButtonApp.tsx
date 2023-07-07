import React from 'react';
import s from './ButtonApp.module.css';

interface IProps {
    children?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

export const ButtonApp: React.FC<IProps> = ({ children, onClick, disabled }) => {
    const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e);
    };

    return (
        <button disabled={disabled} className={s.button} onClick={onClickButton}>
            {children}
        </button>
    );
};