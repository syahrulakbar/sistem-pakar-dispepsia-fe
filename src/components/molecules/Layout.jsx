import { useSelector } from "react-redux";
import { Navbar, NavDesktop, ShowModal } from "./index";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  const { slideShow } = useSelector((state) => state.globalReducer);
  console.log(slideShow);

  return (
    <>
      <ShowModal />
      <div className="flex flex-col xl:flex-row w-full">
        <Navbar />
        <div className={`hidden ${slideShow ? "xl:w-[5%]" : "xl:w-[20%]"} xl:block  relative`}>
          <NavDesktop />
        </div>
        <main className={`w-full ${slideShow ? "xl:w-[95%]" : "xl:w-[80%]"} p-5`}>{children}</main>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
