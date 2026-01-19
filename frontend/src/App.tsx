import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterView } from "./routes/RegisterView";
import { auth } from "./firebase/firebase";

function App() {
  const [data, setData] = useState<any>(null);
  const user = auth.currentUser;

  useEffect(() => {
    // 🔹 Llamada directa al backend
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/otro-endpoint");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error conectando al backend:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
    <div>
      <h1>Prueba Frontend → Backend</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
    </>
    
  );
}

export default App;
