import { TField } from '../types/commonTypes';
import { random } from './random';

// Генерация рандомного хода Бота
export const createTurnBot = (field: TField) => {
    let y;
    let x;
    do {
        y = random.getRandomNumber(0, 9);
        x = random.getRandomNumber(0, 9);
    } while (field[y][x].wasShot)

    return [y,x];
}
