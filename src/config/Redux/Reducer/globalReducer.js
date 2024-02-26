import {
  MdOutlineSpaceDashboard,
  RiUserSettingsLine,
  LuNewspaper,
  FiUsers,
  IoMdBook,
  RiHeartPulseLine,
  RiHealthBookLine,
} from "../../../utils/icon-library";

const initialState = {
  slideShow: false,
  modal: false,
  isUpdate: false,
  user: {},
  penyakit: {},
  navigationPages: [
    {
      path: "/",
      icon: MdOutlineSpaceDashboard,
      text: "Dashboard",
    },
    {
      path: "/rule",
      icon: IoMdBook,
      text: "Rule",
    },
    {
      path: "/penyakit",
      icon: RiHeartPulseLine,
      text: "Penyakit",
    },
    {
      path: "/gejala",
      icon: RiHealthBookLine,
      text: "Gejala",
    },
    {
      path: "/blog",
      icon: LuNewspaper,
      text: "Blog",
    },
    {
      path: "/user-management",
      icon: FiUsers,
      text: "User Management",
    },
    {
      path: "/setting-account",
      icon: RiUserSettingsLine,
      text: "Setting Account",
    },
  ],
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SLIDER":
      return {
        ...state,
        slideShow: action.payload,
      };
    case "SET_PENYAKIT":
      return {
        ...state,
        penyakit: action.payload,
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "IS_UPDATE":
      return {
        ...state,
        isUpdate: action.payload,
      };
    default:
      return state;
  }
};
export default globalReducer;
