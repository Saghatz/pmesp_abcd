let currentIndex = 0; // Índice do banner atual
const banners = document.querySelectorAll('.banner-container img');
const bannerContainer = document.querySelector('.banner-container');
let autoSlideInterval; // Variável para armazenar o intervalo

// Função para navegar entre os banners
function navigateBanner(direction) {
    // Atualiza o índice do banner
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = banners.length - 1; // Volta ao último banner
    } else if (currentIndex >= banners.length) {
        currentIndex = 0; // Volta ao primeiro banner
    }

    // Move o container para o banner correto
    updateBannerPosition();
    resetAutoSlide(); // Reinicia o auto-slide ao navegar manualmente
}

// Atualiza a posição do banner
function updateBannerPosition() {
    const offset = -currentIndex * 100; // Deslocamento em % (1 banner = 100%)
    bannerContainer.style.transform = `translateX(${offset}%)`;
}

// Configura a transição automática
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % banners.length; // Avança para o próximo banner
        updateBannerPosition();
    }, 7000); // Troca a cada 7 segundos
}

// Pausa e reinicia o auto-slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Pausa o intervalo atual
    startAutoSlide(); // Reinicia o intervalo
}

// Reinicializa o índice ao carregar
document.addEventListener('DOMContentLoaded', () => {
    bannerContainer.style.transform = `translateX(0)`;
    startAutoSlide(); // Inicia o auto-slide ao carregar

    // Adiciona evento de clique nas imagens para navegação
    banners.forEach((banner, index) => {
        banner.addEventListener('click', () => {
            // Verifica se é o banner correto para navegar
            if (index === 1) { // Index do banner que você quer vincular ao link
                window.location.href = 'https://saghatz.github.io/concursos_pmesp/'; // Redireciona para o link
            }
        });
    });
});

// Função para abrir o formulário de ouvidoria
function openOuvidoria() {
    document.getElementById('ouvidoria-container').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

// Função para fechar o formulário de ouvidoria
function closeOuvidoria() {
    document.getElementById('ouvidoria-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Fechar o formulário ao pressionar a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOuvidoria();
    }
});

// OUVIDORIA

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#ouvidoria-container form");
    const ouvidoriaContainer = document.querySelector("#ouvidoria-container");
    const body = document.body; // Corpo da página

    // Função para fechar o formulário
    const closeForm = () => {
        ouvidoriaContainer.style.display = "none"; // Esconde o contêiner
        document.body.style.overflow = ""; // Habilita o scroll da página principal
    };

    // Fechar o formulário ao pressionar ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeForm();
        }
    });

    // Evento de envio do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Previne o envio padrão

        const nome = document.querySelector("#nome").value;
        const cpf = document.querySelector("#cpf").value;
        const numeroContato = document.querySelector("#numero-contato").value;
        const email = document.querySelector("#email").value;
        const denuncia = document.querySelector("#denuncia").value;

        const webhookURL = "https://discord.com/api/webhooks/1312886977053589566/fk4jAIEd2PAcDRVSnOxOVZ6dZZU5J7rR0Hl5ryk47NQrN5-n6re8pA4qNK3L-p_qDhHc";

        // Adicionando a formatação do ID Discord
        const discordMention = `<@${email}>`; // Adiciona <@ e > ao redor do email

        const payload = {
            content: `**Nova Denúncia Recebida**\n\n**Nome Completo:** ${nome}\n**CPF:** ${cpf}\n**Número de Contato:** ${numeroContato}\n**Email (ID Discord):** ${discordMention}\n**Denúncia:** ${denuncia}`
        };

        fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert("Denúncia enviada com sucesso!");
                form.reset(); // Reseta o formulário após envio
                closeForm(); // Fecha o formulário
                
                // Aplica a animação de fade-out no corpo da página
                body.classList.add("fade-out");

                // Aguarda a duração da animação (1 segundo) para redirecionar
                setTimeout(() => {
                }, 1000); // 1000ms = 1 segundo
            } else {
                alert("Erro ao enviar a denúncia. Tente novamente mais tarde.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar a denúncia:", error);
            alert("Erro ao enviar a denúncia. Verifique sua conexão.");
        });
    });
});

// Função para abrir o formulário de boletim de ocorrência
function openBoletim() {
    document.getElementById('boletim-container').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

// Função para fechar o formulário de boletim de ocorrência
function closeBoletim() {
    document.getElementById('boletim-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Fechar o formulário ao pressionar a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBoletim();
    }
});

// BOLETIM DE OCORRÊNCIA ELETRÔNICO

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#boletim-container form");
    const boletimContainer = document.querySelector("#boletim-container");
    const body = document.body; // Corpo da página

    // Função para fechar o formulário
    const closeForm = () => {
        boletimContainer.style.display = "none"; // Esconde o contêiner
        document.body.style.overflow = ""; // Habilita o scroll da página principal
    };

    // Fechar o formulário ao pressionar ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeForm();
        }
    });

    // Evento de envio do formulário
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Previne o envio padrão

        // Pegando valores do formulário de BO
        const nome = document.querySelector("#nome-bo").value;
        const cpf = document.querySelector("#cpf-bo").value;
        const numeroContato = document.querySelector("#numero-contato-bo").value;
        const email = document.querySelector("#email-bo").value;
        const ocorrencia = document.querySelector("#ocorrencia-bo").value;

        const webhookURL = "https://discord.com/api/webhooks/1312890411777392793/znZhXrkXoP2JfopFFemAc4pA7md5G-5kTk8F-R1JKEpRIZRsGnCHGJTtkH958N4TBojP";

        // Adicionando a formatação do ID Discord
        const discordMention = `<@${email}>`; // Adiciona <@ e > ao redor do email

        const payload = {
            content: `**Novo Boletim de Ocorrência Recebido**\n\n**Nome Completo:** ${nome}\n**CPF:** ${cpf}\n**Número de Contato:** ${numeroContato}\n**Email (ID Discord):** ${discordMention}\n**Descrição da Ocorrência:** ${ocorrencia}`
        };

        fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                alert("Boletim de ocorrência enviado com sucesso!");
                form.reset(); // Reseta o formulário após envio
                closeForm(); // Fecha o formulário
            } else {
                alert("Erro ao enviar o boletim de ocorrência. Tente novamente mais tarde.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar o boletim de ocorrência:", error);
            alert("Erro ao enviar o boletim de ocorrência. Verifique sua conexão.");
        });
    });
});

// Função para abrir o formulário de boletim de ocorrência
function openBoletim() {
    document.getElementById('boletim-container').style.display = 'flex';
}

// Função para fechar o formulário de boletim de ocorrência
function closeBoletim() {
    document.getElementById('boletim-container').style.display = 'none';
}

// Fechar o formulário ao pressionar a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBoletim();
    }
});
