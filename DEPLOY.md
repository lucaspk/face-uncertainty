# Guia de Deploy - Face a Incerteza

Este documento contém instruções detalhadas para fazer o deploy da aplicação em diferentes plataformas.

## 📦 GitHub Pages (Recomendado)

### Pré-requisitos
- Conta no GitHub
- Git instalado localmente

### Passo 1: Criar Repositório

```bash
# Navegue até o diretório do projeto
cd face_uncertainty

# Inicialize o repositório git (se ainda não foi feito)
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "Initial commit: Face a Incerteza application"
```

### Passo 2: Conectar com GitHub

```bash
# Crie um repositório no GitHub (via interface web)
# Depois conecte o repositório local

git remote add origin https://github.com/SEU-USUARIO/face-uncertainty.git

# Push para o GitHub
git branch -M main
git push -u origin main
```

### Passo 3: Ativar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save**
6. Aguarde alguns minutos

### Passo 4: Acessar

Seu site estará disponível em:
```
https://SEU-USUARIO.github.io/face-uncertainty/
```

### Atualizações Futuras

```bash
# Faça suas modificações
git add .
git commit -m "Descrição das mudanças"
git push

# O GitHub Pages atualizará automaticamente em ~1-5 minutos
```

---

## 🚀 Netlify

### Via Interface Web (Drag & Drop)

1. Acesse [netlify.com](https://www.netlify.com/)
2. Crie uma conta ou faça login
3. Clique em "Add new site" > "Deploy manually"
4. Arraste a pasta `face_uncertainty` para a área de upload
5. Aguarde o deploy completar
6. Seu site estará disponível em um domínio `.netlify.app`

### Via CLI

```bash
# Instale o Netlify CLI
npm install -g netlify-cli

# Faça login
netlify login

# Deploy
cd face_uncertainty
netlify deploy --prod
```

### Via Git

1. Push seu código para GitHub (como acima)
2. No Netlify, clique em "Add new site" > "Import from Git"
3. Conecte seu repositório GitHub
4. Configurações:
   - Build command: (deixe vazio)
   - Publish directory: `/`
5. Clique em "Deploy site"

---

## 🔷 Vercel

### Via CLI

```bash
# Instale o Vercel CLI
npm install -g vercel

# Deploy
cd face_uncertainty
vercel --prod
```

### Via Interface Web

1. Acesse [vercel.com](https://vercel.com/)
2. Faça login com GitHub
3. Clique em "Add New Project"
4. Selecione seu repositório
5. Configure:
   - Framework Preset: Other
   - Build Command: (deixe vazio)
   - Output Directory: (deixe vazio)
6. Clique em "Deploy"

---

## 📂 Surge.sh

```bash
# Instale o Surge
npm install -g surge

# Deploy
cd face_uncertainty
surge
```

Siga as instruções no terminal:
- Confirme o diretório
- Escolha um subdomínio
- Aguarde o upload

---

## 🌐 GitLab Pages

### Estrutura

Crie um arquivo `.gitlab-ci.yml` na raiz:

```yaml
pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts:
    paths:
      - public
  only:
    - main
```

### Deploy

```bash
# Push para GitLab
git remote add gitlab https://gitlab.com/SEU-USUARIO/face-uncertainty.git
git push gitlab main
```

Site disponível em: `https://SEU-USUARIO.gitlab.io/face-uncertainty/`

---

## 🐳 Docker (Opcional)

Crie um `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build e run:

```bash
docker build -t face-uncertainty .
docker run -p 8080:80 face-uncertainty
```

Acesse em: `http://localhost:8080`

---

## 🔧 Servidor Local para Testes

### Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Node.js

```bash
# Com npx (sem instalar)
npx http-server

# Ou instale globalmente
npm install -g http-server
http-server
```

### PHP

```bash
php -S localhost:8000
```

Acesse em: `http://localhost:8000`

---

## ✅ Verificação Pós-Deploy

Após o deploy, verifique:

- [ ] Navegação entre seções funciona
- [ ] Cartões de enfrentamento carregam corretamente
- [ ] Desafios são exibidos
- [ ] Modal de desafio abre e fecha
- [ ] Completar desafio funciona
- [ ] XP é adicionado
- [ ] Perfil exibe informações corretas
- [ ] Export de dados funciona
- [ ] Import de dados funciona
- [ ] Design responsivo em mobile
- [ ] localStorage persiste dados

### Teste no Console

```javascript
// No console do navegador
localStorage.getItem('face_uncertainty_data')
```

Deve retornar um objeto JSON com seus dados.

---

## 🔒 HTTPS

Todas as plataformas mencionadas (GitHub Pages, Netlify, Vercel, etc.) fornecem HTTPS automaticamente. Não é necessária configuração adicional.

---

## 📊 Analytics (Opcional)

Se desejar adicionar analytics, adicione ao `<head>` do `index.html`:

### Google Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible (Privacy-friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🐛 Troubleshooting

### localStorage não funciona

**Problema**: Dados não são salvos entre sessões.

**Solução**:
- Verifique se o navegador não está em modo anônimo/privado
- Verifique se localStorage está habilitado nas configurações
- Verifique se não está bloqueado por extensões

### Arquivo não encontrado (404)

**Problema**: Arquivos CSS/JS não carregam.

**Solução**:
- Verifique caminhos relativos no `index.html`
- Certifique-se de que todos os arquivos foram incluídos no deploy
- Limpe cache do navegador (Ctrl+Shift+R)

### GitHub Pages não atualiza

**Problema**: Mudanças não aparecem no site.

**Solução**:
- Aguarde 5-10 minutos
- Limpe cache do navegador
- Verifique se o push foi feito para a branch correta
- Verifique Actions no GitHub para erros de build

---

## 💡 Dicas de Otimização

### 1. Minificar arquivos (opcional)

```bash
# CSS
npx clean-css-cli -o css/styles.min.css css/styles.css

# JavaScript
npx terser js/*.js -o js/bundle.min.js
```

### 2. Comprimir imagens

Use ferramentas como:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- ImageOptim (macOS)

### 3. Adicionar meta tags

Já incluídas no projeto, mas verifique:
- `<meta name="description">`
- `<meta name="viewport">`
- Open Graph tags para compartilhamento social

---

## 📱 PWA (Progressive Web App)

Para transformar em PWA, adicione:

### manifest.json

```json
{
  "name": "Face a Incerteza",
  "short_name": "Face Incerteza",
  "description": "Aplicativo de autoajuda para ansiedade",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f8fafc",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "/assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### service-worker.js

Descomente no `app.js` e crie o arquivo `sw.js`.

---

## 📞 Suporte

Para problemas de deploy, consulte:
- [GitHub Pages Docs](https://pages.github.com/)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)

---

**Última atualização**: 05/02/2026
