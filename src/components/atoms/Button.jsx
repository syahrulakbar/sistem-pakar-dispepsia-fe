export default function Button({ ...rest }) {
  const { label, onClick, disabled, outline, small, type = "button", border } = rest;
  return (
    <button
      className={`flex justify-center transition-all ease-in-out duration-500 relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80  w-full 
      ${border || outline ? "text-black" : "text-white"}
      ${border || outline ? "bg-white" : "bg-sky-400"}
      ${border ? "border-black" : "border-sky-400"}
      ${outline ? "border-none" : "border-sky-400"}
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
      `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
