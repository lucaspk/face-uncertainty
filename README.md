# Encare a Incerteza 🌱

Uma aplicação web gamificada para desenvolver tolerância à incerteza através de cartões de enfrentamento anti-pânico e desafios diários baseados em Terapia Cognitivo-Comportamental (TCC).

https://lucaspk.github.io/face-uncertainty/

## 📋 Sobre o Projeto

**Encare a Incerteza** é uma ferramenta de autoajuda psicológica que combina duas abordagens terapêuticas:

1. **Cartões de Enfrentamento Anti-Pânico** - Uma coleção de 24 afirmações e lembretes para gerenciar ansiedade e ataques de pânico
2. **Desafio Abraçando a Incerteza** - 18 desafios gamificados para treinar sua tolerância à incerteza no dia a dia

O projeto é 100% client-side (frontend), sem necessidade de backend, funcionando inteiramente no navegador com persistência local através de localStorage.

## ✨ Características

### Funcionalidades Principais

- **Cartões de Enfrentamento**: Interface tipo álbum de fotos para navegar entre cartões motivacionais
- **Desafios Gamificados**: Sistema completo com 18 desafios categorizados por dificuldade
- **Sistema de Progressão**: XP, níveis e conquistas (badges)
- **Reflexões Pessoais**: Espaço para registrar aprendizados após cada desafio
- **Perfil do Usuário**: Acompanhe seu progresso, nível, XP e conquistas
- **Import/Export**: Backup completo dos seus dados em formato JSON
- **Persistência Local**: Todos os dados salvos automaticamente no navegador

### Design & UX

- Design minimalista e moderno
- Paleta de cores suaves e calmantes
- Totalmente responsivo (mobile-first)
- Animações e transições suaves
- Acessível e intuitivo

## 🚀 Como Usar Localmente

### Opção 1: Servidor HTTP Simples

```bash
# Clone ou baixe o projeto
cd face_uncertainty

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (com npx)
npx http-server

# Acesse no navegador
http://localhost:8000
```

### Opção 2: Abrir Diretamente

Alguns navegadores permitem abrir o arquivo `index.html` diretamente. No entanto, é recomendado usar um servidor local para garantir que todas as funcionalidades funcionem corretamente.

## 🌐 Deploy no GitHub Pages

### Passo a Passo

1. **Crie um repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/seu-usuario/face-uncertainty.git
   git push -u origin main
   ```

2. **Configure o GitHub Pages**
   - Acesse as configurações do repositório
   - Vá em **Pages** no menu lateral
   - Em **Source**, selecione a branch `main` e pasta `/` (root)
   - Clique em **Save**

3. **Acesse seu site**
   - O site estará disponível em: `https://seu-usuario.github.io/face-uncertainty/`
   - A URL aparecerá na página de configuração do GitHub Pages

### Atualizações

Para atualizar o site, basta fazer commit e push das mudanças:

```bash
git add .
git commit -m "Update content"
git push
```

O GitHub Pages atualizará automaticamente em alguns minutos.

## 📁 Estrutura do Projeto

```
face_uncertainty/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos globais
├── js/
│   ├── app.js             # Lógica principal da aplicação
│   ├── storage.js         # Gerenciamento do localStorage
│   ├── gamification.js    # Sistema de gamificação (XP, badges)
│   └── data.js            # Dados (cartões, desafios, badges)
├── assets/
│   └── images/            # Imagens e ilustrações
└── README.md              # Este arquivo
```

## 🎮 Como Funciona

### Cartões de Enfrentamento

1. Clique em "Cartões" na navegação
2. Clique em "Começar" para revelar os cartões
3. Navegue usando as setas ou deslize (swipe) no mobile
4. Use as setas do teclado para navegar (desktop)

### Desafios

1. Clique em "Desafios" na navegação
2. Escolha um desafio da grade
3. Complete o desafio no mundo real
4. Abra o desafio novamente e preencha suas reflexões:
   - O que você aprendeu?
   - Aconteceu como você esperava?
   - O que foi diferente?
   - O que esse experimento fez por sua confiança?
   - O que isso te ensina sobre as incertezas e riscos?
5. Clique em "Completar Desafio" para ganhar XP

### Sistema de Gamificação

- **XP (Pontos de Experiência)**: Ganhe completando desafios
  - Desafios Fáceis: 10 XP
  - Desafios Médios: 20 XP
  - Desafios Difíceis: 30 XP

- **Níveis**: A cada 100 XP você sobe de nível

- **Conquistas (Badges)**: Desbloqueie conquistas ao atingir marcos especiais
  - Primeiro Passo (1 desafio)
  - Explorador (5 desafios)
  - Corajoso (10 desafios)
  - Mestre da Incerteza (18 desafios)
  - Reflexivo (3 reflexões escritas)
  - Nível 5
  - Iniciante Social (2 desafios sociais)
  - Quebrador de Rotinas (3 desafios de rotina)

### Perfil

No seu perfil você pode:
- Ver suas estatísticas (XP, nível, desafios completos, conquistas)
- Acompanhar progresso para o próximo nível
- Ver suas conquistas desbloqueadas
- Exportar seus dados
- Importar dados de um backup

## 💾 Import/Export

### Exportar Dados

1. Vá em "Perfil"
2. Clique em "Exportar Dados"
3. Um arquivo JSON será baixado com todos os seus dados

### Importar Dados

1. Vá em "Perfil"
2. Clique em "Importar Dados"
3. Selecione o arquivo JSON exportado anteriormente
4. Seus dados serão restaurados

**Formato do JSON:**
```json
{
  "xp": 150,
  "level": 2,
  "completedChallenges": [1, 2, 3],
  "earnedBadges": [1, 2],
  "reflections": {
    "1": {
      "learned": "...",
      "expected": "...",
      "different": "...",
      "confidence": "...",
      "lessons": "...",
      "completedAt": "2026-02-05T..."
    }
  },
  "createdAt": "2026-02-05T...",
  "lastUpdated": "2026-02-05T...",
  "exportedAt": "2026-02-05T...",
  "version": "1.0"
}
```

## 🎨 Personalização

### Cores

As cores podem ser facilmente alteradas editando as variáveis CSS em `css/styles.css`:

```css
:root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #8b5cf6;
    --accent: #ec4899;
    /* ... */
}
```

### Conteúdo

Para adicionar ou modificar cartões e desafios, edite o arquivo `js/data.js`:

- `copingCards`: Array com os cartões de enfrentamento
- `challenges`: Array com os desafios
- `badges`: Array com as conquistas

### Fontes

O projeto usa a fonte [Inter](https://fonts.google.com/specimen/Inter) do Google Fonts. Para alterar, modifique o link no `index.html` e a declaração em `css/styles.css`.

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização (CSS Variables, Grid, Flexbox)
- **JavaScript (ES6+)** - Lógica da aplicação
- **localStorage** - Persistência de dados
- **Google Fonts** - Tipografia (Inter)

## 📱 Compatibilidade

- ✅ Chrome/Edge (último)
- ✅ Firefox (último)
- ✅ Safari (último)
- ✅ Mobile (iOS Safari, Chrome Android)

## 🔒 Privacidade

Todos os dados são armazenados **localmente no seu navegador**. Nenhuma informação é enviada para servidores externos. O projeto não coleta, rastreia ou compartilha nenhum dado pessoal.

### Importante
- Dados são salvos no localStorage do navegador
- Limpar dados do navegador apagará seu progresso
- Use Export/Import para fazer backup
- Cada navegador/dispositivo tem dados independentes

## 📄 Licença

Este projeto é baseado em conteúdo terapêutico da **PsicointerAção: Recursos Terapêuticos Interativos**.

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novos recursos
- Adicionar novos cartões ou desafios
- Melhorar a interface

## 📞 Suporte

Para questões técnicas ou dúvidas sobre o projeto, abra uma issue no GitHub.

Para questões relacionadas ao conteúdo terapêutico, consulte um profissional de saúde mental qualificado.

---

**Desenvolvido com 💜 para ajudar no gerenciamento de ansiedade e desenvolvimento de tolerância à incerteza**

🌱 _"A jornada de mil quilômetros começa com o primeiro passo"_
