export default function Modal({ ...rest }) {
  const { title, bodyContent, subTitle } = rest;
  return (
    <div className="w-full h-screen absolute flex items-center justify-center top-0 right-0 left-0 bg-black bg-opacity-25  backdrop-filter backdrop-blur-sm z-30">
      <div className="w-[80%] xl:w-[30%] bg-white flex flex-col gap-5 text-center rounded-md p-5">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p>{subTitle}</p>
        <div>{bodyContent}</div>
      </div>
    </div>
  );
}
