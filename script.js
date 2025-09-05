// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contacto-form");
    const inputs = form.querySelectorAll("input, textarea");

    // Crear contenedores de errores dinámicos
    inputs.forEach(input => {
        const errorMsg = document.createElement("small");
        errorMsg.classList.add("error-msg");
        errorMsg.style.color = "red";
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
            alert("Formulario enviado con éxito ✅");
            form.reset();
        }
    });
});

// Función que valida cada campo
function validateField(input) {
    const errorMsg = input.nextElementSibling;
    let valid = true;

    if (input.type === "text") {
        if (input.value.trim().length < 3) {
            errorMsg.textContent = "El nombre debe tener al menos 3 caracteres.";
            valid = false;
        }
    }

    if (input.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            errorMsg.textContent = "Por favor, ingresa un correo válido.";
            valid = false;
        }
    }

    if (input.tagName.toLowerCase() === "textarea") {
        if (input.value.trim().length < 10) {
            errorMsg.textContent = "El mensaje debe tener al menos 10 caracteres.";
            valid = false;
        }
    }

    // Mostrar u ocultar mensaje
    if (!valid) {
        errorMsg.style.display = "block";
        input.style.borderColor = "red";
    } else {
        errorMsg.style.display = "none";
        input.style.borderColor = "green";
    }

    return valid;
}
