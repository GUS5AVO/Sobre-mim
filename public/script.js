// Adiciona efeito ao cabeçalho ao rolar a página
document.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.background = "rgba(0, 102, 204, 0.9)";
    } else {
        header.style.background = "linear-gradient(135deg, #0066cc, #0099ff)";
    }
});

// Efeito de fade-in nas seções
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        setTimeout(() => {
            section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }, 300);
    });
});

// Formulário de contato funcional
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let message = document.querySelector("#message").value;
        
        if (name === "" || email === "" || message === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        
        // Envia os dados para o servidor via fetch
        fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || "Mensagem enviada com sucesso!");
            form.reset();
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao enviar a mensagem.");
        });
    });
});
