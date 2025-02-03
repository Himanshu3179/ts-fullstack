import { useEffect, useState } from "react";
import { getHome } from "./api";

const App = () => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHome();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div>{data}</div>
    </div>
  );
};

export default App;
