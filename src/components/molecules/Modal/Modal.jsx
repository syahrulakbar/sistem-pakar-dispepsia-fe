export default function Modal({ ...rest }) {
  const { title, bodyContent, subTitle, gap = false } = rest;
  return (
    <div className="w-full h-screen absolute flex items-center justify-center top-0 right-0 left-0 bg-black bg-opacity-25  backdrop-filter backdrop-blur-sm z-30">
      <div className={`w-[80%] xl:w-[30%] bg-white flex flex-col ${gap && "gap-5"} rounded-md p-5`}>
        <h1 className="font-semibold text-2xl text-center">{title}</h1>
        <p className="text-center">{subTitle}</p>
        <div>{bodyContent}</div>
      </div>
    </div>
  );
}
