import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // 🔹 Llamada directa al backend
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/test");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error conectando al backend:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Prueba Frontend → Backend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
