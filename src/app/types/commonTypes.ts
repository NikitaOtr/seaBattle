export interface IFieldCell {
    wasShot: boolean
    value: '.' | '#'
}

export type TField = Array<Array<IFieldCell>>

export type TTurnMove = 'player' | 'bot'

export interface ICountShips {
    player: number
    bot: number
}
