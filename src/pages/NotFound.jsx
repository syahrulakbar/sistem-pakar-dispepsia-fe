import { useNavigate } from "react-router-dom";
import { Button } from "../components";

export default function NotFound() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="w-full flex justify-center items-center gap-5 text-center flex-col h-screen bg-white">
      <h1 className="font-semibold text-2xl xl:text-6xl">Uh-Oh....</h1>
      <p className="xl:text-base text-xs">
        The page you are looking for may have been moved, deleted, or possibly never existed.
      </p>
      <div className="w-full xl:w-1/2">
        <Button onClick={handleBack} border label="Back to dashboard" />
      </div>
    </div>
  );
}
