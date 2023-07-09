const formularioDeRegistro = document.getElementById("r-register")
const rUsername = document.getElementById("r-username")
const rFullName = document.getElementById("r-fullname")
const rEdad = document.getElementById("r-edad")
const rEmail = document.getElementById("r-email")
const rPassword = document.getElementById("r-password")

const formLogin = document.getElementById("form-login")
const lIdentifier = document.getElementById("l-identifier")
const lPassword = document.getElementById("l-password")

async function subirDatosABD(usuario) {
  const res = await fetch("http://localhost:3000/registrarse", {
    method: "POST",
    headers: {
          "Content-Type": "application/json"
        },
    body: JSON.stringify(usuario)
  })
  const datos = await res.json()
  return datos
}

async function iniciarSesion(identifier, password) {
    const res = await fetch("http://localhost:3000/iniciar-sesion", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({ identifier, password })
    })
    const datos = await res.json()
    return datos
}

formularioDeRegistro.addEventListener("submit", async (evento) => {
  evento.preventDefault()

  const usuario = {
    username: rUsername.value,
    fullname: rFullName.value,
    edad: rEdad.value,
    email: rEmail.value,
    password: rPassword.value
  }

  console.log(usuario)
  console.log(JSON.stringify(usuario))

  const usuarioSubido = await subirDatosABD(usuario)

  if (usuarioSubido) {
      console.log(usuarioSubido)
    }
})

formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const usuarioEsValido = await iniciarSesion(lIdentifier.value, lPassword.value)

    if (usuarioEsValido.messsage) {
        alert(usuarioEsValido.messsage)
    }

    if (usuarioEsValido.username) {
        alert(`Sesion iniciada, Bienvenido ${usuario.nombre}`)
        localStorage.setItem("datos-de-uduario", JSON.stringify(usuarioEsValido))
      }
})