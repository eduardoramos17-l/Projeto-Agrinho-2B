/**
 * LÓGICA DE ESTADO, ACESSIBILIDADE E COMPONENTES RENDERIZADOS VIA ARRAYS
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- ESTADO ACESSIBILIDADE (FONT SIZE) ---
    let currentFontSize = 16;
    const minFontSize = 12;
    const maxFontSize = 24;

    const htmlElement = document.documentElement;
    const btnIncrease = document.getElementById('btn-font-increase');
    const btnDecrease = document.getElementById('btn-font-decrease');
    const btnContrast = document.getElementById('btn-contrast');

    btnIncrease.addEventListener('click', () => {
        if (currentFontSize < maxFontSize) {
            currentFontSize += 2;
            htmlElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    btnDecrease.addEventListener('click', () => {
        if (currentFontSize > minFontSize) {
            currentFontSize -= 2;
            htmlElement.style.fontSize = `${currentFontSize}px`;
        }
    });

    // --- ALTO CONTRASTE ---
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // --- DADOS DO CARROSSEL (BOAS PRÁTICAS) ---
    const carouselData = [
        {
            title: "Regulagem de Equipamentos",
            text: "A calibragem regular evita o desperdício, mitiga o risco de deriva aérea e otimiza a dosagem exata prescrita pelo engenheiro agrônomo."
        },
        {
            title: "Uso Obrigatório de EPI",
            text: "Garantia direta de saúde ao operador de campo. A aplicação correta exige blindagem e proteção com os equipamentos obrigatórios por lei."
        },
        {
            title: "Armazenamento Seguro",
            text: "Instalações isoladas, ventiladas e sinalizadas evitam a contaminação acidental do solo e de fontes de água nas propriedades rurais."
        }
    ];

    let currentCarouselIndex = 0;
    const carouselRoot = document.getElementById('carousel-root');

    function renderCarousel() {
        if (!carouselRoot) return;
        const currentItem = carouselData[currentCarouselIndex];
        
        carouselRoot.innerHTML = `
            <div class="carousel-content">
                <span class="badge" style="background: rgba(255,255,255,0.1); color: #fff;">Diretriz Prática</span>
                <h3>${currentItem.title}</h3>
                <p>"${currentItem.text}"</p>
            </div>
            <div class="carousel-controls">
                <div class="carousel-dots">
                    ${carouselData.map((_, index) => `<span class="dot ${index === currentCarouselIndex ? 'active' : ''}" data-idx="${index}"></span>`).join('')}
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="carousel-btn" id="prev-slide" aria-label="Slide anterior"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="carousel-btn" id="next-slide" aria-label="Próximo slide"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        `;

        // Eventos dos botões do carrossel
        document.getElementById('prev-slide').addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex === 0) ? carouselData.length - 1 : currentCarouselIndex - 1;
            renderCarousel();
        });

        document.getElementById('next-slide').addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex === carouselData.length - 1) ? 0 : currentCarouselIndex + 1;
            renderCarousel();
        });

        // Eventos nos dots
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentCarouselIndex = parseInt(e.target.getAttribute('data-idx'));
                renderCarousel();
            });
        });
    }
    renderCarousel();

    // --- DADOS DOS DEPOIMENTOS (PROVA SOCIAL) ---
    const testimonialsData = [
        {
            quote: "Reduzimos os custos com defensivos químicos em 28% na nossa cooperativa em Cascavel utilizando a tecnologia de aplicação exata e o MIP.",
            author: "Eng. Ricardo Albuquerque",
            role: "Supervisor Agrícola - Cooperativa Oeste Paraná"
        },
        {
            quote: "A pesquisa científica mostra que o uso consciente e o respeito aos períodos de carência protegem a biodiversidade sem afetar o rendimento da safra.",
            author: "Dra. Helena Souza",
            role: "Pesquisadora em Ecotoxicologia e Manejo Sustentável"
        },
        {
            quote: "O treinamento técnico mudou nossa realidade. Hoje aplicamos apenas o necessário, com total segurança para a minha família e funcionários.",
            author: "Silvio Santos Guedes",
            role: "Produtor de Grãos - Região de Guarapuava"
        }
    ];

    const testimonialsRoot = document.getElementById('testimonials-root');
    if (testimonialsRoot) {
        testimonialsRoot.innerHTML = testimonialsData.map(item => `
            <div class="testimonial-card">
                <p class="testimonial-quote">"${item.quote}"</p>
                <p class="testimonial-author">${item.author}</p>
                <p class="testimonial-role">${item.role}</p>
            </div>
        `).join('');
    }

    // --- DADOS DO ACORDEÃO (FAQ) ---
    const faqData = [
        {
            question: "Quem fiscaliza o uso e comércio de agrotóxicos no Paraná?",
            answer: "A fiscalização primária no estado é realizada pela ADAPAR (Agência de Defesa Agropecuária do Paraná), que atua desde o comércio, receituário agronômico até o uso final nas propriedades rurais."
        },
        {
            question: "O que é a deriva e como reduzir o seu impacto?",
            answer: "A deriva ocorre quando as gotas de defensivos são arrastadas pelo vento para fora da área alvo. Reduz-se a deriva calibrando os bicos de pulverização, aplicando com ventos entre 3 e 10 km/h e evitando horários de calor extremo."
        },
        {
            question: "Como funciona a logística reversa de embalagens vazias?",
            answer: "O produtor rural brasileiro possui a obrigação legal de realizar a tríplice lavagem e devolver as embalagens vazias nos postos de recebimento credenciados do inpEV dentro do prazo de um ano após a compra."
        }
    ];

    const faqRoot = document.getElementById('faq-root');
    if (faqRoot) {
        faqRoot.innerHTML = faqData.map((item, index) => `
            <div class="accordion-item" data-index="${index}">
                <button class="accordion-header" aria-expanded="false">
                    <span>${item.question}</span>
                    <i class="fa-solid fa-chevron-down accordion-icon"></i>
                </button>
                <div class="accordion-content">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');

        // Lógica de abertura do acordeão
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.accordion-content');
                const isItemActive = item.classList.contains('active');

                // Fecha todos antes de abrir o atual
                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                    i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                });

                if (!isItemActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
});