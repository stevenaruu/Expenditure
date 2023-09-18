import InputForm from "./components/input_form/InputForm";
import { selectKebutuhan } from "./features/KebutuhanSlice";
import { selectKeinginan } from "./features/KeinginanSlice";
import { selectTabungan } from "./features/TabunganSlice";
import { IExpenditure } from "./interfaces/IExpenditure.interfaces";
import { useAppSelector } from "./redux/redux";

function App() {
  const kebutuhan = useAppSelector(selectKebutuhan)
  const tabungan = useAppSelector(selectTabungan)
  const keinginan = useAppSelector(selectKeinginan)
  const expenditures: IExpenditure[] = [
    {
      name: "Kebutuhan 50%",
      amount: kebutuhan,
    },
    {
      name: "Tabungan 30%",
      amount: tabungan,
    },
    {
      name: "Keinginan 20%",
      amount: keinginan,
    }
  ]
  return (
    <div className='container mx-auto'>
      <div className="bg-gray-500 p-3 mt-5 rounded shadow-md relative">
        <div className="flex flex-col mb-5">
          <label className="text-white text-sm font-bold mb-2" htmlFor="add-money">
            Tambah Duit
          </label>
          <div className="flex gap-2">
            <InputForm
              id="add-money"
              placeholder="Tambah Duit ..."
              button="Tambah!"
              variant="bg-emerald-600"
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="">
          {expenditures.map((expenditure, index) => (
            <div key={index} className="flex flex-col mb-5">
              <label className="text-gray-700 text-sm font-bold mb-2" htmlFor={expenditure.name}>
                {expenditure.name}
              </label>
              <input
                disabled
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
                id="username"
                type="text"
                value={expenditure.amount.toLocaleString('en-US')}
              />
              <div className="mt-3 flex gap-2">
                <InputForm
                  id={expenditure.name}
                  placeholder={`Kurangi ${expenditure.name.slice(0, -4)} ...`}
                  button="Kurangi!"
                  variant="bg-red-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
