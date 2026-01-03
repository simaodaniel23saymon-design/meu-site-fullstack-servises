// Servidor Node.js com Express para servir o site e a API

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Dados simulados
const servicos = [
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
        descricao: 'Orientação especializada para otimizar seu projeto e arquitetura.',
        preco: '1.500,00'
    }
];

const solicitacoes = [];

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

// Rotas da API

// GET - Obter serviços
app.get('/api/servicos', (req, res) => {
    res.json(servicos);
});

// GET - Obter um serviço específico
app.get('/api/servicos/:id', (req, res) => {
    const servico = servicos.find(s => s.id === parseInt(req.params.id));
    
    if (!servico) {
        return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    
    res.json(servico);
});

// POST - Criar nova solicitação
app.post('/api/solicitacoes', (req, res) => {
    const { nome, email, telefone, servico, descricao } = req.body;
    
    // Validar dados
    if (!nome || !email || !servico || !descricao) {
        return res.status(400).json({ 
            erro: 'Campos obrigatórios não preenchidos' 
        });
    }
    
    // Criar solicitação
    const novasolicitacao = {
        id: solicitacoes.length + 1,
        nome,
        email,
        telefone,
        servico,
        descricao,
        status: 'pendente',
        dataCriacao: new Date().toISOString()
    };
    
    solicitacoes.push(novasolicitacao);
    
    console.log('Nova solicitação recebida:', novasolicitacao);
    
    res.status(201).json({
        sucesso: true,
        mensagem: 'Solicitação recebida com sucesso!',
        id: novasolicitacao.id
    });
});

// GET - Obter todas as solicitações
app.get('/api/solicitacoes', (req, res) => {
    res.json(solicitacoes);
});

// POST - Chat
app.post('/api/chat', (req, res) => {
    const { mensagem } = req.body;
    
    if (!mensagem) {
        return res.status(400).json({ erro: 'Mensagem vazia' });
    }
    
    // Resposta aleatória
    const resposta = respostasChat[Math.floor(Math.random() * respostasChat.length)];
    
    console.log('Mensagem recebida:', mensagem);
    console.log('Resposta enviada:', resposta);
    
    res.json({ resposta });
});

// GET - Status da API
app.get('/api/status', (req, res) => {
    res.json({
        status: 'ok',
        mensagem: 'API funcionando normalmente',
        timestamp: new Date().toISOString()
    });
});

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║   🚀 Servidor de Serviços Fullstack   ║
    ║   Rodando em http://localhost:${PORT}      ║
    ║   Pressione Ctrl+C para parar          ║
    ╚════════════════════════════════════════╝
    `);
    console.log('📡 Rotas disponíveis:');
    console.log('   GET  /api/servicos');
    console.log('   GET  /api/servicos/:id');
    console.log('   POST /api/solicitacoes');
    console.log('   GET  /api/solicitacoes');
    console.log('   POST /api/chat');
    console.log('   GET  /api/status');
});