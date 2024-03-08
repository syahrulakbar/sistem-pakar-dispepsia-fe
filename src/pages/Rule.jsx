import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGejala, getAllPenyakit, getAllRule } from "../config/Redux/Action";
import { Button } from "../components/atoms";
import { CiSearch } from "react-icons/ci";

export default function Rule() {
  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState("");
  const { isUpdate } = useSelector((state) => state.globalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllRule(search).then((res) => {
      setRules(res.data);
    });
    getAllPenyakit().then((res) => {
      dispatch({ type: "SET_PENYAKITS", payload: res.data });
    });
    getAllGejala().then((res) => {
      dispatch({ type: "SET_GEJALAS", payload: res.data });
    });
  }, [search, isUpdate, dispatch]);

  const handleDelete = (rule) => {
    dispatch({ type: "SET_MODAL", payload: "delete-rule" });
    dispatch({ type: "SET_RULE", payload: rule });
  };
  const handleEdit = (rule) => {
    dispatch({ type: "SET_MODAL", payload: "update-rule" });
    dispatch({ type: "SET_RULE", payload: rule });
    dispatch({ type: "SET_RULES", payload: rules });
  };
  const handleAdd = () => {
    dispatch({ type: "SET_RULES", payload: rules });
    dispatch({ type: "SET_MODAL", payload: "add-rule" });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="w-full flex flex-col xl:flex-row justify-between items-center p-5 gap-5">
          <div className="relative h-10 w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
              <CiSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by nama penyakit"
              onChange={(e) => setSearch(e.target.value)}
              className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full xl:w-1/3 h-10 p-2 rounded-lg pl-8 focus:border-sky-400 border-slate-300`}
            />
          </div>
          <div className="w-full xl:w-[30%]">
            <Button onClick={handleAdd} label="Tambah Data Rule" />
          </div>
        </div>
        <table className="w-full text-sm text-left  text-gray-900 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Id Rule
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Penyakit
              </th>
              <th scope="col" className="px-6 py-3">
                Data Gejala
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rules?.map((rule) => (
              <tr key={rule.id} className="odd:bg-white  even:bg-gray-50  border-b ">
                <td className="px-6 py-4 text-center">{rule.id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {rule.penyakit?.nama_penyakit}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {rule.gejalas?.map((gejala) => gejala.nama_gejala).join(", ")}
                </th>
                <td className="px-6 py-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(rule)}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(rule)}
                    className="font-medium text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
