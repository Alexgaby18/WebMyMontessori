/**
 * MI MONTESSORI - LANDING PAGE INTERACTIVITY
 * Gestión de la galería interactiva, modal de pre-registro, copia de Pago Móvil y navegación móvil.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Datos completos de las actividades y pantallas limpias
  const activitiesData = {
    'menu': {
      title: 'Menú Principal de Actividades',
      caption: 'Entorno visual y limpio con acceso a las 6 áreas pedagógicas principales',
      imgSrc: 'assets/images/screen-menu-principal.png',
      alt: 'Menú principal con la abeja de Mi Montessori y las áreas de aprendizaje'
    },
    'silabas': {
      title: 'Aprende Sílabas con Pictogramas',
      caption: 'Asociación fonética: sílaba MA con Mamá, Mapa, Mariposa y Manzana',
      imgSrc: 'assets/images/screen-aprende-silabas.png',
      alt: 'Pantalla de aprendizaje de sílaba MA con pictogramas'
    },
    'aprende-letras': {
      title: 'Aprende Letras con Pictogramas',
      caption: 'Fonemas iniciales y vocabulario: letra D con Delfín, Dado, Diente y Dedo',
      imgSrc: 'assets/images/screen-aprende-letra.png',
      alt: 'Pantalla de aprendizaje de la letra D con pictogramas'
    },
    'completa-silaba': {
      title: 'Completa la Palabra por Sílaba',
      caption: 'Arrastra y suelta las fichas de sílabas en los bloques vacíos',
      imgSrc: 'assets/images/screen-completa-silaba.png',
      alt: 'Pantalla interactiva completando la palabra MAMÁ por sílaba'
    },
    'completa-letra': {
      title: 'Completa la Letra Faltante',
      caption: 'Autocorrección y discriminación de letras (ej. Abeja)',
      imgSrc: 'assets/images/screen-completa-letra.png',
      alt: 'Pantalla completando la letra A en Abeja'
    },
    'selecciona-palabra': {
      title: 'Selecciona la Palabra Correcta',
      caption: 'Identificación y lectura comprensiva guiada por pictogramas ARASAAC',
      imgSrc: 'assets/images/screen-selecciona-palabra.png',
      alt: 'Pantalla seleccionando la palabra Abeja'
    },
    'selecciona-silaba': {
      title: 'Selecciona la Sílaba Inicial',
      caption: 'Reconoce y pulsa la sílaba correspondiente al pictograma',
      imgSrc: 'assets/images/screen-selecciona-silaba.png',
      alt: 'Pantalla seleccionando la sílaba MA para Manzana'
    },
    'conecta-palabras': {
      title: 'Conecta Palabras con Líneas',
      caption: 'Relaciona palabras escritas con sus imágenes de ARASAAC',
      imgSrc: 'assets/images/screen-conecta-palabras.png',
      alt: 'Pantalla conectando con líneas palabras y pictogramas'
    },
    'reconocimiento-voz': {
      title: 'Lectura con Reconocimiento de Voz',
      caption: 'Lee en voz alta y practica la pronunciación con el micrófono',
      imgSrc: 'assets/images/screen-lee-palabra-voz.png',
      alt: 'Pantalla de lectura en voz alta con botón de micrófono'
    },
    'oraciones': {
      title: 'Aprende y Lee Oraciones',
      caption: 'Construcción y lectura de oraciones con pictogramas (ej. EL NIÑO SALTA)',
      imgSrc: 'assets/images/screen-aprende-oraciones.png',
      alt: 'Pantalla de lectura de oraciones con pictogramas'
    },
    'trazos-letra': {
      title: 'Práctica de Trazos y Escritura',
      caption: 'Grafomotricidad: dibuja y perfecciona el trazo de cada letra en pantalla',
      imgSrc: 'assets/images/screen-trazos-letra.png',
      alt: 'Pantalla de práctica de trazo a mano alzada de la letra B'
    }
  };

  // 2. Galería interactiva
  const tabButtons = document.querySelectorAll('.activity-tab-btn');
  const mockupImg = document.getElementById('mockup-display-img');
  const mockupCaption = document.getElementById('mockup-caption-text');

  if (tabButtons.length > 0 && mockupImg) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const activityKey = btn.dataset.activity;
        const data = activitiesData[activityKey];

        if (!data) return;

        // Actualizar estados visuales de los tabs
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Animación suave de cambio de pantalla
        mockupImg.style.opacity = '0';
        setTimeout(() => {
          mockupImg.src = data.imgSrc;
          mockupImg.alt = data.alt;
          if (mockupCaption) {
            mockupCaption.textContent = data.caption;
          }
          mockupImg.style.opacity = '1';
        }, 150);
      });
    });
  }

  // 3. Sistema de Diálogo / Modal para "Avisarme al lanzamiento"
  const modal = document.getElementById('notify-modal');
  const openModalBtns = document.querySelectorAll('.js-open-notify-modal');
  const closeModalBtn = document.getElementById('modal-close-btn');
  const notifyForms = document.querySelectorAll('.js-notify-form');

  if (modal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.showModal();
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modal.close();
      });
    }

    // Cerrar al hacer clic en el backdrop
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  }

  // URL de tu Web App de Google Apps Script vinculada a tu Google Sheet
  const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBrxegHnIISYSR_V3rXUBSlfdxHn_p4mpTx6AdJ4fTIk-EjeJ2bKSe8bfAwRNxt2BQ/exec';

  // Formularios de notificación por email conectados a Google Sheets
  notifyForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const email = emailInput ? emailInput.value.trim() : '';
      const source = form.dataset.source || 'web';

      if (!email) return;

      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Registrando... ⏳';
      }

      try {
        if (GOOGLE_SHEETS_SCRIPT_URL) {
          const bodyData = new URLSearchParams();
          bodyData.append('email', email);
          bodyData.append('source', source);

          await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bodyData.toString()
          });
        }

        if (modal && modal.open) {
          modal.close();
        }
        showToast('¡Gracias! Tu correo ha sido registrado para el lanzamiento 🎉');
        if (emailInput) emailInput.value = '';
      } catch (err) {
        showToast('Hubo un inconveniente al registrarte. Por favor intenta de nuevo.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  });

  // 4. Copiar datos de Pago Móvil
  const copyPmBtn = document.getElementById('btn-copy-pm');
  if (copyPmBtn) {
    copyPmBtn.addEventListener('click', () => {
      const banco = document.getElementById('pm-banco')?.textContent || 'Banco';
      const telefono = document.getElementById('pm-telefono')?.textContent || '';
      const cedula = document.getElementById('pm-cedula')?.textContent || '';

      const fullData = `Datos de Pago Móvil - Mi Montessori:\nBanco: ${banco}\nTeléfono: ${telefono}\nCédula: ${cedula}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fullData).then(() => {
          showToast('¡Datos de Pago Móvil copiados al portapapeles! 📋');
        }).catch(() => {
          fallbackCopyText(fullData);
        });
      } else {
        fallbackCopyText(fullData);
      }
    });
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('¡Datos de Pago Móvil copiados! 📋');
    } catch (err) {
      showToast('No se pudo copiar automáticamente. Por favor cópialos manualmente.');
    }
    document.body.removeChild(textArea);
  }

  // 5. Toast flotante para avisos
  function showToast(message) {
    let toast = document.getElementById('toast-alert');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-alert';
      toast.className = 'toast-alert';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // 6. Menú móvil
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Cerrar al pulsar un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
});
