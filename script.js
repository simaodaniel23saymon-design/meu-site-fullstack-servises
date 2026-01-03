// Elementos do DOM
const btnSolicitar = document.getElementById('btnSolicitar');
const modalSolicitacao = document.getElementById('modalSolicitacao');
const btnFecharModal = document.getElementById('btnFecharModal');
const formularioSolicitacao = document.getElementById('formularioSolicitacao');
const btnEnviar = document.getElementById('btnEnviar');
const inputMensagem = document.getElementById('inputMensagem');
const mensagensContainer = document.getElementById('mensagens-container');
const servicosContainer = document.getElementById('servicos-container');
const selectServico = document.getElementById('servico');

// Abrir Modal
btnSolicitar.addEventListener('click', () => {
    modalSolicitacao.classList.add('ativo');
});

// Fechar Modal
btnFecharModal.addEventListener('click', () => {
    modalSolicitacao.classList.remove('ativo');
});

// Fechar Modal ao clicar fora
window.addEventListener('click', (event) => {
    if (event.target === modalSolicitacao) {
        modalSolicitacao.classList.remove('ativo');
    }
});

// Enviar Formulário
formularioSolicitacao.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        servico: document.getElementById('servico').value,
        descricao: document.getElementById('descricao').value
    };

    try {
        const resposta = await enviarSolicitacao(dados);
        if (resposta.sucesso) {
            alert('Solicitação enviada com sucesso!');
            formularioSolicitacao.reset();
            modalSolicitacao.classList.remove('ativo');
        }
    } catch (erro) {
        alert('Erro ao enviar solicitação: ' + erro.message);
    }
});

// Chat
btnEnviar.addEventListener('click', enviarMensagem);
inputMensagem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        enviarMensagem();
    }
});

function enviarMensagem() {
    const mensagem = inputMensagem.value.trim();
    if (mensagem === '') return;

    // Adicionar mensagem do usuário
    const divMensagem = document.createElement('div');
    divMensagem.classList.add('mensagem', 'user');
    divMensagem.innerHTML = `<strong>Você:</strong> ${mensagem}`;
    mensagensContainer.appendChild(divMensagem);

    inputMensagem.value = '';
    mensagensContainer.scrollTop = mensagensContainer.scrollHeight;

    // Simular resposta do bot
    setTimeout(async () => {
        const respostaBotDiv = document.createElement('div');
        respostaBotDiv.classList.add('mensagem', 'bot');
        respostaBotDiv.innerHTML = '<strong>Suporte:</strong> Processando sua mensagem...';
        mensagensContainer.appendChild(respostaBotDiv);
        
        try {
            const resposta = await enviarMensagemChat(mensagem);
            respostaBotDiv.innerHTML = `<strong>Suporte:</strong> ${resposta}`;
        } catch (erro) {
            respostaBotDiv.innerHTML = '<strong>Suporte:</strong> Desculpe, houve um erro. Tente novamente.';
        }
        
        mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
    }, 500);
}

// Carregar Serviços
async function carregarServicos() {
    try {
        const servicos = await obterServicos();
        servicosContainer.innerHTML = '';
        
        servicos.forEach(servico => {
            const divServico = document.createElement('div');
            divServico.classList.add('servico');
            divServico.innerHTML = `
                <h3>${servico.nome}</h3>
                <p>${servico.descricao}</p>
                <p style="font-weight: bold; color: #0066cc; margin-top: 1rem;">R$ ${servico.preco}</p>
            `;
            servicosContainer.appendChild(divServico);
        });

        // Preencher select do formulário
        selectServico.innerHTML = '<option value="">Selecione um serviço</option>';
        servicos.forEach(servico => {
            const option = document.createElement('option');
            option.value = servico.id;
            option.textContent = servico.nome;
            selectServico.appendChild(option);
        });
    } catch (erro) {
        console.error('Erro ao carregar serviços:', erro);
    }
}

// Inicializar
carregarServicos();

// Animação de números nas estatísticas
function animarNumeros() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const valor = parseInt(stat.textContent);
        const incremento = Math.ceil(valor / 100);
        let numero = 0;
        
        const intervalo = setInterval(() => {
            numero += incremento;
            if (numero >= valor) {
                numero = valor;
                clearInterval(intervalo);
            }
            stat.textContent = numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }, 30);
    });
}

// Animar quando a seção entra em view
const observadorOpcoes = {
    threshold: 0.1
};

const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            
            // Animar números quando chegar na seção
            if (entry.target.classList.contains('sobre')) {
                animarNumeros();
            }
            
            observador.unobserve(entry.target);
        }
    });
}, observadorOpcoes);

// Observar todas as seções
document.querySelectorAll('section').forEach(section => {
    observador.observe(section);
});

// Adicionar CSS para animação
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    section {
        opacity: 0;
    }

    .btn-solicitar:active {
        transform: scale(0.98);
    }

    .projeto {
        animation: slideInLeft 0.5s ease forwards;
    }

    .testemunho {
        animation: slideInLeft 0.5s ease forwards;
    }
`;
document.head.appendChild(style);