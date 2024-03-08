import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGejala } from "../config/Redux/Action";
import { Button } from "../components/atoms";
import { CiSearch } from "react-icons/ci";

export default function Gejala() {
  const [gejalas, setGejalas] = useState([]);
  const [search, setSearch] = useState("");
  const { isUpdate } = useSelector((state) => state.globalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllGejala(search).then((res) => {
      setGejalas(res.data);
    });
  }, [search, isUpdate]);

  const handleDelete = (gejala) => {
    dispatch({ type: "SET_MODAL", payload: "delete-gejala" });
    dispatch({ type: "SET_GEJALA", payload: gejala });
  };
  const handleEdit = (gejala) => {
    dispatch({ type: "SET_MODAL", payload: "update-gejala" });
    dispatch({ type: "SET_GEJALA", payload: gejala });
    dispatch({ type: "SET_GEJALAS", payload: gejalas });
  };
  const handleAdd = () => {
    dispatch({ type: "SET_GEJALAS", payload: gejalas });
    dispatch({ type: "SET_MODAL", payload: "add-gejala" });
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
              placeholder="Search by nama gejala"
              onChange={(e) => setSearch(e.target.value)}
              className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full xl:w-1/3 h-10 p-2 rounded-lg pl-8 focus:border-sky-400 border-slate-300`}
            />
          </div>
          <div className="w-full xl:w-[30%]">
            <Button onClick={handleAdd} label="Tambah Data Gejala" />
          </div>
        </div>
        <table className="w-full text-sm text-left  text-gray-900 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Id Gejala
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Gejala
              </th>
              <th scope="col" className="px-6 py-3">
                Pertanyaan
              </th>
              <th scope="col" className="px-6 py-3">
                Ya Tanya
              </th>
              <th scope="col" className="px-6 py-3">
                Tidak Tanya
              </th>
              <th scope="col" className="px-6 py-3">
                Mulai
              </th>
              <th scope="col" className="px-6 py-3">
                Selesai
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {gejalas?.map((gejala) => (
              <tr key={gejala.id} className="odd:bg-white  even:bg-gray-50  border-b ">
                <td className="px-6 py-4 text-center">{gejala.id}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {gejala.nama_gejala}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {gejala.pertanyaan}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {gejala.ya_tanya || "-"}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {gejala.tidak_tanya || "-"}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {gejala.mulai ? "Ya" : "Tidak"}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {gejala.selesai ? "Ya" : "Tidak"}
                </th>
                <td className="px-6 py-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(gejala)}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(gejala)}
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
