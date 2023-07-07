import React from 'react';
import s from './FieldCell.module.css';

import { IFieldCell } from '../../types/commonTypes';

interface IProps {
    item: IFieldCell
    isBot: boolean
    shot: () => void
}

export const FieldCell: React.FC<IProps> = ({ item, isBot, shot }) => {
    return (
        <div onClick={() => isBot && shot()} 
             className={`${s.fieldItem} ${isBot ? s.fieldItemBot : ''} 
                         ${!isBot && item.value === '#' ? s.ship : s.notShip}`}> 
            {item.wasShot && <div className={`${item.value === '#' ? s.hit : s.miss}`}></div>}               
        </div>
    );
};