import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../config/Redux/Action";
import { Button } from "../components/atoms";
import { CiSearch } from "react-icons/ci";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const { isUpdate } = useSelector((state) => state.globalReducer);
  const api = import.meta.env.VITE_API_IMAGE;

  const dispatch = useDispatch();

  useEffect(() => {
    getAllBlog(search).then((res) => {
      setBlogs(res.data);
    });
  }, [search, isUpdate]);

  const handleDelete = (blog) => {
    dispatch({ type: "SET_MODAL", payload: "delete-blog" });
    dispatch({ type: "SET_BLOG", payload: blog });
  };
  const handleEdit = (blog) => {
    dispatch({ type: "SET_MODAL", payload: "update-blog" });
    dispatch({ type: "SET_BLOG", payload: blog });
  };
  const handleAdd = () => {
    dispatch({ type: "SET_MODAL", payload: "add-blog" });
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
              placeholder="Search by title"
              onChange={(e) => setSearch(e.target.value)}
              className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full xl:w-1/3 h-10 p-2 rounded-lg pl-8 focus:border-sky-400 border-slate-300`}
            />
          </div>
          <div className="w-full xl:w-[30%]">
            <Button onClick={handleAdd} label="Add Blog" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          {blogs?.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col xl:flex-row gap-2  w-full h-48  rounded-md shadow-md p-2"
            >
              <img
                className="w-full xl:w-1/4 object-cover bg-black"
                src={api + blog?.image}
                alt={blog.title}
              />
              <div className="w-full xl:w-2/4 flex flex-col">
                <h3 className="font-semibold text-2xl">{blog.title}</h3>
                <div className="w-1/2 truncate ">
                  <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                </div>
              </div>
              <div className="w-full xl:flex-1  flex flex-row gap-2 xl:flex-col justify-center">
                <Button onClick={() => handleEdit(blog)} label="Edit" />
                <Button
                  outline
                  onClick={() => handleDelete(blog)}
                  label="Delete"
                  className="bg-red-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
