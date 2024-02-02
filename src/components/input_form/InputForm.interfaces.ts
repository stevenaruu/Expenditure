export interface IInputForm {
    id: string
    placeholder: string
    button: string
    variant: string
    kebutuhan: number
    tabungan: number
    keinginan: number
    onUpdate: () => void
}