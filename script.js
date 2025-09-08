// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contacto-form");
    if (!form) return; // evita errores si no existe el form
    const inputs = form.querySelectorAll("input, textarea");

    // Crear contenedores de errores dinámicos
    inputs.forEach(input => {
        const errorMsg = document.createElement("small");
        errorMsg.classList.add("error-msg");
        errorMsg.style.display = "none";
        input.insertAdjacentElement("afterend", errorMsg);

        // Validación en tiempo real
        input.addEventListener("input", () => validateField(input));
    });

    // Validar antes de enviar
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita envío si hay errores
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            showSuccess(form);
            form.reset();
            inputs.forEach(input => {
                input.classList.remove("success", "error");
            });
        }
    });
});

// Función que valida cada campo
function validateField(input) {
    const errorMsg = input.nextElementSibling;
    let valid = true;

    // Validación de nombre y apellido
    if (input.name === "nombre" || input.name === "apellido") {
        const regex = /^[a-zA-ZÀ-ÿ\s]{3,}$/; // solo letras y espacios, min 3
        if (!regex.test(input.value.trim())) {
            errorMsg.textContent = "Debe tener al menos 3 letras y solo caracteres válidos.";
            valid = false;
        }
    }

    // Validación de correo
    if (input.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            errorMsg.textContent = "Por favor, ingresa un correo válido.";
            valid = false;
        }
    }

    // Validación de mensaje (solo si es textarea)
    if (input.tagName.toLowerCase() === "textarea") {
        if (input.value.trim().length < 10) {
            errorMsg.textContent = "El mensaje debe tener al menos 10 caracteres.";
            valid = false;
        }
    }

    // Validación de contraseña
    if (input.type === "password") {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passRegex.test(input.value.trim())) {
            errorMsg.textContent = "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula, un número y un símbolo.";
            valid = false;
        }
    }

    // Mostrar u ocultar mensaje
    if (!valid) {
        errorMsg.style.display = "block";
        input.classList.add("error");
        input.classList.remove("success");
    } else {
        errorMsg.style.display = "none";
        input.classList.add("success");
        input.classList.remove("error");
    }

    return valid;
}

// Mostrar mensaje de éxito dentro del formulario
function showSuccess(form) {
    let successMsg = form.querySelector(".form-success");
    if (!successMsg) {
        successMsg = document.createElement("div");
        successMsg.classList.add("form-success");
        successMsg.style.color = "lime";
        successMsg.style.marginTop = "12px";
        form.appendChild(successMsg);
    }
    successMsg.textContent = "✅ Formulario enviado con éxito.";
    successMsg.style.display = "block";
}
