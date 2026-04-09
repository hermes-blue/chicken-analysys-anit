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

// --- DOM Elements ---
const screens = {
    brands: document.getElementById('brand-selection'),
    setup: document.getElementById('condition-setup'),
    analysis: document.getElementById('analysis-screen')
};

const brandHeroSelector = document.getElementById('brand-hero-selector');
const answerContainer = document.getElementById('answer-container');
const summaryCard = document.getElementById('brand-summary-card');

// --- Initialization ---
function init() {
    renderBrandHero();
    setupEventListeners();
}

// --- Renderers ---
function renderBrandHero() {
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
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[screenId].classList.remove('hidden');
    window.scrollTo(0, 0);
}

function renderAnalysis() {
    const brand = state.selectedBrand;
    const { advice, alerts } = getInterpretation(brand, state.conditions);

    // Render Summary
    summaryCard.innerHTML = `
        <h2>${brand.name} 한눈에 보기</h2>
        <p>"${brand.summary}"</p>
        <div class="metric-grid">
            <div class="metric-item">
                <span class="label">초보자 친화도</span>
                <span class="val">${brand.metrics.friendliness}</span>
            </div>
            <div class="metric-item">
                <span class="label">초기 투자금</span>
                <span class="val">${formatCurrency(brand.costs.totalStartup)}</span>
            </div>
            <div class="metric-item">
                <span class="label">매달 매출</span>
                <span class="val">약 ${formatCurrency(brand.monthly.sales)}</span>
            </div>
            <div class="metric-item">
                <span class="label">수익성 수준</span>
                <span class="val">${brand.metrics.profitability}</span>
            </div>
        </div>
    `;

    answerContainer.innerHTML = '<p class="text-muted">위의 질문 중 궁금한 것을 클릭해 보세요!</p>';
}

function renderAnswer(qKey) {
    const brand = state.selectedBrand;
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
    // Brand Hero Clicks & Nav
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
    document.getElementById('start-analysis').addEventListener('click', () => {
        const loader = document.getElementById('loader');
        loader.classList.remove('hidden');
        
        setTimeout(() => {
            loader.classList.add('hidden');
            renderAnalysis();
            showScreen('analysis');
        }, 1200);
    });

    // Question Buttons
    document.querySelectorAll('.q-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.dataset.q;
            renderAnswer(q);
        });
    });

    // Back Buttons
    document.getElementById('to-brands').addEventListener('click', () => showScreen('brands'));
    document.getElementById('to-setup').addEventListener('click', () => showScreen('setup'));
    document.getElementById('restart').addEventListener('click', () => {
        state.selectedBrand = null;
        showScreen('brands');
    });
}

// --- Start ---
init();
