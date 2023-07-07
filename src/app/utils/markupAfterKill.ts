import { TField } from '../types/commonTypes';
import { isInArray } from './isInArray';

// Проверка на потопление одного из кораблей 
// Обход все раненых клеток
const getIsKillShip = (field: TField, y: number, x: number) => {
    const stack = [[y, x]];
    const res = [[y, x]];
    while (stack.length > 0) {
        const [y, x] = stack.pop() as Array<number>;
        for (let localY = y - 1; localY <= y + 1; localY++) {
            for (let localX = x - 1; localX <= x + 1; localX++) {
                // Проверка что бы клетка существовала 
                // Не добавляем в стек если уже были в этой клетке
                // Проверка что бы клетка была частью корабля 
                if (field[localY] && field[localY][localX] && !isInArray(res, [localY, localX]) 
                    && field[localY][localX].value === '#') {
                        // Если клетка подбита добавляем в стек 
                        // Иначе корабль не потоплен
                    if (field[localY][localX].wasShot) {
                        stack.push([localY, localX]);
                        res.push([localY, localX]);
                    } else {
                        return false;
                    }
                }
            }
        }
    }
    return res;
}

//Разметка в случае потопления одного из кораблей 
export const markupAfterKill = (field: TField, y: number, x: number) => {
    // Получает массив клеток потопленного корабля или false
    const isKill = getIsKillShip(field, y, x);
    if (isKill) {
        // Разметка плеток вокруг потопленного корабля
        isKill.forEach(([y, x]) => {
            for (let localY = y - 1; localY <= y + 1; localY++) {
                for (let localX = x - 1; localX <= x + 1; localX++) {
                    if (field[localY] && field[localY][localX]) {
                        field[localY][localX].wasShot = true
                    }
                }
            }
        });
    }
};