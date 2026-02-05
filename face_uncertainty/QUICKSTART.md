# 🚀 Guia Rápido - Face a Incerteza

## Começar em 2 Minutos

### 1. Teste Localmente

```bash
# Abra o terminal na pasta do projeto
cd face_uncertainty

# Inicie um servidor local (escolha um):

# Python 3
python -m http.server 8000

# OU Node.js
npx http-server

# OU PHP
php -S localhost:8000
```

Abra o navegador em: `http://localhost:8000`

### 2. Deploy no GitHub Pages

```bash
# Configure o Git
git init
git add .
git commit -m "First commit"

# Crie um repositório no GitHub e conecte
git remote add origin https://github.com/SEU-USUARIO/face-uncertainty.git
git push -u origin main

# No GitHub:
# Settings → Pages → Source: main branch
```

Pronto! Site disponível em: `https://SEU-USUARIO.github.io/face-uncertainty/`

---

## 📱 Como Usar

### Cartões de Enfrentamento
1. Clique em "Cartões"
2. Clique "Começar"
3. Navegue com setas ou swipe (mobile)

### Desafios
1. Clique em "Desafios"
2. Escolha um desafio
3. Complete no mundo real
4. Volte e preencha reflexões
5. Ganhe XP e suba de nível!

### Perfil
- Veja seu progresso
- Exporte/importe dados
- Acompanhe conquistas

---

## 🛠️ Personalizar

### Mudar Cores
Edite `css/styles.css`:
```css
:root {
    --primary: #6366f1;  /* Sua cor aqui */
}
```

### Adicionar Desafios
Edite `js/data.js`:
```javascript
challenges.push({
    id: 19,
    title: "Novo Desafio",
    description: "Descrição...",
    category: "Categoria",
    difficulty: "easy", // easy, medium, hard
    xp: 10
});
```

---

## ❓ Problemas Comuns

**Dados não salvam**: Desabilite modo anônimo

**404 ao abrir direto**: Use um servidor local

**Não atualiza**: Limpe cache (Ctrl+Shift+R)

---

## 📚 Documentação Completa

- `README.md` - Documentação completa
- `DEPLOY.md` - Guia de deploy detalhado

---

**Divirta-se! 🌱**
