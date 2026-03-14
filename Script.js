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
        arancelPorExposicion: 1500, // Primera exposición
        arancelAdicional: 1000, // Cada adicional
        categoria: 'Rayos X',
        tipoRX: true
    },
    
    // ECOGRAFÍAS
    'eco-tv': {
        nombre: 'Eco TV (y no nomencladas)',
        copago: 10000,
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
        arancel: 0,
        copago: 4000,
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
        arancel: 0,
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
        categoria: 'Densitometría',
        arancelGrupal: true
    },
    
    // ERGOMETRÍA
    'ergometria': {
        nombre: 'Ergometría',
        arancel: 20000,
        copago: 5000,
        categoria: 'Ergometría',
        arancelGrupal: true
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
    'Rayos X': { icon: '📷', estudios: ['rx-espinograma', 'rx-otras'], arancelGrupal: '$10k (x1) / $15k (x2+)' },
    'Ecografías': { icon: '🔊', estudios: ['eco-tv', 'eco-abdominal', 'eco-otras'], arancelGrupal: '$20k' },
    'Eco Doppler': { icon: '💓', estudios: ['doppler-periferico', 'doppler-obstetrico'], arancelGrupal: '$28k' },
    'Mamografía': { icon: '🩺', estudios: ['mamo-bilateral', 'mamo-unilateral', 'mamo-tomosintesis'], arancelGrupal: '$20k' },
    'Densitometría': { icon: '🦴', estudios: ['densitometria'], arancelGrupal: '$18k' },
    'Ergometría': { icon: '❤️', estudios: ['ergometria'], arancelGrupal: '$20k' },
    'Resonancia Magnética': { icon: '🧲', estudios: ['resonancia-sin-contraste', 'resonancia-con-contraste', 'resonancia-subsiguiente-sin', 'resonancia-subsiguiente-con'] }
};

const categoriasExtra = {
    'Medicina Nuclear': { icon: '☢️', estudios: ['medicina-nuclear'] },
    'Tomografía': { icon: '🔬', estudios: ['tomografia-sin-contraste', 'tomografia-con-contraste', 'tomografia-angio', 'tomografia-bloqueos'] }
};

// Estado de la aplicación
let selectedStudies = {};
let showExtra = false;
let showDetalle = false;

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
    
    const arancelGrupalHTML = data.arancelGrupal 
        ? `<span style="font-size: 0.75rem; font-weight: 600; color: var(--primary-color);">Arancel: ${data.arancelGrupal}</span>`
        : '';
    
    const titleHTML = `
        <h2 class="category-title" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="icon">${data.icon}</span>${categoria}
            </div>
            ${arancelGrupalHTML}
        </h2>
    `;
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
    } else if (estudio.tipoEco && estudio.copago) {
        infoHTML = `<p class="copago">Copago: $${(estudio.copago/1000)}k × cant.</p>`;
    } else if (estudio.tipoDoppler && estudio.copago) {
        infoHTML = `<p class="copago">Copago: $${(estudio.copago/1000).toFixed(1)}k × cant.</p>`;
    } else if (estudio.tipoMamo) {
        if (estudio.arancel > 0) {
            infoHTML += `<p class="price">Arancel: $${(estudio.arancel/1000)}k</p>`;
        }
        if (estudio.copago > 0) {
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
    let countRX = 0;
    let countEco = 0;
    let countDoppler = 0;

    // Contar estudios por tipo
    Object.keys(selectedStudies).forEach(studyId => {
        const estudio = estudios[studyId];
        const qty = selectedStudies[studyId];
        
        if (estudio.tipoRX) countRX += qty;
        if (estudio.tipoEco) countEco += qty;
        if (estudio.tipoDoppler) countDoppler += qty;
    });

    // ARANCEL RX GRUPAL: $10.000 si hay 1 RX, $15.000 si hay 2 o más
    if (countRX > 0) {
        totalArancel += countRX === 1 ? 10000 : 15000;
    }

    // ARANCEL ECO GRUPAL: $20.000 si hay al menos 1 eco
    if (countEco > 0) {
        totalArancel += 20000;
    }

    // ARANCEL DOPPLER GRUPAL: $28.000 si hay al menos 1 doppler
    if (countDoppler > 0) {
        totalArancel += 28000;
    }

    // ARANCEL MAMOGRAFÍA GRUPAL: $20.000 si hay al menos 1 mamografía
    if (Object.keys(selectedStudies).some(id => estudios[id].tipoMamo)) {
        totalArancel += 20000;
    }

    // ARANCEL DENSITOMETRÍA: $18.000 si hay al menos 1 densitometría
    if (selectedStudies['densitometria']) {
        totalArancel += 18000;
    }

    // ARANCEL ERGOMETRÍA: $20.000 si hay al menos 1 ergometría
    if (selectedStudies['ergometria']) {
        totalArancel += 20000;
    }

    // Calcular aranceles y copagos por estudio
    Object.keys(selectedStudies).forEach(studyId => {
        const estudio = estudios[studyId];
        const qty = selectedStudies[studyId];
        
        // RX - Aranceles por exposición (ADEMÁS del arancel grupal)
        if (studyId === 'rx-otras') {
            // $1.500 por la primera exposición + $1.000 por cada adicional
            totalArancel += qty === 1 ? 1500 : (1500 + (qty - 1) * 1000);
        }
        
        // RX - Copagos
        if (studyId === 'rx-espinograma') {
            totalCopago += qty === 1 ? 10000 : 20000;
        }
        
        // Ecografías - Aranceles y copagos por cantidad (ADEMÁS del arancel grupal)
        if (estudio.tipoEco) {
            if (estudio.arancel) {
                totalArancel += estudio.arancel * qty;
            }
            if (estudio.copago) {
                totalCopago += estudio.copago * qty;
            }
        }
        
        // Mamografías - Aranceles y copagos (una sola vez)
        if (estudio.tipoMamo) {
            if (estudio.arancel) totalArancel += estudio.arancel;
            if (estudio.copago) totalCopago += estudio.copago;
        }
        
        // Doppler - Solo copagos (arancel grupal ya sumado arriba)
        if (estudio.tipoDoppler && estudio.copago) {
            totalCopago += estudio.copago * qty;
        }
        
        // Para estudios con arancelGrupal (Densitometría, Ergometría), solo sumar copagos
        if (estudio.arancelGrupal) {
            if (estudio.copago) totalCopago += estudio.copago * qty;
        } else if (!estudio.tipoRX && !estudio.tipoEco && !estudio.tipoDoppler && !estudio.tipoMamo) {
            // Para estudios sin arancel grupal (Resonancias, etc)
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
        
        // Ocultar botón de detalle
        const detalleBtn = document.getElementById('detalleBtn');
        if (detalleBtn) detalleBtn.style.display = 'none';
        const detalleContainer = document.getElementById('detalleContainer');
        if (detalleContainer) detalleContainer.style.display = 'none';
        
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
    
    // Mostrar botón de detalle
    let detalleBtn = document.getElementById('detalleBtn');
    if (!detalleBtn) {
        detalleBtn = document.createElement('button');
        detalleBtn.id = 'detalleBtn';
        detalleBtn.className = 'w-full bg-blue-100 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-200 active:scale-95 transition-all text-sm mb-3 flex items-center justify-center gap-2';
        detalleBtn.innerHTML = '▼ Ver detalle por práctica';
        detalleBtn.onclick = toggleDetalle;
        
        const resetBtn = document.getElementById('resetBtn');
        resetBtn.parentNode.insertBefore(detalleBtn, resetBtn);
    }
    detalleBtn.style.display = 'flex';
    
    // Actualizar contenido del detalle si está visible
    if (showDetalle) {
        renderDetalle();
    }
}

function toggleDetalle() {
    showDetalle = !showDetalle;
    const detalleBtn = document.getElementById('detalleBtn');
    detalleBtn.innerHTML = showDetalle ? '▲ Ocultar detalle' : '▼ Ver detalle por práctica';
    
    let detalleContainer = document.getElementById('detalleContainer');
    
    if (showDetalle) {
        if (!detalleContainer) {
            detalleContainer = document.createElement('div');
            detalleContainer.id = 'detalleContainer';
            detalleContainer.className = 'bg-gray-50 rounded-lg p-4 mb-3 text-xs space-y-3';
            const detalleBtn = document.getElementById('detalleBtn');
            detalleBtn.parentNode.insertBefore(detalleContainer, detalleBtn);
        }
        renderDetalle();
        detalleContainer.style.display = 'block';
    } else {
        if (detalleContainer) {
            detalleContainer.style.display = 'none';
        }
    }
}

function getDetalleEstudio(studyId) {
    const estudio = estudios[studyId];
    const qty = selectedStudies[studyId];
    let arancel = 0;
    let copago = 0;

    if (studyId === 'rx-otras') {
        arancel = qty === 1 ? 1500 : (1500 + (qty - 1) * 1000);
    } else if (studyId === 'rx-espinograma') {
        copago = qty === 1 ? 10000 : 20000;
    } else if (estudio.tipoEco) {
        if (estudio.arancel) arancel = estudio.arancel * qty;
        if (estudio.copago) copago = estudio.copago * qty;
    } else if (estudio.tipoMamo) {
        if (estudio.arancel) arancel = estudio.arancel;
        if (estudio.copago) copago = estudio.copago;
    } else if (estudio.tipoDoppler) {
        if (estudio.copago) copago = estudio.copago * qty;
    } else if (estudio.arancelGrupal) {
        // Para estudios con arancel grupal (Densitometría, Ergometría), solo copago
        if (estudio.copago) copago = estudio.copago * qty;
    } else {
        // Para estudios sin arancel grupal (Resonancias, etc)
        if (estudio.arancel) arancel = estudio.arancel;
        if (estudio.copago) copago = estudio.copago * qty;
    }

    return { arancel, copago, total: arancel + copago };
}

function renderDetalle() {
    const detalleContainer = document.getElementById('detalleContainer');
    if (!detalleContainer) return;
    
    const countRX = Object.keys(selectedStudies).filter(id => estudios[id].tipoRX).reduce((sum, id) => sum + selectedStudies[id], 0);
    const hasEco = Object.keys(selectedStudies).some(id => estudios[id].tipoEco);
    const hasDoppler = Object.keys(selectedStudies).some(id => estudios[id].tipoDoppler);
    const hasMamo = Object.keys(selectedStudies).some(id => estudios[id].tipoMamo);
    const hasDensi = selectedStudies['densitometria'];
    const hasErgo = selectedStudies['ergometria'];
    
    let html = '<h3>Detalle por práctica</h3>';
    
    // Aranceles grupales
    html += '<div class="detalle-section"><p>Aranceles Grupales:</p>';
    
    if (countRX > 0) {
        const arancelRX = countRX === 1 ? 10000 : 15000;
        html += `<div class="detalle-item">
            <span>• Rayos X (${countRX} estudios)</span>
            <span class="detalle-arancel">$${arancelRX.toLocaleString('es-AR')}</span>
        </div>`;
    }
    
    if (hasEco) {
        html += `<div class="detalle-item">
            <span>• Ecografías</span>
            <span class="detalle-arancel">$20.000</span>
        </div>`;
    }
    
    if (hasDoppler) {
        html += `<div class="detalle-item">
            <span>• Eco Doppler</span>
            <span class="detalle-arancel">$28.000</span>
        </div>`;
    }
    
    if (hasMamo) {
        html += `<div class="detalle-item">
            <span>• Mamografía</span>
            <span class="detalle-arancel">$20.000</span>
        </div>`;
    }
    
    if (hasDensi) {
        html += `<div class="detalle-item">
            <span>• Densitometría</span>
            <span class="detalle-arancel">$18.000</span>
        </div>`;
    }
    
    if (hasErgo) {
        html += `<div class="detalle-item">
            <span>• Ergometría</span>
            <span class="detalle-arancel">$20.000</span>
        </div>`;
    }
    
    html += '</div>';
    
    // Detalle por estudio
    html += '<div class="detalle-section" style="padding-top: 0.5rem; border-top: 1px solid var(--border-color);"><p>Por estudio individual:</p>';
    
    Object.keys(selectedStudies).forEach(studyId => {
        const estudio = estudios[studyId];
        const qty = selectedStudies[studyId];
        const detalle = getDetalleEstudio(studyId);
        
        if (detalle.arancel === 0 && detalle.copago === 0) return;
        
        html += `<div class="detalle-estudio">
            <div class="detalle-estudio-header">
                <span class="detalle-estudio-nombre">${estudio.nombre} (x${qty})</span>
                <span class="detalle-estudio-total">$${detalle.total.toLocaleString('es-AR')}</span>
            </div>`;
        
        if (detalle.arancel > 0) {
            html += `<div class="detalle-estudio-breakdown">
                <span>Arancel:</span>
                <span class="detalle-arancel">$${detalle.arancel.toLocaleString('es-AR')}</span>
            </div>`;
        }
        
        if (detalle.copago > 0) {
            html += `<div class="detalle-estudio-breakdown">
                <span>Copago:</span>
                <span class="detalle-copago">$${detalle.copago.toLocaleString('es-AR')}</span>
            </div>`;
        }
        
        html += '</div>';
    });
    
    html += '</div>';
    
    detalleContainer.innerHTML = html;
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
