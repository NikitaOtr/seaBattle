import React from 'react';
import s from './Field.module.css';

import { FieldCell } from './../FieldCell/FieldCell';
import { MarkerField } from './../FieldMarker/FieldMarker';

import { ICountShips, TField, TTurnMove } from '../../types/commonTypes';
import { markupAfterKill } from '../../utils/markupAfterKill';
import { letters, numbers } from './../../assets/commonData';

interface IProps {
    player: string
    isBot: boolean
    turnMove: TTurnMove
    isPlaying: boolean
    setTurnMove: React.Dispatch<React.SetStateAction<TTurnMove>>
    setCountShips: React.Dispatch<React.SetStateAction<ICountShips>>
    setWasPlaying: React.Dispatch<React.SetStateAction<boolean>>
   
    field: TField
    setField: React.Dispatch<React.SetStateAction<TField>>
}

export const Field: React.FC<IProps> = ({ player, isBot, turnMove, isPlaying, setTurnMove, setCountShips,
    setWasPlaying, field, setField }) => {

    // Ход пользователя
    const shot = (field: TField, y: number, x: number) => {
        if (!isPlaying || field[y][x].wasShot || turnMove === 'bot') {
            return;
        }

        const nextField = field.map(row => {
            return row.map(item => {
                return {...item};
            });
        });

        nextField[y][x].wasShot = true;
        let isCasualties = false
        let nextMove: TTurnMove = 'bot';
        
        // Если есть попадание то инициируется проверка на потопление коробя
        // и в следующем ходу ходить будет пользователь
        if (nextField[y][x].value === '#') {
            markupAfterKill(nextField, y, x);
            isCasualties = true;
            nextMove = 'player';
        }
        setWasPlaying(true);
        setCountShips(prev => ({
            player: prev.player,
            bot: prev.bot - (isCasualties ? 1 : 0),
        }));
        setField(nextField);
        setTurnMove(nextMove);
    };

    return (
        <div>
            <h2 className={s.title}>Поле игрока: {player}</h2>
            <div className={s.field}>
                <div className={s.letters}>
                    {letters.map(letter => (
                        <MarkerField key={letter} value={letter}/>
                    ))}
                </div>

                <div className={s.numbers}>
                    {numbers.map(number => (
                        <MarkerField key={number} value={number}/>
                    ))}
                </div>

                <div className={s.map}>
                    {field.map((row, rowIndex) => {
                        return row.map((item, columnIndex) => (
                            <FieldCell key={rowIndex + columnIndex} isBot={isBot} 
                                shot={() => shot(field, rowIndex, columnIndex)} item={item}/>
                        ))
                    })}
                </div>
            </div>
        </div>
    );
};