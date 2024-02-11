export default function Modal({ ...rest }) {
  const { title, bodyContent, subTitle, gap = false, small = true } = rest;
  return (
    <div className="w-full h-screen absolute flex items-center justify-center top-0 right-0 left-0 bg-black bg-opacity-25  backdrop-filter backdrop-blur-sm z-30">
      <div
        className={`w-[80%] ${
          small ? "xl:w-[30%]  " : "xl:w-[80%]"
        } bg-white max-h-full  overflow-y-auto flex flex-col ${gap && "gap-5"} rounded-md p-2`}
      >
        <h1 className="font-semibold text-2xl text-center">{title}</h1>
        <p className="text-center">{subTitle}</p>
        <div>{bodyContent}</div>
      </div>
    </div>
  );
}
