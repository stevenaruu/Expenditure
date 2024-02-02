import React, { useState } from "react"
import { IInputForm } from "./InputForm.interfaces"
import Swal from 'sweetalert2'
import { updateData } from "../../utils/db/service"

const InputForm = (props: IInputForm) => {
    const { placeholder, id, button, variant, kebutuhan, tabungan, keinginan, onUpdate } = props
    const [money, setMoney] = useState("")
    const handleAddMoney = () => {
        if (!isNaN(parseFloat(money))) {
            if (button === "Tambah!") {
                const increment = async (id: string, value: number) => {
                    await updateData("expenditures", id, value)
                    onUpdate && onUpdate();
                }

                Swal.fire({
                    title: 'Apakah anda Ingin Menghitung Kewajiban',
                    text: "Masukkan total kewajiban (Opsional)",
                    input: 'number',
                    inputPlaceholder: 'Masukkan total kewajiban ...',
                    icon: 'info',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',
                    cancelButtonText: 'Gak, dulu deh!',
                    confirmButtonText: 'Iya, nih!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const totalMoney = parseFloat(money) - result.value;
                        increment("kebutuhan", (totalMoney * 0.5) + kebutuhan);
                        increment("tabungan", (totalMoney * 0.3) + tabungan);
                        increment("keinginan", (totalMoney * 0.2) + keinginan);
                        Swal.fire({
                            title: 'Success!',
                            html: 'Kewajiban berhasil dihitung<br><br>Kebutuhan: ' + (totalMoney * 0.5) + '<br>Tabungan: ' + (totalMoney * 0.3) + '<br>Keinginan: ' + (totalMoney * 0.2),
                            icon: 'success'
                        })
                    } else {
                        const totalMoney = (parseFloat(money));
                        increment("kebutuhan", (totalMoney * 0.5) + kebutuhan);
                        increment("tabungan", (totalMoney * 0.3) + tabungan);
                        increment("keinginan", (totalMoney * 0.2) + keinginan);
                        Swal.fire({
                            title: 'Success!',
                            html: 'Kewajiban tidak dihitung<br><br>Kebutuhan: ' + (totalMoney * 0.5) + '<br>Tabungan: ' + (totalMoney * 0.3) + '<br>Keinginan: ' + (totalMoney * 0.2),
                            icon: 'success'
                        })
                    }
                })
            } else {
                const totalMoney = (parseFloat(money));
                const decrement = async (id: string, value: number) => {
                    await updateData("expenditures", id, value)
                    onUpdate && onUpdate();
                }

                if(id.slice(0, -4) === "Kebutuhan") decrement("kebutuhan", kebutuhan - totalMoney);
                if(id.slice(0, -4) === "Tabungan") decrement("tabungan", tabungan - totalMoney);
                if(id.slice(0, -4) === "Keinginan") decrement("keinginan", keinginan - totalMoney);
            }
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddMoney()
        }
    }
    return (
        <>
            <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id={id}
                type="number"
                placeholder={placeholder}
                onChange={(e) => { setMoney(e.target.value) }}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleAddMoney} className={`${variant} shadow appearance-none w-fit px-5 py-2 rounded text-white font-semibold leading-tight focus:shadow-outline`}>{button}</button>
        </>
    )
}

export default InputForm