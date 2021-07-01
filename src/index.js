import * as yup from 'yup';

let schema = yup.object().shape({

  nombre: yup
    .string("Debe escribir una cadena")
    .required("Debe escribir un nombre"),

  edad: yup
    .number("Debe escribir un numero")
    .typeError('Debe escribir un caracter del tipo numero')
    .required("Debe escribir la edad")
    .positive("La edad debe ser un numero positivo")
    .integer("La edad debe ser un numero entero"),

  email: yup
    .string("Debe escribir una cadena")
    .email("Debe un email valido")
    .required("Debe escribir un e-mail"),

  // website: yup.string().url(),
  // createdOn: yup.date().default(function () {return new Date();}),
});

// Fields
const Formulario = document.getElementById("form");
const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoEdad = document.getElementById("edad");
const BotonSubmit = document.querySelector(".submit");

campoNombre.addEventListener("blur", e => validar(e.currentTarget));
campoEmail.addEventListener("blur", e => validar(e.currentTarget));
campoEdad.addEventListener("blur", e => validar(e.currentTarget));
Formulario.addEventListener("submit", handleSubmit);

//Validaciones
function validar(input) {

  const formulario = {
    nombre: campoNombre.value,
    edad: campoEdad.value,
    email: campoEmail.value,
  }

  //Borramos el mensaje de error. Si llega a existir se escribirá
  input.parentElement.querySelector(".input__error").textContent = "";

  //Forma Asincrona------------------------------------------------------------

  // schema
  //    .validate(formulario, { abortEarly: false })
  //   .then(function () {
  //     console.log("Todo OK")
  //     return true
  //   })

  //   .catch(function (err) {
  //     //Mostrar errores por consola
  //     err.inner.forEach(e => {
  //       console.log(e.path, ":", e.message);
  //     });
  //     //Mostrar errores en el formulario
  //     err.inner.forEach(e => {
  //       if (e.path == input.name) input.parentElement.querySelector(".input__error").textContent = e.message;
  //     });
  //   })
  //   .finally(() => { return false })

  //Forma Sincrona------------------------------------------------------------

  try {
    schema.validateSync(formulario, { abortEarly: false })
    return true
  } catch (err) {
    //Mostrar errores por consola
    err.inner.forEach(e => {
      console.log(e.path, ":", e.message);
    });
    //Mostrar errores en el formulario
    err.inner.forEach(e => {
      if (e.path == input.name) input.parentElement.querySelector(".input__error").textContent = e.message;
    });

  }
  return false


}

// Handlers
function handleSubmit(e) {
  e.preventDefault();
  if (validar(Formulario)) {
    BotonSubmit.textContent = "Success";
  } else {
    BotonSubmit.textContent = "Submit";
  }
}






