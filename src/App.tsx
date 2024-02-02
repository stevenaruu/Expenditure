import { useEffect, useState } from "react";
import InputForm from "./components/input_form/InputForm";
import { IExpenditure } from "./interfaces/IExpenditure.interfaces";
import { retriveData } from "./utils/db/service";
import { IData } from "./interfaces/IData.interfaces";

function App() {
  const [kebutuhan, setKebutuhan] = useState(0);
  const [tabungan, setTabungan] = useState(0);
  const [keinginan, setKeinginan] = useState(0);

  const fetchData = async () => {
    try {
      const db: IData[] = await retriveData("expenditures") || [];
      db.forEach((item) => {
        if (item.id === "kebutuhan") setKebutuhan(item.amount);
        if (item.id === "tabungan") setTabungan(item.amount);
        if (item.id === "keinginan") setKeinginan(item.amount);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

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
              kebutuhan={kebutuhan}
              tabungan={tabungan}
              keinginan={keinginan}
              onUpdate={fetchData}
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
                  kebutuhan={kebutuhan}
                  tabungan={tabungan}
                  keinginan={keinginan}
                  onUpdate={fetchData}
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
