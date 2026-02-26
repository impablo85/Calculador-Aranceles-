// Configuración de estudios
const estudios = {
    // RAYOS X
    'rx-espinograma': {
        nombre: 'Espinograma',
        copago1: 10000,
        copago2Plus: 20000,
        categoria: 'Rayos X',
        tipoRX: true
    },
    'rx-otras': {
        nombre: 'Otras RX',
        arancelBase: 1500,
        arancelAdicional: 1000,
        categoria: 'Rayos X',
        tipoRX: true
    },
    
    // ECOGRAFÍAS
    'eco-tv': {
        nombre: 'Eco TV',
        arancel: 10000,
        categoria: 'Ecografías',
        tipoEco: true
    },
    'eco-abdominal': {
        nombre: 'Eco Abdominal',
        arancel: 5000,
        categoria: 'Ecografías',
        tipoEco: true
    },
    'eco-otras': {
        nombre: 'Otras Ecos',
        arancel: 3000,
        categoria: 'Ecografías',
        tipoEco: true
    },
    
    // ECO DOPPLER
    'doppler-periferico': {
        nombre: 'Doppler Periférico',
        copago: 10000,
        categoria: 'Eco Doppler',
        tipoDoppler: true
    },
    'doppler-obstetrico': {
        nombre: 'Doppler Obstétrico',
        copago: 2500,
        categoria: 'Eco Doppler',
        tipoDoppler: true
    },
    
    // MAMOGRAFÍA
    'mamo-bilateral': {
        nombre: 'Mamografía Bilateral',
        arancel: 2000,
        copago: 10000,
        categoria: 'Mamografía',
        tipoMamo: true,
        sinContador: true
    },
    'mamo-unilateral': {
        nombre: 'Mamografía Unilateral',
        arancel: 2000,
        copago: 5000,
        categoria: 'Mamografía',
        tipoMamo: true,
        sinContador: true
    },
    'mamo-tomosintesis': {
        nombre: 'Tomosíntesis',
        copago: 5000,
        categoria: 'Mamografía',
        tipoMamo: true,
        sinContador: true
    },
    
    // DENSITOMETRÍA
    'densitometria': {
        nombre: 'Densitometría',
        arancel: 18000,
        copago: 5000,
        categoria: 'Densitometría'
    },
    
    // ERGOMETRÍA
    'ergometria': {
        nombre: 'Ergometría',
        arancel: 20000,
        copago: 5000,
        categoria: 'Ergometría'
    },
    
    // RESONANCIA MAGNÉTICA
    'resonancia-sin-contraste': {
        nombre: 'Resonancia SIN Contraste (1era)',
        arancel: 30000,
        copago: 15000,
        categoria: 'Resonancia Magnética'
    },
    'resonancia-con-contraste': {
        nombre: 'Resonancia CON Contraste (1era)',
        arancel: 36000,
        copago: 15000,
        categoria: 'Resonancia Magnética'
    },
    'resonancia-subsiguiente-sin': {
        nombre: 'Resonancia SIN Contraste (Subsig.)',
        arancel: 30000,
        copago: 5000,
        categoria: 'Resonancia Magnética'
    },
    'resonancia-subsiguiente-con': {
        nombre: 'Resonancia CON Contraste (Subsig.)',
        arancel: 36000,
        copago: 5000,
        categoria: 'Resonancia Magnética'
    },
    
    // MEDICINA NUCLEAR
    'medicina-nuclear': {
        nombre: 'Medicina Nuclear',
        arancel: 35000,
        copago: 15000,
        categoria: 'Medicina Nuclear'
    },
    
    // TOMOGRAFÍA
    'tomografia-sin-contraste': {
        nombre: 'Tomografía SIN Contraste',
        arancel: 30000,
        copago: 10000,
        categoria: 'Tomografía'
    },
    'tomografia-con-contraste': {
        nombre: 'Tomografía CON Contraste',
        arancel: 36000,
        copago: 10000,
        categoria: 'Tomografía'
    },
    'tomografia-angio': {
        nombre: 'Tomografía AngioMultislice',
        arancel: 36000,
        copago: 15000,
        categoria: 'Tomografía'
    },
    'tomografia-bloqueos': {
        nombre: 'Intervencionismo TC (Bloqueos)',
        arancel: 36000,
        copago: 0,
        categoria: 'Tomografía'
    }
};

const categoriasMain = {
    'Rayos X': { icon: '📷', estudios: ['rx-espinograma', 'rx-otras'] },
    'Ecografías': { icon: '🔊', estudios: ['eco-tv', 'eco-abdominal', 'eco-otras'] },
    'Eco Doppler': { icon: '💓', estudios: ['doppler-periferico', 'doppler-obstetrico'] },
    'Mamografía': { icon: '🩺', estudios: ['mamo-bilateral', 'mamo-unilateral', 'mamo-tomosintesis'] },
    'Densitometría': { icon: '🦴', estudios: ['densitometria'] },
    'Ergometría': { icon: '❤️', estudios: ['ergometria'] },
    'Resonancia Magnética': { icon: '🧲', estudios: ['resonancia-sin-contraste', 'resonancia-con-contraste', 'resonancia-subsiguiente-sin', 'resonancia-subsiguiente-con'] }
};

const categoriasExtra = {
    'Medicina Nuclear': { icon: '☢️', estudios: ['medicina-nuclear'] },
    'Tomografía': { icon: '🔬', estudios: ['tomografia-sin-contraste', 'tomografia-con-contraste', 'tomografia-angio', 'tomografia-bloqueos'] }
};

// Estado de la aplicación
let selectedStudies = {};
let showExtra = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderStudies();
    initializeEventListeners();
});

function renderStudies() {
    const container = document.getElementById('studiesContainer');
    container.innerHTML = '';

    // Renderizar categorías principales
    Object.keys(categoriasMain).forEach(categoria => {
        const categoryDiv = createCategoryElement(categoria, categoriasMain[categoria]);
        container.appendChild(categoryDiv);
    });

    // Renderizar botón de "Más Estudios"
    const extraDiv = document.createElement('div');
    extraDiv.className = 'category';
    extraDiv.innerHTML = `
        <button class="expand-btn" id="expandBtn">
            <span style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="icon" style="font-size: 1.25rem;">🔬</span>
                Más Estudios
            </span>
            <span class="expand-icon" id="expandIcon">▼</span>
        </button>
        <div class="extra-content" id="extraContent" style="display: none;"></div>
    `;
    container.appendChild(extraDiv);

    // Renderizar categorías extra
    const extraContent = extraDiv.querySelector('#extraContent');
    Object.keys(categoriasExtra).forEach(categoria => {
        const subDiv = document.createElement('div');
        subDiv.className = 'sub-category';
        
        const titleHTML = `<h3><span class="icon">${categoriasExtra[categoria].icon}</span>${categoria}</h3>`;
        const gridHTML = createStudiesGrid(categoriasExtra[categoria].estudios);
        
        subDiv.innerHTML = titleHTML + gridHTML;
        extraContent.appendChild(subDiv);
    });
}

function createCategoryElement(categoria, data) {
    const div = document.createElement('div');
    div.className = 'category';
    
    const titleHTML = `<h2 class="category-title"><span class="icon">${data.icon}</span>${categoria}</h2>`;
    const gridHTML = createStudiesGrid(data.estudios);
    
    div.innerHTML = titleHTML + gridHTML;
    return div;
}

function createStudiesGrid(estudiosIds) {
    const grid = document.createElement('div');
    grid.className = 'studies-grid';
    
    estudiosIds.forEach(studyId => {
        const card = createStudyCard(studyId);
        grid.appendChild(card);
    });
    
    return grid.outerHTML;
}

function createStudyCard(studyId) {
    const estudio = estudios[studyId];
    const qty = selectedStudies[studyId] || 0;
    const isSelected = qty > 0;
    
    const card = document.createElement('div');
    card.className = `study-card ${isSelected ? 'selected' : ''}`;
    card.dataset.studyId = studyId;
    
    let infoHTML = '';
    
    if (estudio.tipoRX && studyId === 'rx-espinograma') {
        infoHTML = '<p class="price">Copago: $10k (x1) / $20k (x2)</p>';
    } else if (estudio.tipoRX && studyId === 'rx-otras') {
        infoHTML = '<p class="price">Arancel: $1.5k + $1k c/u adic.</p>';
    } else if (estudio.tipoEco && estudio.arancel) {
        infoHTML = `<p class="price">Arancel: $${(estudio.arancel/1000)}k × cant.</p>`;
    } else if (estudio.tipoDoppler && estudio.copago) {
        infoHTML = `<p class="copago">Copago: $${(estudio.copago/1000).toFixed(1)}k × cant.</p>`;
    } else if (estudio.tipoMamo) {
        if (estudio.arancel) {
            infoHTML += `<p class="price">Arancel: $${(estudio.arancel/1000)}k</p>`;
        }
        if (estudio.copago) {
            infoHTML += `<p class="copago">Copago: $${(estudio.copago/1000)}k</p>`;
        }
    } else {
        if (estudio.arancel > 0) {
            infoHTML += `<p class="price">Arancel: $${(estudio.arancel/1000)}k</p>`;
        }
        if (estudio.copago > 0) {
            infoHTML += `<p class="copago">Copago: $${(estudio.copago/1000)}k × cant.</p>`;
        }
    }
    
    let controlHTML = '';
    if (estudio.sinContador) {
        controlHTML = `
            <div class="checkbox-control">
                <input type="checkbox" ${isSelected ? 'checked' : ''} data-study="${studyId}">
            </div>
        `;
    } else {
        controlHTML = `
            <div class="quantity-control">
                <button class="qty-btn minus" data-study="${studyId}">−</button>
                <input type="number" class="qty-input" value="${qty}" readonly>
                <button class="qty-btn plus" data-study="${studyId}">+</button>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="study-info">
            <h3>${estudio.nombre}</h3>
            ${infoHTML}
        </div>
        ${controlHTML}
    `;
    
    return card;
}

function initializeEventListeners() {
    // Event delegation para botones de cantidad
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('plus')) {
            const studyId = e.target.dataset.study;
            updateQuantity(studyId, 1);
        } else if (e.target.classList.contains('minus')) {
            const studyId = e.target.dataset.study;
            updateQuantity(studyId, -1);
        }
    });
    
    // Event delegation para checkboxes
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox' && e.target.dataset.study) {
            const studyId = e.target.dataset.study;
            updateQuantity(studyId, e.target.checked ? 1 : -1);
        }
    });
    
    // Botón de reset
    document.getElementById('resetBtn').addEventListener('click', resetAll);
    
    // Botón de expandir
    setTimeout(() => {
        const expandBtn = document.getElementById('expandBtn');
        if (expandBtn) {
            expandBtn.addEventListener('click', toggleExtra);
        }
    }, 100);
}

function toggleExtra() {
    showExtra = !showExtra;
    const extraContent = document.getElementById('extraContent');
    const expandIcon = document.getElementById('expandIcon');
    
    if (showExtra) {
        extraContent.style.display = 'block';
        expandIcon.classList.add('rotated');
    } else {
        extraContent.style.display = 'none';
        expandIcon.classList.remove('rotated');
    }
}

function updateQuantity(studyId, change) {
    const currentQty = selectedStudies[studyId] || 0;
    const newQty = Math.max(0, currentQty + change);
    
    if (newQty === 0) {
        delete selectedStudies[studyId];
    } else {
        selectedStudies[studyId] = newQty;
    }
    
    renderStudies();
    updateSummary();
}

function calculateTotals() {
    let totalArancel = 0;
    let totalCopago = 0;
    let countDoppler = 0;

    Object.keys(selectedStudies).forEach(studyId => {
        const estudio = estudios[studyId];
        const qty = selectedStudies[studyId];
        
        if (estudio.tipoDoppler) countDoppler += qty;
    });

    if (countDoppler > 0) {
        totalArancel += 28000;
    }

    Object.keys(selectedStudies).forEach(studyId => {
        const estudio = estudios[studyId];
        const qty = selectedStudies[studyId];
        
        if (studyId === 'rx-otras') {
            totalArancel += qty === 1 ? 1500 : (1500 + (qty - 1) * 1000);
        }
        
        if (studyId === 'rx-espinograma') {
            totalCopago += qty === 1 ? 10000 : 20000;
        }
        
        if (estudio.tipoEco && estudio.arancel) {
            totalArancel += estudio.arancel * qty;
        }
        
        if (estudio.tipoMamo) {
            if (estudio.arancel) totalArancel += estudio.arancel;
            if (estudio.copago) totalCopago += estudio.copago;
        }
        
        if (estudio.tipoDoppler && estudio.copago) {
            totalCopago += estudio.copago * qty;
        }
        
        if (!estudio.tipoRX && !estudio.tipoEco && !estudio.tipoDoppler && !estudio.tipoMamo) {
            if (estudio.arancel) totalArancel += estudio.arancel;
            if (estudio.copago) totalCopago += estudio.copago * qty;
        }
    });

    return { totalArancel, totalCopago, total: totalArancel + totalCopago };
}

function updateSummary() {
    const selectedStudiesContainer = document.getElementById('selectedStudies');
    const totalAmountElement = document.getElementById('totalAmount');
    const totalArancelElement = document.getElementById('totalArancel');
    const totalCopagoElement = document.getElementById('totalCopago');
    
    selectedStudiesContainer.innerHTML = '';
    
    if (Object.keys(selectedStudies).length === 0) {
        selectedStudiesContainer.innerHTML = '<p class="empty-message">No hay estudios seleccionados</p>';
        totalAmountElement.textContent = '$0';
        totalArancelElement.textContent = '$0';
        totalCopagoElement.textContent = '$0';
        return;
    }
    
    const totals = calculateTotals();
    
    Object.keys(selectedStudies).forEach(studyId => {
        const estudio = estudios[studyId];
        const qty = selectedStudies[studyId];
        
        const studyItem = document.createElement('div');
        studyItem.className = 'study-item';
        
        studyItem.innerHTML = `
            <div class="study-item-content">
                <div>
                    <p class="study-item-name">${estudio.nombre}</p>
                    <p class="study-item-qty">x${qty}</p>
                </div>
            </div>
        `;
        
        selectedStudiesContainer.appendChild(studyItem);
    });
    
    totalAmountElement.textContent = `$${totals.total.toLocaleString('es-AR')}`;
    totalArancelElement.textContent = `$${totals.totalArancel.toLocaleString('es-AR')}`;
    totalCopagoElement.textContent = `$${totals.totalCopago.toLocaleString('es-AR')}`;
}

function resetAll() {
    if (Object.keys(selectedStudies).length > 0) {
        if (confirm('¿Estás seguro de que querés limpiar todos los estudios seleccionados?')) {
            selectedStudies = {};
            renderStudies();
            updateSummary();
        }
    }
}
