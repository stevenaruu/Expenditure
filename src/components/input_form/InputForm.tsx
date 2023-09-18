import React, { useState } from "react"
import { IInputForm } from "./InputForm.interfaces"
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux"
import { KURANGI_KEBUTUHAN, TAMBAH_KEBUTUHAN } from '../../features/KebutuhanSlice'
import { KURANGI_KEINGINAN, TAMBAH_KEINGINAN } from '../../features/KeinginanSlice'
import { KURANGI_TABUNGAN, TAMBAH_TABUNGAN } from '../../features/TabunganSlice'

const InputForm = (props: IInputForm) => {
    const dispatch = useDispatch()
    const { placeholder, id, button, variant } = props
    const [money, setMoney] = useState("")
    const handleAddMoney = () => {
        if (!isNaN(parseFloat(money))) {
            if (button === "Tambah!") {
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
                        const kebutuhan = totalMoney * 0.5;
                        const tabungan = totalMoney * 0.3;
                        const keinginan = totalMoney * 0.2;
                        dispatch(TAMBAH_KEBUTUHAN(kebutuhan))
                        dispatch(TAMBAH_TABUNGAN(tabungan))
                        dispatch(TAMBAH_KEINGINAN(keinginan))
                        Swal.fire(
                            'Success!',
                            'Kewajiban berhasil dihitung.',
                            'success'
                        )
                    } else {
                        const totalMoney = (parseFloat(money));
                        const kebutuhan = totalMoney * 0.5;
                        const tabungan = totalMoney * 0.3;
                        const keinginan = totalMoney * 0.2;
                        dispatch(TAMBAH_KEBUTUHAN(kebutuhan))
                        dispatch(TAMBAH_TABUNGAN(tabungan))
                        dispatch(TAMBAH_KEINGINAN(keinginan))
                        Swal.fire(
                            'Success!',
                            'Kewajiban tidak dihitung.',
                            'success'
                        )
                    }
                })
            } else {
                const totalMoney = (parseFloat(money));
                if(id.slice(0, -4) === "Kebutuhan") dispatch(KURANGI_KEBUTUHAN(totalMoney));
                else if(id.slice(0, -4) === "Tabungan") dispatch(KURANGI_TABUNGAN(totalMoney));
                else if(id.slice(0, -4) === "Keinginan") dispatch(KURANGI_KEINGINAN(totalMoney));
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