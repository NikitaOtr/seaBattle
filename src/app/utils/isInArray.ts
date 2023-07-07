// Проверка есть ли в массиве необходимый элемент
export const isInArray = (array: Array<Array<number>>, item: Array<number>) => {
    return array.some(([y, x]) => y === item[0] && x === item[1]);
};