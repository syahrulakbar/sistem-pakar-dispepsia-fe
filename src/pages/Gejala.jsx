import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getAllAccount } from "../config/Redux/Action";
import { Button } from "../components/atoms";
import { CiSearch } from "react-icons/ci";

export default function Gejala() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const { isUpdate } = useSelector((state) => state.globalReducer);

  const dispatch = useDispatch();
  const userId = Cookies.get("userId");

  useEffect(() => {
    getAllAccount(search).then((res) => {
      setUsers(res.data);
    });
  }, [search, isUpdate]);

  const handleDelete = (user) => {
    if (user.id === userId) {
      return toast.error("You can't delete your own account");
    }
    dispatch({ type: "SET_MODAL", payload: "delete-user" });
    dispatch({ type: "SET_USER", payload: user });
  };
  const handleEdit = (user) => {
    dispatch({ type: "SET_MODAL", payload: "update-user" });
    dispatch({ type: "SET_USER", payload: user });
  };
  const handleAdd = () => {
    dispatch({ type: "SET_MODAL", payload: "add-user" });
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
              placeholder="Search by name, email"
              onChange={(e) => setSearch(e.target.value)}
              className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full xl:w-1/3 h-10 p-2 rounded-lg pl-8 focus:border-sky-400 border-slate-300`}
            />
          </div>
          <div className="w-full xl:w-[30%]">
            <Button onClick={handleAdd} label="Add Account" />
          </div>
        </div>
        <table className="w-full text-sm text-left  text-gray-900 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Gejala
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
            {users?.map((user, index) => (
              <tr key={user.id} className="odd:bg-white  even:bg-gray-50  border-b ">
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {user.name}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {user.email}
                </th>
                <td className="px-6 py-4">{user.role === 2 ? "Admin" : "User"}</td>
                <td className="px-6 py-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(user)}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(user)}
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
