import { db } from "./firebase";

console.log("Backend iniciado");

// Ejemplo simple de Firestore
async function testFirestore() {
  const snapshot = await db.collection("test").get();
  console.log("Documentos en 'test':", snapshot.size);
}

testFirestore();
