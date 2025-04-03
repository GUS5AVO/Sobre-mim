// Função para exibir notificações visuais
function showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.className = `toast ${isError ? "error" : "success"}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Função para exibir mensagens no contêiner ao lado do formulário
function showContactMessage(message, isError = false) {
    const messageContainer = document.getElementById("contact-message");
    messageContainer.textContent = message;
    messageContainer.className = isError ? "error" : "success";
    messageContainer.style.display = "block";

    setTimeout(() => {
        messageContainer.style.display = "none";
    }, 3000);
}

// Formulário de contato funcional
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let message = document.querySelector("#message").value;
        
        if (name === "" || email === "" || message === "") {
            showContactMessage("Por favor, preencha todos os campos!", true);
            return;
        }
        
        // Redireciona para o WhatsApp com a mensagem predefinida
        const whatsappNumber = "5547996880573";
        const whatsappMessage = `Olá, meu nome é ${name}. Meu e-mail é ${email}. Gostaria de falar sobre: ${message}`;
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Redireciona para o WhatsApp
        window.open(whatsappURL, "_blank");
    });
});

// Menu responsivo
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
        });
    });
});

document.getElementById('menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
});
