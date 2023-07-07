import { random } from './random';
import { TField } from '../types/commonTypes';

// Проверка можно ли на это клетку установить корабль или часть корабля
// Проверяет все клетки вокруг на пустоту 
const getIsInsertCell = (field: TField, y: number, x: number) => {
    let isCatInsert = true;
    for(let localY = y - 1; localY <= y + 1; localY++) {
        for(let localX = x - 1; localX <= x + 1; localX++) {
            if (field[localY] && field[localY][localX]) {
                isCatInsert = isCatInsert && field[localY][localX]?.value === '.';
            }
        }
    }
    return isCatInsert;
}

//Генерация рандомного поля
export const createRandomField = () => {
    const field: TField = Array(10).fill('').map(() => {
        return Array(10).fill('').map(() => ({
            wasShot: false,
            value: '.',
        }));
    });
    
    for (let size = 4; size >= 1; size--) {
        for (let count = 1; count <= (5 - size); count++) {
            //Генерация расположения(вертикально, горизонтально)
            const direction = random.getRandomFrom('row', 'column');

            if (direction === 'row') {
                let x = 0;
                let y = 0;
                let isCanInsert = false;
                while (!isCanInsert) {
                    //Генерация начальной позиции корабля
                    y = random.getRandomNumber(0, 9);
                    x = random.getRandomNumber(0, (9 - size + 1));
                    isCanInsert = true;

                    //Проверка все клеток на то что на них можно установить корабль
                    for (let localX = x; localX < x + size; localX++) {
                        isCanInsert = isCanInsert && getIsInsertCell(field, y, localX);
                    }
                }

                //Разметка корабля на поле
                for (let localX = x; localX < x + size; localX++) {
                    field[y][localX].value = '#';
                }
            } else if (direction === 'column') {
                let x = 0;
                let y = 0;
                let isCanInsert = false;
                while (!isCanInsert) {
                    //Генерация начальной позиции корабля
                    y = random.getRandomNumber(0, (9 - size + 1));
                    x = random.getRandomNumber(0, 9);
                    isCanInsert = true;

                    //Проверка все клеток на то что на них можно установить корабль
                    for (let localY = y; localY < y + size; localY++) {
                        isCanInsert = isCanInsert && getIsInsertCell(field, localY, x);
                    }
                }

                //Разметка корабля на поле
                for (let localY = y; localY < y + size; localY++) {
                    field[localY][x].value = '#';
                }
            }
        }
    }

    return field;
};