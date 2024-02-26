import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPenyakit } from "../config/Redux/Action";
import { Button } from "../components/atoms";
import { CiSearch } from "react-icons/ci";

export default function Penyakit() {
  const [penyakits, setPenyakits] = useState([]);
  const [search, setSearch] = useState("");
  const { isUpdate } = useSelector((state) => state.globalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllPenyakit(search).then((res) => {
      setPenyakits(res.data);
    });
  }, [search, isUpdate]);

  const handleDelete = (penyakit) => {
    dispatch({ type: "SET_MODAL", payload: "delete-penyakit" });
    dispatch({ type: "SET_PENYAKIT", payload: penyakit });
  };
  const handleEdit = (penyakit) => {
    dispatch({ type: "SET_MODAL", payload: "update-penyakit" });
    dispatch({ type: "SET_PENYAKIT", payload: penyakit });
  };
  const handleAdd = () => {
    dispatch({ type: "SET_MODAL", payload: "add-penyakit" });
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
            <Button onClick={handleAdd} label="Tambah Data Penyakit" />
          </div>
        </div>
        <table className="w-full text-sm text-left  text-gray-900 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Penyakit
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {penyakits?.map((penyakit, index) => (
              <tr key={penyakit.id} className="odd:bg-white  even:bg-gray-50  border-b ">
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {penyakit.nama_penyakit}
                </th>
                <td className="px-6 py-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(penyakit)}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(penyakit)}
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
