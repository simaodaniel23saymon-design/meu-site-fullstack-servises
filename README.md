# 🚀 Serviços Fullstack

Um site profissional e responsivo para apresentar serviços de desenvolvimento fullstack.

## ✨ Recursos

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Chat em Tempo Real**: Sistema de chat integrado para suporte ao cliente
- **Modal de Solicitação**: Formulário elegante para solicitar serviços
- **Painel de Serviços**: Apresentação visual dos serviços oferecidos
- **API Ready**: Estrutura preparada para integração com backend

## 📁 Estrutura do Projeto

```
meu-site-fullstack-servises/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos responsivos e modernos
├── js/
│   ├── script.js       # Lógica da aplicação
│   └── api.js          # Integração com APIs
├── assets/             # Pasta para imagens e recursos
└── server.js           # Servidor Node.js (opcional)
```

## 🎨 Design

- **Tema de Cores**: Azul profissional com gradientes modernos
- **Tipografia**: Fontes legíveis e bem hierarquizadas
- **Componentes**: Botões, cards, modal e chat
- **Animações**: Transições suaves e efeitos hover

## 🚀 Como Usar

### 1. Abrir o site localmente

Você pode abrir o `index.html` diretamente no navegador para um teste rápido.

### 2. Com Live Server (recomendado)

Se estiver usando VS Code, instale a extensão **Live Server** e clique com botão direito em `index.html` > "Open with Live Server".

### 3. Com servidor Node.js (opcional)

Se quiser testar com um servidor:

```bash
npm install
node server.js
```

Depois acesse `http://localhost:3000`

## 📱 Responsividade

O site é totalmente responsivo e se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔧 Funcionalidades

### Modal de Solicitação
- Coleta dados do cliente (nome, email, telefone, etc)
- Envia para processamento via API
- Feedback visual ao usuário

### Chat Integrado
- Sistema de mensagens em tempo real
- Respostas automáticas simuladas
- Histórico visível

### Painel de Serviços
- Lista dinâmica de serviços
- Carregamento via API
- Cards interativos com hover effect

## 🔌 API

O arquivo `js/api.js` contém funções para:

- `obterServicos()` - Carrega lista de serviços
- `enviarSolicitacao(dados)` - Envia solicitação de serviço
- `enviarMensagemChat(mensagem)` - Processa mensagem do chat

### Modo Offline

Se a API não estiver disponível, o sistema usa dados simulados automaticamente.

## 📝 Customização

### Adicionar mais serviços

Edite o array `servicosMock` em `js/api.js`:

```javascript
const servicosMock = [
    {
        id: 4,
        nome: 'Seu Serviço',
        descricao: 'Descrição do serviço',
        preco: '1.000,00'
    }
];
```

### Mudar cores

Edite as variáveis CSS em `css/style.css`:

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #00d4ff;
    /* ... outras cores */
}
```

### Conectar a um backend real

Altere a `API_BASE_URL` em `js/api.js`:

```javascript
const API_BASE_URL = 'https://seu-servidor.com/api';
```

## 🛠️ Tecnologias Usadas

- HTML5
- CSS3 (com variáveis e media queries)
- JavaScript vanilla (sem dependências)
- Fetch API para requisições HTTP

## 📧 Contato

Para mais informações sobre os serviços, entre em contato através do formulário no site.

## 📄 Licença

Todos os direitos reservados © 2026 Serviços Fullstack
