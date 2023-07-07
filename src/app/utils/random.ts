export const random = {
    // Генерация рандомного числа от min да max включая границы
    getRandomNumber(min: number, max: number) {
        return min + Math.floor((Math.random() * (max - min + 1)));
    },

    // Вернет случайные элемент из аргументов
    getRandomFrom(...args: Array<unknown>) {
        return args[Math.floor(Math.random() * (args.length))];
    },
};