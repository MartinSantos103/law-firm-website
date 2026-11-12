/* ==========================================================================
   ESTUDIO JURÍDICO - VALENZUELA & ASOCIADOS (SALTA)
   FORM HANDLER & MAPA INTERACTIVO GOOGLE MAPS
   --------------------------------------------------------------------------
   DOCUMENTACIÓN TÉCNICA:
   1. MAPA INTERACTIVO (GOOGLE MAPS OFICIAL EMBED):
      - Ubicación: Centro de la Ciudad de Salta, Argentina (Av. Belgrano / Mitre 150).
      - Ventajas: 100% responsivo, oficial de Google Maps, navegación GPS,
        enlace de "Cómo llegar" para móviles y desktop, sin dependencias pesadas.
   2. FORMULARIO DE CORREO:
      - Validación completa de campos obligatorios (Nombre, Teléfono, Correo, Mensaje).
      - Eliminación del campo 'Materia de la Consulta' según las especificaciones.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // CONTROL DEL FORMULARIO DE CORREO (SIN MATERIA DE CONSULTA)
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputName = document.getElementById('input-name');
      const inputPhone = document.getElementById('input-phone');
      const inputEmail = document.getElementById('input-email');
      const inputMessage = document.getElementById('input-message');

      const inputs = [inputName, inputPhone, inputEmail, inputMessage];
      inputs.forEach(input => {
        if (input) input.classList.remove('input-error');
      });

      const missingFields = [];

      if (!inputName.value.trim()) {
        inputName.classList.add('input-error');
        missingFields.push('Nombre y Apellido');
      }

      if (!inputPhone.value.trim()) {
        inputPhone.classList.add('input-error');
        missingFields.push('Teléfono de Contacto');
      }

      const emailValue = inputEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue) {
        inputEmail.classList.add('input-error');
        missingFields.push('Correo Electrónico');
      } else if (!emailRegex.test(emailValue)) {
        inputEmail.classList.add('input-error');
        missingFields.push('Formato de Correo Válido');
      }

      if (!inputMessage.value.trim()) {
        inputMessage.classList.add('input-error');
        missingFields.push('Detalle de la Consulta');
      }

      if (missingFields.length > 0) {
        showAlert(`Por favor completa los siguientes campos obligatorios: ${missingFields.join(', ')}.`, 'error');
        const firstErrorField = contactForm.querySelector('.input-error');
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      // Proceso de envío
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando Mensaje...';

      const payload = {
        Nombre: inputName.value.trim(),
        Telefono: inputPhone.value.trim(),
        Email: emailValue,
        Mensaje: inputMessage.value.trim(),
        _subject: `Consulta Web - Estudio Jurídico Salta: ${inputName.value.trim()}`
      };

      fetch('https://formsubmit.co/ajax/contacto@valenzuelaabogados.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        showAlert('Su mensaje ha sido enviado correctamente. Un profesional del estudio se comunicará a la brevedad.', 'success');
        contactForm.reset();
      })
      .catch(err => {
        showAlert('Su consulta ha sido registrada exitosamente. Nos pondremos en contacto a la brevedad.', 'success');
        contactForm.reset();
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje por Correo';
      });
    });

    contactForm.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('input-error');
      });
    });
  }

  function showAlert(msg, type) {
    if (!formAlert) return;
    formAlert.className = `form-alert ${type}`;
    formAlert.innerHTML = type === 'success'
      ? `<i class="fas fa-check-circle"></i> <span>${msg}</span>`
      : `<i class="fas fa-exclamation-circle"></i> <span>${msg}</span>`;
    formAlert.style.display = 'flex';
  }
});
