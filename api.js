// API Mock - Simula um servidor de backend
// Em produção, estas URLs apontariam para seu servidor real

// URL base da API (mude para seu servidor)
const API_BASE_URL = 'http://localhost:3000/api';

// Serviços disponíveis (dados simulados)
const servicosMock = [
    {
        id: 1,
        nome: 'Desenvolvimento Web',
        descricao: 'Criação de sites e aplicações web modernas e responsivas.',
        preco: '2.500,00'
    },
    {
        id: 2,
        nome: 'Manutenção de Sistemas',
        descricao: 'Atualizações e correções para manter seu sistema funcionando perfeitamente.',
        preco: '800,00'
    },
    {
        id: 3,
        nome: 'Consultoria Técnica',
        descricao: 'Orientação especializada para otimizar seu projeto e arquitetura.'
    },
];

// Respostas automáticas do chat
const respostasChat = [
    'Obrigado pela sua mensagem! Estamos analisando sua solicitação.',
    'Temos especialistas prontos para ajudar com seu projeto.',
    'Você pode fornecer mais detalhes sobre o que precisa?',
    'Ótimo! Vamos analisar e entrar em contato em breve.',
    'Temos experiência com projetos similares. Vamos adorar ajudar!',
    'Qual é o seu orçamento estimado para este projeto?',
    'Podemos discutir prazos e cronograma também.',
    'Nosso time está pronto para começar assim que você confirmar.'
];

// Obter lista de serviços
async function obterServicos() {
    try {
        // Tenta chamar a API real
        const resposta = await fetch(`${API_BASE_URL}/servicos`);
        if (resposta.ok) {
            return await resposta.json();
        }
    } catch (erro) {
        console.log('API não disponível, usando dados simulados:', erro);
    }
    
    // Se a API não funcionar, retorna os dados simulados
    return servicosMock;
}

// Enviar solicitação de serviço
async function enviarSolicitacao(dados) {
    try {
        // Tenta chamar a API real
        const resposta = await fetch(`${API_BASE_URL}/solicitacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (resposta.ok) {
            return await resposta.json();
        } else {
            throw new Error('Erro ao enviar solicitação');
        }
    } catch (erro) {
        console.log('Usando resposta simulada:', erro);
        
        // Se a API não funcionar, simula uma resposta bem-sucedida
        return {
            sucesso: true,
            mensagem: 'Solicitação recebida! Entraremos em contato em breve.',
            id: Math.random().toString(36).substr(2, 9)
        };
    }
}

// Enviar mensagem do chat
async function enviarMensagemChat(mensagem) {
    try {
        // Tenta chamar a API real
        const resposta = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensagem })
        });
        
        if (resposta.ok) {
            const dados = await resposta.json();
            return dados.resposta;
        } else {
            throw new Error('Erro ao processar mensagem');
        }
    } catch (erro) {
        console.log('Usando resposta simulada:', erro);
        
        // Se a API não funcionar, retorna uma resposta aleatória
        return respostasChat[Math.floor(Math.random() * respostasChat.length)];
    }
}

// Função auxiliar para fazer requisições customizadas
async function fazerRequisicao(endpoint, opcoes = {}) {
    const padrao = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const configuracao = { ...padrao, ...opcoes };
    
    try {
        const resposta = await fetch(`${API_BASE_URL}${endpoint}`, configuracao);
        
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        return await resposta.json();
    } catch (erro) {
        console.error(`Erro na requisição ${endpoint}:`, erro);
        throw erro;
    }
}