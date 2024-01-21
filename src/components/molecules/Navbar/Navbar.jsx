import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { HiMenuAlt1 } from "react-icons/hi";
import { Button } from "../../index";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const { navigationPages } = useSelector((state) => state.globalReducer);
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "SET_MODAL", payload: "logout" });
  };
  return (
    <nav>
      <div className="w-full xl:hidden px-2 flex flex-row justify-between items-center shadow-md">
        <NavLink to={"/dashboard"}>Si Pardi</NavLink>
        <div>
          <Button
            outline
            onClick={() => setShow(!show)}
            label={show ? <IoMdClose size={30} /> : <HiMenuAlt1 size={30} />}
          />
        </div>
      </div>
      <ul
        className={`${
          show ? "flex" : "hidden"
        } transition ease-in-out flex-col m-2 p-2 gap-4 bg-black text-white`}
      >
        {navigationPages.map((page, id) => (
          <li key={id}>
            <NavLink
              to={page.path}
              style={({ isActive }) => ({
                backgroundColor: isActive && "#475569",
                borderRight: isActive && "3px solid #22d3ee",
              })}
              className={`font-semibold flex items-center text-sm  gap-2 py-4 px-2 rounded-sm hover:bg-slate-600`}
            >
              <page.icon size={24} />
              <ul>
                <p>{page.text}</p>
              </ul>
            </NavLink>
          </li>
        ))}
        <Button label="Logout" onClick={handleLogout} />
      </ul>
    </nav>
  );
}

export default Navbar;
