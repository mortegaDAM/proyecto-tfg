import http from "http";
import { db } from "./firebase";
import { registerNewUser } from "./usuarios";


const server = http.createServer(async (req, res) => {

  // Hay que poner las url confiables (localhost:5173 y localhost:3000)
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Encabezado de respuesta -> Metodos permitidos -> metodos incluidos en la lista segura de CORS
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Para las peticiones tipo POST, PUT, DELETE
  // Se manda options para verificar si la url es confiable (ALLOW-ORIGIN)
  // Si lo esta, manda la peticion (POST, PUT, DELETE)
  // Si no, lo bloquea
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

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

  } else if (req.url === "/registro" && req.method === "POST") {
    // Endpoint de registro de un usuario: nombre, apellido, username, email y uid (id del doc)

    try {
      let cuerpo = "";
      req
        .on('error', (error) => {
          console.error(error);
        })
        .on('data', (chunk) => {
          cuerpo += chunk.toString();
        })
        .on('end', async () => {
          res.on('error', (error) => {
            console.log(error);
          });

          const datos = JSON.parse(cuerpo);
          //console.log(datos);

          // Set -> crea uno nuevo si no existe, actualiza si existe
          // Add -> para que firebase ponga automaticamente el id -> db.collection("usuarios").add(...)
          const docRef = await db.collection("usuarios").doc(datos.uid).set({
            name: datos.nombre,
            surname: datos.apellido,
            username: datos.username,
            email: datos.email
          })
            .then(() => {
              console.log("Document successfully written!");
            }).catch((err) => {
              console.error(err);
            })

          res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          });

          res.end(JSON.stringify({ mensaje: "Usuario guardado" }));
        });
    } catch (error) {
      console.error(error);
    }
  } else if (req.url?.startsWith("/get-equal-username") && req.method === "GET") {
    try {
      const [url, username] = req.url.split("=");

      const docRef = db.collection("usuarios");
      const encontrado = await docRef.where("username", "==", username).get();

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      });

      res.end(JSON.stringify({ existe: !encontrado.empty }));

    } catch (error) {
      console.error(error);
    }
  } else if (req.url === "/get-user" && req.method === "POST") {
    try {
      let cuerpo = "";
      req
        .on('data', (chunk) => {
          cuerpo += chunk.toString();
        })
        .on('end', async () => {
          res.on('error', (error) => {
            console.log(error);
          });

          const docRef = await db.collection("usuarios").doc(cuerpo).get();

          res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          });
          res.end(JSON.stringify({ usuario: docRef.data() }));
        });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => console.log("Backend escuchando en puerto 3000"));
