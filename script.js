const defaultConfig = {
    profile_name: "Emanuelle",
    profile_title: "Estudante",
    about_text: "Oii gente eu sou a manu, tenho 17 anos fiz esse mês de novembro, sou uma pessoa sorridente e muito gentil, os aspectos da minha personalidade e ser uma pessoa de muita opnião e educação",
    personality_text: "Sou uma pessoa criativa, apaixonada por aprender coisas novas e sempre em busca de desafios. Gosto de me conectar com pessoas e compartilhar experiências. Valorizo a autenticidade e acredito que acredito que cada dia é uma oportunidade para crescer e evoluir.",
    interests_text: "Tenho diversos interesses que vão desde tecnologia e design até música e viagens. Adoro explorar novas culturas, experimentar diferentes culinárias e me manter atualizado com as últimas tendências. Nos momentos livres, gosto de ler, assistir filmes e passar tempo com amigos e família.",
    background_color: "#667eea",
    primary_color: "#a855f7",
    text_color: "#ffffff",
    card_color: "rgba(255, 255, 255, 0.15)",
    accent_color: "#c084fc",
    font_family: "Segoe UI",
    font_size: 16
};

// Esta função atualiza o conteúdo do texto baseado nas configurações.
async function onConfigChange(config) {
    const profileName = config.profile_name || defaultConfig.profile_name;
    const profileTitle = config.profile_title || defaultConfig.profile_title;
    const aboutText = config.about_text || defaultConfig.about_text;
    const personalityText = config.personality_text || defaultConfig.personality_text;
    const interestsText = config.interests_text || defaultConfig.interests_text;

    // Atualiza o texto dos elementos
    if (document.getElementById('profileName')) {
        document.getElementById('profileName').textContent = profileName;
    }
    if (document.getElementById('profileTitle')) {
        document.getElementById('profileTitle').textContent = profileTitle;
    }
    
    // Atualiza o texto nas abas, mantendo o conteúdo original do HTML se não houver configuração externa.
    if (document.getElementById('aboutText')) {
        // Se o conteúdo do HTML já estiver preenchido, prioriza o HTML. Caso contrário, usa o padrão.
        document.getElementById('aboutText').textContent = document.getElementById('aboutText').textContent.trim() ? document.getElementById('aboutText').textContent : aboutText;
    }
    if (document.getElementById('personalityText')) {
        document.getElementById('personalityText').textContent = document.getElementById('personalityText').textContent.trim() ? document.getElementById('personalityText').textContent : personalityText;
    }
    if (document.getElementById('interestsText')) {
        document.getElementById('interestsText').textContent = document.getElementById('interestsText').textContent.trim() ? document.getElementById('interestsText').textContent : interestsText;
    }

    // A parte de estilização dinâmica (mantida para compatibilidade com ambiente externo)
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.style.background = config.card_color || defaultConfig.card_color; 
    }

    const profilePhoto = document.getElementById('profilePhoto');
    if (profilePhoto) {
        profilePhoto.style.background = `linear-gradient(135deg, ${config.accent_color || defaultConfig.accent_color} 0%, ${config.primary_color || defaultConfig.primary_color} 100%)`; 
    }
}

// O restante da função mapToCapabilities (mantido para compatibilidade do SDK)
function mapToCapabilities(config) {
    // ... (função mapToCapabilities permanece inalterada se for necessária para o SDK)
    return {
        recolorables: [
            {
                get: () => config.background_color || defaultConfig.background_color,
                set: (value) => {
                    config.background_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ background_color: value });
                    }
                }
            },
            {
                get: () => config.primary_color || defaultConfig.primary_color,
                set: (value) => {
                    config.primary_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ primary_color: value });
                    }
                }
            },
            {
                get: () => config.text_color || defaultConfig.text_color,
                set: (value) => {
                    config.text_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ text_color: value });
                    }
                }
            },
            {
                get: () => config.card_color || defaultConfig.card_color,
                set: (value) => {
                    config.card_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ card_color: value });
                    }
                }
            },
             {
                get: () => config.accent_color || defaultConfig.accent_color,
                set: (value) => {
                    config.accent_color = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ accent_color: value });
                    }
                }
            },
        ],
        textFields: [
            {
                get: () => config.profile_name || defaultConfig.profile_name,
                set: (value) => {
                    config.profile_name = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ profile_name: value });
                    }
                },
            },
             {
                get: () => config.profile_title || defaultConfig.profile_title,
                set: (value) => {
                    config.profile_title = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ profile_title: value });
                    }
                },
            },
            {
                get: () => config.about_text || defaultConfig.about_text,
                set: (value) => {
                    config.about_text = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ about_text: value });
                    }
                },
            },
            {
                get: () => config.personality_text || defaultConfig.personality_text,
                set: (value) => {
                    config.personality_text = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ personality_text: value });
                    }
                },
            },
             {
                get: () => config.interests_text || defaultConfig.interests_text,
                set: (value) => {
                    config.interests_text = value;
                    if (window.elementSdk) {
                        window.elementSdk.setConfig({ interests_text: value });
                    }
                },
            },
        ],
    };
}


// ===============================================
// LÓGICA DE ATIVAÇÃO DAS ABAS
// ===============================================

/**
 * Alterna entre a aba e o conteúdo ativo.
 * @param {string} tabId O ID do conteúdo da aba a ser ativado (ex: 'sobre', 'personalidade').
 */
function activateTab(tabId) {
    // 1. Desativa todos os botões de aba (remove a classe 'active')
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 2. Desativa todo o conteúdo da aba (remove a classe 'active', que esconde o conteúdo)
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 3. Ativa o botão clicado
    const clickedButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    // 4. Ativa o conteúdo correspondente
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// 5. Adiciona event listeners a todos os botões quando o DOM estiver carregado
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        // Para cada botão, adiciona um escutador de evento de clique
        button.addEventListener('click', (event) => {
            // Pega o valor do atributo 'data-tab', que é o ID do conteúdo
            const tabId = event.currentTarget.getAttribute('data-tab');
            activateTab(tabId);
        });
    });
}

// Inicia a aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Aplica as configurações iniciais de texto
    onConfigChange({});
    
    // Configura o sistema de abas
    setupTabSwitching();
});