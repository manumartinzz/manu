const defaultConfig = {
    profile_name: "Seu Nome",
    profile_title: "Seu Título ou Profissão",
    about_text: "Olá! Bem-vindo à minha página pessoal. Aqui você pode conhecer um pouco mais sobre mim, minha personalidade e meus interesses. Sinta-se à vontade para explorar as diferentes abas e descobrir mais sobre quem eu sou!",
    personality_text: "Sou uma pessoa criativa, apaixonada por aprender coisas novas e sempre em busca de desafios. Gosto de me conectar com pessoas e compartilhar experiências. Valorizo a autenticidade e acredito que cada dia é uma oportunidade para crescer e evoluir.",
    interests_text: "Tenho diversos interesses que vão desde tecnologia e design até música e viagens. Adoro explorar novas culturas, experimentar diferentes culinárias e me manter atualizado com as últimas tendências. Nos momentos livres, gosto de ler, assistir filmes e passar tempo com amigos e família.",
    background_color: "#667eea",
    primary_color: "#a855f7",
    text_color: "#ffffff",
    card_color: "rgba(255, 255, 255, 0.15)",
    accent_color: "#c084fc",
    font_family: "Segoe UI",
    font_size: 16
};

async function onConfigChange(config) {
    const profileName = config.profile_name || defaultConfig.profile_name;
    const profileTitle = config.profile_title || defaultConfig.profile_title;
    const aboutText = config.about_text || defaultConfig.about_text;
    const personalityText = config.personality_text || defaultConfig.personality_text;
    const interestsText = config.interests_text || defaultConfig.interests_text;
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const cardColor = config.card_color || defaultConfig.card_color;
    const accentColor = config.accent_color || defaultConfig.accent_color;
    const fontFamily = config.font_family || defaultConfig.font_family;
    const fontSize = config.font_size || defaultConfig.font_size;

    document.getElementById('profileName').textContent = profileName;
    document.getElementById('profileTitle').textContent = profileTitle;
    document.getElementById('aboutText').textContent = aboutText;
    document.getElementById('personalityText').textContent = personalityText;
    document.getElementById('interestsText').textContent = interestsText;

    // 🚩 CORREÇÃO PRINCIPAL: 
    // Comentamos ou removemos os estilos de body para permitir que o 'estilo.css' faça o trabalho inicial.
    // document.body.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, ${primaryColor} 100%)`;
    // document.body.style.color = textColor;
    // document.body.style.fontFamily = `${fontFamily}, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`;
    // document.body.style.fontSize = `${fontSize}px`; 

    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        // Se este SDK permitir a alteração dinâmica de cores, esta linha deve permanecer
        contentArea.style.background = cardColor; 
    }

    const profilePhoto = document.getElementById('profilePhoto');
    if (profilePhoto) {
        // Se este SDK permitir a alteração dinâmica de cores, esta linha deve permanecer
        profilePhoto.style.background = `linear-gradient(135deg, ${accentColor} 0%, ${primaryColor} 100%)`; 
    }

    const activeTabButton = document.querySelector('.tab-button.active');
    if (activeTabButton) {
        // Se este SDK permitir a alteração dinâmica de cores, esta linha deve permanecer
        activeTabButton.style.background = primaryColor;
        activeTabButton.style.borderColor = primaryColor;
    }

    // Se a intenção é só alterar o texto, não é ideal manipular o tamanho da fonte via JS
    // se o CSS já está fazendo isso.
    /*
    const headers = document.querySelectorAll('.header h1, .tab-content h2');
    headers.forEach(header => {
        header.style.fontSize = `${fontSize * 2}px`;
    });

    const paragraphs = document.querySelectorAll('.header p, .tab-content p');
    paragraphs.forEach(p => {
        p.style.fontSize = `${fontSize * 1.125}px`;
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.style.fontSize = `${fontSize * 1.125}px`;
    });
    */
}

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
                    // 💡 Nota: Para que a mudança de tema funcione, 
                    // a linha document.body.style.background deve ser reativada AQUI
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
                get: () => config.card_color || defaultConfig