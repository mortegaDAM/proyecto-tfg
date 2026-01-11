import { db } from "./firebase";

console.log("Backend iniciado");

async function testConnection() {
  const snapshot = await db.collection("test").get();
  console.log("Conectado a Firebase. Documentos:", snapshot.size);
}

testConnection();
