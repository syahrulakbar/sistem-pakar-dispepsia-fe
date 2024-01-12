import { MutatingDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center z-20">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#00A9FF"
        secondaryColor="#00A9FF"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
