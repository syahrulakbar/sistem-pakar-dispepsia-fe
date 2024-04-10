import { useEffect, useState } from "react";
import AxiosJWTConfig from "../utils/axiosJWT";

export default function Dashboard() {
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosJWT = await AxiosJWTConfig();
        const response = await axiosJWT.get(`/sipardi`);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="text-sm">Sistem Pakar Diagnosa Dispepsia</p>
      <div className="mt-5 flex w-full flex-col xl:flex-row gap-5 flex-wrap">
        <div className="border-black border-2 rounded-md text-center w-full xl:w-1/3 h-36 flex items-center justify-center flex-col">
          <h2 className="font-bold text-xl">Total Pengguna</h2>
          <p className="text-3xl">{data?.user || "Loading"}</p>
        </div>
        <div className="border-black border-2 rounded-md text-center w-full xl:w-1/3 h-36 flex items-center justify-center flex-col">
          <h2 className="font-bold text-xl">Data Penyakit</h2>
          <p className="text-3xl">{data?.penyakit || "Loading"}</p>
        </div>
        <div className="border-black border-2 rounded-md text-center w-full xl:w-1/3 h-36 flex items-center justify-center flex-col">
          <h2 className="font-bold text-xl">Data Gejala</h2>
          <p className="text-3xl">{data?.gejala || "Loading"}</p>
        </div>
        <div className="border-black border-2 rounded-md text-center w-full xl:w-1/3 h-36 flex items-center justify-center flex-col">
          <h2 className="font-bold text-xl">Data Rule</h2>
          <p className="text-3xl">{data?.rules || "Loading"}</p>
        </div>
      </div>
    </>
  );
}
