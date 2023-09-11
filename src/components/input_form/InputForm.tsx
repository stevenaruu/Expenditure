import { IInputForm } from "./InputForm.interfaces"
import Swal from 'sweetalert2'

const InputForm = (props: IInputForm) => {
    const { placeholder, id } = props
    const handleAddMoney = () => {
        Swal.fire({
            title: 'Apakah anda Ingin Menghitung Kewajiban 50%?',
            text: "Membayar Biaya Kost (opsional)",
            icon: 'info',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Gak, dulu deh!',
            confirmButtonText: 'Iya, nih!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Success!',
                    'Kewajiban berhasil dihitung.',
                    'success'
                )
            } else {
                Swal.fire(
                    'Success!',
                    'Kewajiban tidak dihitung.',
                    'success'
                )
            }
        })
    }
    return (
        <>
            <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id={id}
                type="text"
                placeholder={placeholder}
            />
            <button onClick={handleAddMoney} className="shadow appearance-none bg-emerald-600 w-fit px-5 py-2 rounded text-white font-semibold leading-tight focus:shadow-outline">Send</button>
        </>
    )
}

export default InputForm