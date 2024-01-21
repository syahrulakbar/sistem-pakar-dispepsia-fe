import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Button } from "../../index";
import { MdLogout } from "../../../utils/icon-library";

const NavDesktop = () => {
  const dispatch = useDispatch();
  const { navigationPages, slideShow } = useSelector((state) => state.globalReducer);

  const handleLogout = () => {
    dispatch({ type: "SET_MODAL", payload: "logout" });
  };
  return (
    <aside
      className={`hidden ${
        slideShow ? "xl:w-[5%]" : "xl:w-[20%]"
      } text-white hidden fixed left-0 top-0 h-full  bg-black transition-all ease-in-out duration-500 xl:block`}
    >
      <nav className={`h-full flex flex-col justify-between`}>
        <ul className="w-full flex flex-col gap-2 justify-center px-2">
          <div className="w-full flex justify-center py-2">
            <Link to={"/"}>Si Pardi</Link>
          </div>
          <p className="px-2 text-slate-500 font-semibold">Menu</p>
          {navigationPages?.map((page, id) => (
            <li key={id}>
              <NavLink
                to={page.path}
                style={({ isActive }) => ({
                  backgroundColor: isActive && "#475569",
                  borderRight: isActive && "3px solid #22d3ee",
                })}
                className={`font-semibold flex items-center text-sm  gap-2 py-4 px-2 rounded-sm hover:bg-slate-600  ${
                  slideShow && "justify-center"
                } `}
              >
                <page.icon size={24} />
                <ul className={slideShow ? "hidden" : "block"}>
                  <p>{page.text}</p>
                </ul>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={`flex flex-col gap-6 text-md w-full p-2`}>
          <li>
            <Button onClick={handleLogout} label={slideShow ? <MdLogout size={24} /> : "Logout"} />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default NavDesktop;
