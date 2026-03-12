(() => {
const ns = window.FaceUncertainty || (window.FaceUncertainty = {});

const copingCards = [
    {
        id: 1,
        text: "Minhas experiências passadas não podem me impedir de ter sucesso no futuro.",
        icon: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="50" cy="50" r="35" stroke="#6366f1" stroke-width="4"/>
            <path d="M50 20 L55 30 L50 50 L45 30 Z" fill="#f59e0b"/>
            <circle cx="50" cy="50" r="3" fill="#6366f1"/>
        </svg>`
    },
    {
        id: 2,
        text: "Pensamentos são apenas pensamentos. Eles não são realidade.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="45" rx="30" ry="20" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
            <ellipse cx="35" cy="60" rx="15" ry="10" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
            <ellipse cx="20" cy="70" rx="8" ry="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
        </svg>`
    },
    {
        id: 3,
        text: "Para se lembrar durante o ataque de pânico:\n\n• Essas sensações não são perigosas;\n• Vou apenas deixar meu corpo passar por isso;\n• Eu sobrevivi a ataques de pânico antes e vou sobreviver a esse também;\n• Nada sério vai acontecer.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" fill="#fef3c7"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="3"/>
            <path d="M30 40 L40 30 M70 40 L60 30 M50 35 L50 25" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M35 55 Q50 70 65 55" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" fill="none"/>
        </svg>`
    },
    {
        id: 4,
        text: "Permanecendo presente e focado em minha tarefa, minha ansiedade diminuirá.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="35" fill="#fecaca" stroke="#ef4444" stroke-width="3"/>
            <circle cx="50" cy="50" r="25" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/>
            <circle cx="50" cy="50" r="15" fill="#fef2f2" stroke="#ef4444" stroke-width="2"/>
            <circle cx="50" cy="50" r="5" fill="#ef4444"/>
        </svg>`
    },
    {
        id: 5,
        text: "As coisas não estão tão ruins como estou fazendo parecer.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="45" r="25" fill="#d1fae5" stroke="#10b981" stroke-width="3"/>
            <path d="M35 40 L40 45 L48 35" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="50" cy="45" r="25" fill="none" stroke="#10b981" stroke-width="3"/>
        </svg>`
    },
    {
        id: 6,
        text: "Vou resistir ao impulso de me isolar. Falarei com um amigo ou familiar. Posso não ter vontade de fazer isso agora, mas sei que depois disso, vou me sentir melhor.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="35" cy="40" r="12" fill="#ddd6fe" stroke="#8b5cf6" stroke-width="2"/>
            <path d="M35 52 Q35 65 35 65" stroke="#8b5cf6" stroke-width="2"/>
            <circle cx="65" cy="40" r="12" fill="#fae8ff" stroke="#d946ef" stroke-width="2"/>
            <path d="M65 52 Q65 65 65 65" stroke="#d946ef" stroke-width="2"/>
            <ellipse cx="42" cy="75" rx="8" ry="4" fill="#ddd6fe"/>
            <ellipse cx="58" cy="75" rx="8" ry="4" fill="#fae8ff"/>
        </svg>`
    },
    {
        id: 7,
        text: "Não há problema em pedir ajuda. Dias difíceis não apagam o progresso que fiz.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <path d="M50 30 L55 40 L50 70 L45 40 Z" fill="#fbcfe8" stroke="#ec4899" stroke-width="2"/>
            <rect x="35" y="45" width="30" height="25" rx="5" fill="#fce7f3" stroke="#ec4899" stroke-width="2"/>
            <path d="M40 55 Q50 50 60 55" stroke="#ec4899" stroke-width="2" fill="none"/>
        </svg>`
    },
    {
        id: 8,
        text: "Eu posso dar um passo de cada vez. Como diz o provérbio chinês: \"uma jornada de mil quilômetros começa com o primeiro passo\".",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <ellipse cx="30" cy="40" rx="12" ry="8" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" transform="rotate(-20 30 40)"/>
            <ellipse cx="50" cy="55" rx="12" ry="8" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2" transform="rotate(20 50 55)"/>
            <ellipse cx="70" cy="40" rx="12" ry="8" fill="#93c5fd" stroke="#3b82f6" stroke-width="2" transform="rotate(-20 70 40)"/>
        </svg>`
    },
    {
        id: 9,
        text: "A autocrítica não ajuda, apenas contribui para o problema, me fazendo sentir pior. Vou tentar responder à minha autocrítica com pensamentos de autocompaixão.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <path d="M50 35 Q30 50 50 70 Q70 50 50 35" fill="#fecdd3" stroke="#f43f5e" stroke-width="2"/>
            <path d="M35 45 Q35 40 40 40 M65 45 Q65 40 60 40" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 10,
        text: "Essa reação corporal desproporcional não é minha. Eu não vou me culpar por me sentir assim.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="45" r="18" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
            <path d="M42 42 L42 48 M58 42 L58 48" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
            <ellipse cx="50" cy="70" rx="25" ry="15" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
            <path d="M40 65 L40 75 M60 65 L60 75" stroke="#6366f1" stroke-width="2"/>
        </svg>`
    },
    {
        id: 11,
        text: "Já fiz isso antes, então posso fazer de novo. Vou fazer o melhor que puder.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <rect x="35" y="35" width="30" height="40" rx="3" fill="#dbeafe" stroke="#3b82f6" stroke-width="2"/>
            <path d="M42 45 L48 51 L58 41" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    },
    {
        id: 12,
        text: "Ser perfeito(a) não é possível. Lembrarei de definir metas gerenciáveis, caso contrário, eu ficarei inevitavelmente, desapontado(a) e insatisfeito(a).",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <polygon points="50,20 60,45 85,45 65,60 70,85 50,70 30,85 35,60 15,45 40,45" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
        </svg>`
    },
    {
        id: 13,
        text: "Eu posso estar ansioso(a) e ainda assim lidar com essa situação.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <rect x="25" y="35" width="50" height="40" rx="5" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/>
            <circle cx="40" cy="48" r="3" fill="#a855f7"/>
            <circle cx="60" cy="48" r="3" fill="#a855f7"/>
            <path d="M35 62 Q50 55 65 62" stroke="#a855f7" stroke-width="2" stroke-linecap="round" fill="none"/>
        </svg>`
    },
    {
        id: 14,
        text: "Eu estendo a mesma gentileza que mostro aos meus entes queridos para mim.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <path d="M50 30 Q35 20 25 30 Q15 40 25 55 L50 75 L75 55 Q85 40 75 30 Q65 20 50 30" fill="#fecdd3" stroke="#f43f5e" stroke-width="2"/>
            <path d="M40 40 Q40 35 45 35 M60 40 Q60 35 55 35" stroke="#f43f5e" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 15,
        text: "Pode não parecer agora, mas esse sentimento passará e não vai durar para sempre.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <rect x="30" y="55" width="6" height="25" rx="3" fill="#86efac" stroke="#22c55e" stroke-width="1.5"/>
            <rect x="38" y="45" width="6" height="35" rx="3" fill="#86efac" stroke="#22c55e" stroke-width="1.5"/>
            <rect x="46" y="35" width="6" height="45" rx="3" fill="#4ade80" stroke="#22c55e" stroke-width="1.5"/>
            <rect x="54" y="40" width="6" height="40" rx="3" fill="#86efac" stroke="#22c55e" stroke-width="1.5"/>
            <rect x="62" y="50" width="6" height="30" rx="3" fill="#86efac" stroke="#22c55e" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 16,
        text: "Resistirei aos impulsos de evitar situações que provocam ansiedade. Evitar pode parecer um método eficaz, mas é uma estratégia de curto prazo e piora minha ansiedade com o tempo.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="30" fill="#ddd6fe" stroke="#8b5cf6" stroke-width="3"/>
            <path d="M50 30 L50 50 L65 50" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"/>
            <polygon points="68,50 63,45 63,55" fill="#8b5cf6"/>
        </svg>`
    },
    {
        id: 17,
        text: "Um ataque de pânico é sempre temporário. Vai passar.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="35" r="15" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
            <ellipse cx="50" cy="60" rx="20" ry="8" fill="#d9f99d" stroke="#84cc16" stroke-width="2"/>
            <rect x="48" y="45" width="4" height="10" fill="#84cc16"/>
            <path d="M35 25 L30 20 M50 18 L50 12 M65 25 L70 20" stroke="#eab308" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 18,
        text: "Esta não é uma emergência real. Posso desacelerar e pensar no que preciso fazer.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="45" r="20" fill="#fecaca" stroke="#ef4444" stroke-width="2"/>
            <path d="M42 40 Q42 35 47 35 M58 40 Q58 35 53 35" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
            <ellipse cx="50" cy="70" rx="18" ry="12" fill="#fecaca" stroke="#ef4444" stroke-width="2"/>
            <rect x="35" y="62" width="10" height="3" rx="1.5" fill="#fca5a5"/>
            <rect x="55" y="62" width="10" height="3" rx="1.5" fill="#fca5a5"/>
        </svg>`
    },
    {
        id: 19,
        text: "Já sobrevivi a ataques de pânico antes e vou sobreviver a esse também.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <path d="M50 25 L55 35 L50 70 L45 35 Z" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>
            <ellipse cx="40" cy="60" rx="8" ry="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <ellipse cx="60" cy="60" rx="8" ry="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <path d="M30 55 L25 60 M70 55 L75 60" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 20,
        text: "Esse sentimento não é confortável, mas eu posso lidar com isso.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="25" fill="#fff" stroke="#fbbf24" stroke-width="3"/>
            <circle cx="50" cy="50" r="8" fill="#fef3c7" stroke="#fbbf24" stroke-width="2"/>
            <path d="M50 30 L55 40 M50 30 L45 40 M70 50 L60 50 M30 50 L40 50 M62 62 L58 58 M38 62 L42 58" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 21,
        text: "Posso lidar com a dúvida e aceitar a incerteza.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="35" r="20" fill="#fef9c3" stroke="#facc15" stroke-width="2"/>
            <path d="M40 30 Q50 20 60 30" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M42 38 L42 42 M58 38 L58 42" stroke="#eab308" stroke-width="2" stroke-linecap="round"/>
            <path d="M50 55 L50 75" stroke="#eab308" stroke-width="3" stroke-linecap="round"/>
        </svg>`
    },
    {
        id: 22,
        text: "Nada precisa ser perfeito. Meu melhor é bom o suficiente.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <polygon points="50,25 58,45 80,45 62,58 68,78 50,65 32,78 38,58 20,45 42,45" fill="#fcd34d" stroke="#f59e0b" stroke-width="2"/>
            <polygon points="50,30 56,43 68,43 58,51 62,63 50,55 38,63 42,51 32,43 44,43" fill="#fef3c7"/>
        </svg>`
    },
    {
        id: 23,
        text: "O que estou sentindo é uma emoção natural e vai passar.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <circle cx="35" cy="50" r="18" fill="#bae6fd" stroke="#0ea5e9" stroke-width="2"/>
            <circle cx="50" cy="50" r="18" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
            <circle cx="65" cy="50" r="18" fill="#fca5a5" stroke="#ef4444" stroke-width="2"/>
            <path d="M28 48 Q28 43 32 43 M42 48 Q42 43 38 43" stroke="#0284c7" stroke-width="1.5"/>
            <path d="M43 48 Q43 43 47 43 M57 48 Q57 43 53 43" stroke="#ca8a04" stroke-width="1.5"/>
            <path d="M58 48 Q58 43 62 43 M72 48 Q72 43 68 43" stroke="#dc2626" stroke-width="1.5"/>
        </svg>`
    },
    {
        id: 24,
        text: "Cometer um erro não significa que sou um fracasso. Todo mundo comete erros.",
        icon: `<svg viewBox="0 0 100 100" fill="none">
            <rect x="35" y="60" width="8" height="25" rx="2" fill="#86efac" stroke="#22c55e" stroke-width="2"/>
            <ellipse cx="39" cy="45" rx="12" ry="18" fill="#bbf7d0" stroke="#22c55e" stroke-width="2"/>
            <path d="M30 35 Q25 40 28 45 M48 35 Q53 40 50 45" stroke="#16a34a" stroke-width="1.5"/>
            <ellipse cx="39" cy="50" rx="3" ry="5" fill="#dcfce7"/>
        </svg>`
    }
];

const challenges = [
    {
        id: 1,
        title: "Novo trajeto para o trabalho",
        description: "Experimente fazer um novo trajeto para ir ao trabalho, mesmo sem saber como está o trânsito.",
        category: "Rotina",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 2,
        title: "Algo novo do cardápio",
        description: "Experimente pedir algo novo do cardápio em um restaurante.",
        category: "Alimentação",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 3,
        title: "Nova aula",
        description: "Experimente uma nova aula (esporte, dança, idioma).",
        category: "Aprendizado",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 4,
        title: "Lugar desconhecido",
        description: "Visite um lugar onde você nunca esteve antes, como um supermercado ou uma loja.",
        category: "Exploração",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 5,
        title: "Filme sem críticas",
        description: "Assista a um filme no cinema sem ler as críticas prévias.",
        category: "Entretenimento",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 6,
        title: "Restaurante surpresa",
        description: "Que tal procurar um restaurante que você nunca foi, sem olhar as avaliações, e ao chegar lá, experimentar algo diferente do cardápio?",
        category: "Alimentação",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 7,
        title: "Conversa com desconhecido",
        description: "Inicie uma conversa com alguém que você não conhece, seja fazendo uma pergunta ou oferecendo um elogio.",
        category: "Social",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 8,
        title: "Autor desconhecido",
        description: "Experimente ler uma obra de um autor desconhecido.",
        category: "Leitura",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 9,
        title: "Roupa diferente",
        description: "Experimente usar algo novo para você, como uma marca ou cor diferente.",
        category: "Estilo",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 10,
        title: "Decisão rápida",
        description: "Desafie-se a tomar uma decisão rápida e pequena sem se envolver em extensas pesquisas para encontrar a solução ideal.",
        category: "Decisão",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 11,
        title: "Lado diferente da cama",
        description: "Experimente dormir em um lado diferente da cama.",
        category: "Rotina",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 12,
        title: "Novas músicas",
        description: "Expanda seu repertório musical ouvindo músicas que você normalmente não ouviria.",
        category: "Entretenimento",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 13,
        title: "Lugar diferente",
        description: "Sente-se em um lugar diferente do local que você normalmente escolhe.",
        category: "Rotina",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 14,
        title: "Delegue tarefas",
        description: "Delegue tarefas a outras pessoas (filhos, outro familiar ou no trabalho).",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 15,
        title: "Compartilhe vulnerabilidade",
        description: "Experimente compartilhar uma vulnerabilidade sua com pessoas que te conhecem.",
        category: "Social",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 16,
        title: "Sem perguntar onde está",
        description: "Ao ligar ou enviar uma mensagem para um ente querido, resista à necessidade de perguntar onde ele está.",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 17,
        title: "Chegue tarde",
        description: "Chegue dez minutos mais tarde em alguma ocasião informal.",
        category: "Perfeccionismo",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 18,
        title: "Mensagem sem revisar",
        description: "Envie uma mensagem sem ficar verificando várias vezes como você escreveu.",
        category: "Perfeccionismo",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 19,
        title: "Decisão sem confirmação",
        description: "Tome uma pequena decisão hoje sem pedir opinião ou validação de ninguém.",
        category: "Decisão",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 20,
        title: "Mensagem simples",
        description: "Envie uma mensagem sem reler mais de uma vez antes de apertar enviar.",
        category: "Perfeccionismo",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 21,
        title: "Imperfeito de propósito",
        description: "Faça algo de forma apenas boa o suficiente, sem tentar melhorar depois.",
        category: "Perfeccionismo",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 22,
        title: "Pausa sem explicação",
        description: "Faça uma pausa curta hoje sem justificar o motivo para ninguém.",
        category: "Controle",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 23,
        title: "Conversa sem roteiro",
        description: "Inicie uma conversa sem planejar previamente o que vai dizer.",
        category: "Social",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 24,
        title: "Não verificar novamente",
        description: "Realize uma tarefa importante sem checar repetidamente se está correta.",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 25,
        title: "Delegar sem acompanhar",
        description: "Delegue uma tarefa e evite acompanhar ou supervisionar o processo.",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 26,
        title: "Dizer não sei",
        description: "Em uma conversa, permita-se dizer que não sabe algo sem se justificar.",
        category: "Comunicação",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 27,
        title: "Decisão incompleta",
        description: "Tome uma decisão sem ter todas as informações que gostaria.",
        category: "Decisão",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 28,
        title: "Deixar pendente",
        description: "Deixe algo inacabado por algumas horas sem tentar resolver imediatamente.",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 29,
        title: "Feedback aberto",
        description: "Peça feedback a alguém sem antecipar ou se preparar para o que pode ouvir.",
        category: "Social",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 30,
        title: "Compartilhar insegurança",
        description: "Compartilhe uma insegurança sua com alguém de confiança.",
        category: "Social",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 31,
        title: "Silêncio desconfortável",
        description: "Permaneça em silêncio em uma conversa sem tentar preencher o espaço.",
        category: "Social",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 32,
        title: "Plano flexível",
        description: "Planeje algo aceitando conscientemente que pode não sair como esperado.",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 33,
        title: "Errar em algo novo",
        description: "Faça algo novo onde errar é possível e continue mesmo se errar.",
        category: "Aprendizado",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 34,
        title: "Aceitar frustração",
        description: "Observe uma frustração sem tentar resolvê-la ou evitá-la imediatamente.",
        category: "Autocompaixão",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 35,
        title: "Responder com gentileza",
        description: "Responda a uma autocrítica como falaria com um amigo querido.",
        category: "Autocompaixão",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 36,
        title: "Reconhecer esforço",
        description: "Reconheça conscientemente algo difícil que você enfrentou recentemente.",
        category: "Autocompaixão",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 37,
        title: "Não se punir",
        description: "Quando algo não sair como esperado, evite se criticar ou se punir.",
        category: "Autocompaixão",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 38,
        title: "Não antecipar respostas",
        description: "Durante uma conversa, evite imaginar ou antecipar o que a outra pessoa vai responder.",
        category: "Cognitivo",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 39,
        title: "Escolha sem comparação",
        description: "Faça uma escolha sem comparar alternativas ou procurar a melhor opção possível.",
        category: "Decisão",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 40,
        title: "Aceitar ajuda",
        description: "Aceite ajuda de alguém sem tentar assumir o controle da situação.",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 41,
        title: "Não explicar demais",
        description: "Dê uma resposta simples hoje sem se explicar excessivamente.",
        category: "Comunicação",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 42,
        title: "Esperar sem distração",
        description: "Aguarde alguns minutos sem recorrer ao celular ou outra distração.",
        category: "Autocontrole",
        difficulty: "easy",
        xp: 10
    },
    {
        id: 43,
        title: "Expor uma opinião",
        description: "Expresse uma opinião pessoal sem suavizar ou pedir aprovação.",
        category: "Social",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 44,
        title: "Não planejar o próximo passo",
        description: "Realize uma atividade sem planejar mentalmente o que fará em seguida.",
        category: "Controle",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 45,
        title: "Aceitar um convite inesperado",
        description: "Aceite um convite de última hora, mesmo sem saber exatamente como será.",
        category: "Exploração",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 46,
        title: "Não corrigir imediatamente",
        description: "Evite corrigir um pequeno erro seu ou de outra pessoa imediatamente.",
        category: "Perfeccionismo",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 47,
        title: "Ficar com a dúvida",
        description: "Permaneça com uma dúvida sem tentar resolvê-la ou buscar respostas rápidas.",
        category: "Cognitivo",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 48,
        title: "Mostrar limites",
        description: "Diga que não pode ou não quer fazer algo, sem se justificar excessivamente.",
        category: "Comunicação",
        difficulty: "medium",
        xp: 20
    },
    {
        id: 49,
        title: "Aceitar não agradar",
        description: "Faça uma escolha sabendo que nem todos ficarão satisfeitos com ela.",
        category: "Social",
        difficulty: "hard",
        xp: 30
    },
    {
        id: 50,
        title: "Confiar no processo",
        description: "Permita que algo importante siga seu curso sem tentar controlar o resultado.",
        category: "Autocompaixão",
        difficulty: "hard",
        xp: 30
    }    
];

const reflectionQuestions = [
    {
        key: "learned",
        label: "O que você aprendeu?"
    },
    {
        key: "expected",
        label: "Aconteceu como você esperava?"
    },
    {
        key: "different",
        label: "O que foi diferente?"
    },
    {
        key: "confidence",
        label: "O que esse experimento fez por sua confiança?"
    },
    {
        key: "lessons",
        label: "O que isso te ensina sobre as incertezas e riscos?"
    }
];

const badges = [
    {
        id: 1,
        name: "Primeiro Passo",
        description: "Complete seu primeiro desafio",
        icon: "🌱",
        requirement: { type: "challenges_completed", value: 1 }
    },
    {
        id: 2,
        name: "Explorador",
        description: "Complete 5 desafios",
        icon: "🧭",
        requirement: { type: "challenges_completed", value: 5 }
    },
    {
        id: 3,
        name: "Corajoso",
        description: "Complete 10 desafios",
        icon: "🦁",
        requirement: { type: "challenges_completed", value: 10 }
    },
    {
        id: 4,
        name: "Mestre da Incerteza",
        description: "Complete todos os desafios",
        icon: "👑",
        requirement: { type: "challenges_completed", value: challenges.length }
    },
    {
        id: 5,
        name: "Reflexivo",
        description: "Escreva reflexões em 3 desafios",
        icon: "📝",
        requirement: { type: "reflections_written", value: 3 }
    },
    {
        id: 6,
        name: "Nível 5",
        description: "Alcance o nível 5",
        icon: "⭐",
        requirement: { type: "level", value: 5 }
    },
    {
        id: 7,
        name: "Iniciante Social",
        description: "Complete desafios sociais",
        icon: "🤝",
        requirement: { type: "category", value: "Social", count: 2 }
    },
    {
        id: 8,
        name: "Quebrador de Rotinas",
        description: "Complete 3 desafios de rotina",
        icon: "🔄",
        requirement: { type: "category", value: "Rotina", count: 3 }
    }
];

const XP_PER_LEVEL = 100;

function xpForLevel(level) {
    return level * XP_PER_LEVEL;
}

const levelSystem = {
    xpForLevel,

    calculateLevel(xp) {
        let level = 1;
        while (xp >= xpForLevel(level)) {
            level++;
        }
        return level;
    },

    xpForNextLevel(currentLevel) {
        return xpForLevel(currentLevel);
    }
};

ns.data = { copingCards, challenges, reflectionQuestions, badges, levelSystem };

window.copingCards = copingCards;
window.challenges = challenges;
window.reflectionQuestions = reflectionQuestions;
window.badges = badges;
window.levelSystem = levelSystem;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ns.data;
}
})();
