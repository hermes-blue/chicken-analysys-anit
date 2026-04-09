import { brands } from './src/data.js';
import { getInterpretation, formatCurrency } from './src/interpreter.js';

// --- State ---
let state = {
    selectedBrand: null,
    conditions: {
        capital: 'low',
        location: 'good',
        labor: 'staff1'
    },
    currentBrandIndex: 0
};

// DOM Elements will be retrieved dynamically inside functions for maximum reliability

// --- Initialization ---
function init() {
    console.log("App Initialized");
    renderBrandHero();
    setupEventListeners();
}

// --- Renderers ---
function renderBrandHero() {
    const brandHeroSelector = document.getElementById('brand-hero-selector');
    if (!brandHeroSelector) return;

    const brand = brands[state.currentBrandIndex];
    brandHeroSelector.innerHTML = `
        <div class="brand-hero-display">
            <div class="nav-btn prev">
                <i data-lucide="chevron-left"></i>
            </div>
            
            <div class="brand-hero-card" data-id="${brand.id}">
                <div class="brand-info">
                    <h3>${brand.name}</h3>
                    <p>${brand.tagline}</p>
                </div>
                <div class="start-hint">
                    상세 정보 보러가기 <i data-lucide="arrow-right"></i>
                </div>
            </div>

            <div class="nav-btn next">
                <i data-lucide="chevron-right"></i>
            </div>
        </div>
    `;
    
    if (window.lucide) window.lucide.createIcons();
}

function showScreen(screenId) {
    console.log("Switching to screen:", screenId);
    const screenElements = {
        brands: document.getElementById('brand-selection'),
        setup: document.getElementById('condition-setup'),
        analysis: document.getElementById('analysis-screen')
    };

    Object.values(screenElements).forEach(s => {
        if (s) s.classList.add('hidden');
    });

    const target = screenElements[screenId];
    if (target) {
        target.classList.remove('hidden');
    } else {
        console.error("Target screen not found:", screenId);
    }
    window.scrollTo(0, 0);
}

function renderAnalysis() {
    const brand = state.selectedBrand;
    const analysisBrandHeader = document.getElementById('analysis-brand-header');
    const answerContainer = document.getElementById('answer-container');
    
    if (!analysisBrandHeader || !answerContainer) return;

    // Render Header Only
    analysisBrandHeader.innerHTML = `
        <h2 class="analysis-title">${brand.name} 창업 해석</h2>
        <p class="analysis-tagline">"${brand.summary}"</p>
    `;

    answerContainer.innerHTML = '<p class="text-muted" style="text-align: center; margin-top: 20px;">위의 카드 중 궁금한 해석 내용을 클릭해 보세요!</p>';
}

function renderAnswer(qKey) {
    const brand = state.selectedBrand;
    const answerContainer = document.getElementById('answer-container');
    
    if (!answerContainer) return;

    const { advice, alerts } = getInterpretation(brand, state.conditions);
    
    let html = `
        <div class="answer-card">
            <h4><i data-lucide="message-circle"></i> 답변 드립니다</h4>
            <div class="interpretations">
                ${brand.interpretations[qKey] ? 
                    brand.interpretations[qKey].map(text => `<p style="margin-bottom: 12px;">• ${text}</p>`).join('') :
                    '<p>이 부분에 대한 상세 데이터가 아직 준비 중입니다.</p>'
                }
            </div>
        </div>
    `;

    // Only show relevant alerts/advice for the "Risks" or "Profit" question
    if (qKey === 'risks' || qKey === 'initialCost') {
        const combined = [...alerts, ...advice];
        if (combined.length > 0) {
            html += `
                <div class="analysis-alerts">
                    ${combined.map(item => `
                        <div class="answer-card" style="border-left-color: ${item.type === 'risk' ? '#ef4444' : '#10b981'}">
                            <span class="badge ${item.type}">${item.type === 'risk' ? '위험신호' : '전문가 조언'}</span>
                            <p>${item.text}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    answerContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
    
    // Smooth scroll to answer
    answerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Event Handlers ---
function setupEventListeners() {
    const brandHeroSelector = document.getElementById('brand-hero-selector');
    if (brandHeroSelector) {
        brandHeroSelector.addEventListener('click', (e) => {
            const prevBtn = e.target.closest('.prev');
            const nextBtn = e.target.closest('.next');
            const heroCard = e.target.closest('.brand-hero-card');

            if (prevBtn) {
                state.currentBrandIndex = (state.currentBrandIndex - 1 + brands.length) % brands.length;
                renderBrandHero();
            } else if (nextBtn) {
                state.currentBrandIndex = (state.currentBrandIndex + 1) % brands.length;
                renderBrandHero();
            } else if (heroCard) {
                const id = heroCard.dataset.id;
                state.selectedBrand = brands.find(b => b.id === id);
                showScreen('setup');
            }
        });
    }

    // Condition Toggles
    document.querySelectorAll('.toggle-group button').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.parentElement;
            const condition = group.dataset.condition;
            const value = btn.dataset.value;

            // Update UI
            group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update State
            state.conditions[condition] = value;
        });
    });

    // Start Analysis Btn
    const startBtn = document.getElementById('start-analysis');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("Start analysis clicked");
            const loader = document.getElementById('loader');
            if (loader) loader.classList.remove('hidden');
            
            setTimeout(() => {
                if (loader) loader.classList.add('hidden');
                renderAnalysis();
                showScreen('analysis');
            }, 1200);
        });
    }

    // Question Buttons
    document.querySelectorAll('.q-btn-card').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active style from all others
            document.querySelectorAll('.q-btn-card').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const q = btn.dataset.q;
            renderAnswer(q);
        });
    });

    // Back Buttons
    const toBrands = document.getElementById('to-brands');
    if (toBrands) toBrands.addEventListener('click', () => showScreen('brands'));

    const toSetup = document.getElementById('to-setup');
    if (toSetup) toSetup.addEventListener('click', () => showScreen('setup'));

    const restartBtn = document.getElementById('restart');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            state.selectedBrand = null;
            showScreen('brands');
        });
    }
}

// --- Start ---
init();
