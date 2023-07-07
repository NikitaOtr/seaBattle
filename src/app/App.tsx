import React from 'react';
import s from './App.module.css';

import { Field } from './components/Field/Field';
import { WelcomingPopup } from './components/WelcomingPopup/WelcomingPopup';
import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import { GameInformation } from './components/GameInformation/GameInformation';

import { ICountShips, TField, TTurnMove } from './types/commonTypes';
import { createRandomField } from './utils/createRadomField';
import { createTurnBot } from './utils/createTurnBot';
import { markupAfterKill } from './utils/markupAfterKill';

export const App = () => {
    const [isWelcomingPopup, setIsWelcomingPopup] = React.useState(true);

    const [userName, setUserName] = React.useState('');

    const [isPlaying, setIsPlaying] = React.useState(false);

    //Флаг если смыл продолжать предыдущую игру
    const [wasPlaying, setWasPlaying] = React.useState(false);

    // Количество целых клеток у оппонентов 
    const [countShips, setCountShips] = React.useState<ICountShips>({player: 20, bot: 20});

    const [turnMove, setTurnMove] = React.useState<TTurnMove>('player')

    const [userField, setUserField] = React.useState<TField>(createRandomField);
    const [botField, setBotField] = React.useState<TField>(createRandomField);

    React.useEffect(() => {
        if (countShips.bot === 0 || countShips.player === 0) {
            setIsPlaying(false);
        }
    }, [countShips]);

    React.useEffect(() => {
        // Ход бота
        if (turnMove === 'bot') {
            const nextField = userField.map(row => {
                return row.map(item => {
                    return {...item};
                });
            });
            
            const [y, x] = createTurnBot(nextField);
            nextField[y][x].wasShot = true;
            let nextMove: TTurnMove = 'player';
            let isCasualties = false
            // Если есть попадание то инициируется проверка на потопление коробя
            // и в следующем ходу ходить будет бот 
            if (nextField[y][x].value === '#') {
                markupAfterKill(nextField, y, x);
                nextMove = 'bot';
                isCasualties= true;
            }

            setTimeout(() => {
                // Отнимаем жизни у пользователя в случае попадания бота
                setCountShips(prev => ({
                        bot: prev.bot,
                        player: prev.player - (isCasualties ? 1 : 0),
                }));
                setUserField(nextField);
                setTurnMove(nextMove);
            }, 500)
        }
    }, [turnMove, userField])

    return (
        <div className={s.app}>
            <h1 className={s.title}>Морской бой</h1>
            {isWelcomingPopup && 
                <WelcomingPopup setUserName={setUserName} userName={userName} 
                    setIsWelcomingPopup={setIsWelcomingPopup}/>
            }
            <section className={s.appContent}>
                <Field field={userField} setField={setUserField} player={userName} isBot={false}
                    setTurnMove={setTurnMove} turnMove={turnMove} isPlaying={isPlaying} setCountShips={setCountShips}
                    setWasPlaying={setWasPlaying}/> 
                <div className={s.info}>
                    <GameInformation isPlaying={isPlaying} turnMove={turnMove} userName={userName} 
                        countShips={countShips} wasPlaying={wasPlaying}/>
                    <ButtonsBlock setIsWelcomingPopup={setIsWelcomingPopup} setUserField={setUserField}
                        setBotField={setBotField} setIsPlaying={setIsPlaying} isPlaying={isPlaying}
                        wasPlaying={wasPlaying} setWasPlaying={setWasPlaying} setCountShips={setCountShips} 
                        countShips={countShips} userName={userName}/>
                </div>
                <Field field={botField} setField={setBotField} player='Бот' isBot={true}
                    setTurnMove={setTurnMove} turnMove={turnMove} isPlaying={isPlaying} setCountShips={setCountShips}
                    setWasPlaying={setWasPlaying}/>
            </section>
        </div>
    );
};