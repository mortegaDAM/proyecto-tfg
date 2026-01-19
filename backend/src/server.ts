import http from "http";
import { db } from "./firebase";

const server = http.createServer(async (req, res) => {
  if (req.url === "/test") {
    // Endpoint de prueba 1
    const prueba = { mensaje: "¡Hola desde backend!", fecha: new Date().toISOString() };

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(prueba));

  } else if (req.url === "/otro-endpoint") {
    // Endpoint de prueba 2
    res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
    res.end(JSON.stringify({ mensaje: "Hola desde otro-endpoint" }));
    
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => console.log("Backend escuchando en puerto 3000"));
