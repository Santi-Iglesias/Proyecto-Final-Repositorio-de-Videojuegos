import express from "express"
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv"

const app = express()

// Middlewares
dotenv.config()
app.use(cors({ origin: "*" }))
app.use(express.json())

// Database Connection
const conexion = mysql.createConnection({
    host: process.env.DATABASE_HOST,    
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

// Routes
app.get('/usuarios', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (err, result) => {
        if (err) { return res.status(500).send(err)        
        }
        res.status(200).json(result)
    })
})

app.post("/registrarse", (req, res) => {
    const { username, fullname, edad, email, password } = req.body

    conexion.query(`INSERT INTO usuarios (username, fullname, edad, email, password) VALUES (?, ?, ?, ?, ?)`,
    [username, fullname, edad, email, password],
    (err, result) => {
            if (err) { return res.status(500).send(err)        
            }
            res.status(201).json(result)
        })
})

app.post("/iniciar-sesion", (req, res) => {
    const { identifier, password } = req.body
    const emailRegex = /[a-z0-9!#$%&'+/=?^`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    function passwordIsValid(passwordFromClient, passwordFromConexion) {
      return passwordFromClient === passwordFromConexion
    }
    
    if(emailRegex.test(identifier)) {
        conexion.query("SELECT * FROM usuarios WHERE email = ?",
        [identifier],
        (err, result) => {
          if (err) return res.status(400).json(err)
          const user = { ... result[0] }
          
          if (passwordIsValid(password, user.password)){
            res.status(200).json(user)
          } else {
            res.status(400).json({ messsage: "Contraseña incorrecta" })
          }
        })
    } else {
        conexion.query("SELECT * FROM usuarios WHERE username =?",
        [identifier],
        (err, result) => {
          if (err) return res.status(400).json(err)
          const user = { ... result[0] }
          
          if (passwordIsValid(password, user.password)){
            res.status(200).json(user)
          } else {
            res.status(400).json({ messsage: "Contraseña incorrecta" })
          }
        })
    }
})

//Inicialization
app.listen(3000, () => {
    console.log("Server is running")
})