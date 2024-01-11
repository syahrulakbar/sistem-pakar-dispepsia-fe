export default function Button({ ...rest }) {
  const { label, onClick, disabled, outline, small, type = "button" } = rest;
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
      ${outline ? "text-black" : "text-white"}
      ${outline ? "bg-white" : "bg-sky-400"}
      ${outline ? "border-black" : "border-sky-400"}
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
