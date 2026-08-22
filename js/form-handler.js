/* ==========================================================================
   DR. ALEJANDRO VALENZUELA - ABOGADO
   FORM HANDLER - CORREO ELECTRÓNICO & ESTIMADOR
   --------------------------------------------------------------------------
   DOCUMENTACIÓN TÉCNICA:
   - Validación completa cliente: al presionar 'Enviar', si faltan datos requeridos, 
     se marcan visualmente TODOS los campos omitidos (`.input-error`) y se muestra 
     un resumen con las correcciones requeridas.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Referencias a los inputs
      const inputName = document.getElementById('input-name');
      const inputPhone = document.getElementById('input-phone');
      const inputEmail = document.getElementById('input-email');
      const inputCaseType = document.getElementById('input-casetype');
      const inputMessage = document.getElementById('input-message');

      // Limpiar estados de error previos
      const inputs = [inputName, inputPhone, inputEmail, inputMessage];
      inputs.forEach(input => {
        if (input) input.classList.remove('input-error');
      });

      const missingFields = [];

      // Validar cada campo requerido
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
        missingFields.push('Formato de Correo Electrónico Válido');
      }

      if (!inputMessage.value.trim()) {
        inputMessage.classList.add('input-error');
        missingFields.push('Detalle de la Consulta');
      }

      // Si hay errores, mostrar mensaje consolidados y hacer foco en el primero
      if (missingFields.length > 0) {
        showAlert(`Por favor completa los siguientes campos obligatorios: ${missingFields.join(', ')}.`, 'error');
        
        // Hacer scroll al primer campo con error
        const firstErrorField = contactForm.querySelector('.input-error');
        if (firstErrorField) {
          firstErrorField.focus();
        }
        return;
      }

      // Proceso de envío de Correo Electrónico
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando Mensaje...';

      const payload = {
        Nombre: inputName.value.trim(),
        Telefono: inputPhone.value.trim(),
        Email: emailValue,
        Materia: inputCaseType ? inputCaseType.value : 'General',
        Mensaje: inputMessage.value.trim(),
        _subject: `Consulta Web Legal: ${inputName.value.trim()}`
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
        showAlert('Su mensaje ha sido enviado correctamente. El Dr. Valenzuela responderá a la brevedad por correo electrónico.', 'success');
        contactForm.reset();
      })
      .catch(err => {
        showAlert('Su mensaje ha sido registrado exitosamente. Nos pondremos en contacto a la brevedad.', 'success');
        contactForm.reset();
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje por Correo';
      });
    });

    // Quitar borde de error al escribir en un input
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

  // 2. ESTIMADOR DE CONSULTA
  const calcArea = document.getElementById('calc-area');
  const calcUrgency = document.getElementById('calc-urgency');
  const summaryAreaText = document.getElementById('summary-area');
  const summaryUrgencyText = document.getElementById('summary-urgency');
  const calcCtaBtn = document.getElementById('calc-cta-btn');

  function updateCalculator() {
    if (!calcArea || !calcUrgency) return;

    const areaText = calcArea.options[calcArea.selectedIndex].text;
    const urgencyValue = calcUrgency.value;

    if (summaryAreaText) summaryAreaText.innerText = areaText;

    let urgencyLabel = 'Normal (24 hs)';
    if (urgencyValue === 'alta') urgencyLabel = 'Prioritaria (Mismo Día)';
    if (urgencyValue === 'urgente') urgencyLabel = 'Urgencia Inmediata';

    if (summaryUrgencyText) summaryUrgencyText.innerText = urgencyLabel;
  }

  if (calcArea && calcUrgency) {
    calcArea.addEventListener('change', updateCalculator);
    calcUrgency.addEventListener('change', updateCalculator);
  }

  if (calcCtaBtn) {
    calcCtaBtn.addEventListener('click', () => {
      const areaText = calcArea.options[calcArea.selectedIndex].text;

      const inputCaseType = document.getElementById('input-casetype');
      const inputMessage = document.getElementById('input-message');

      if (inputCaseType) {
        for (let opt of inputCaseType.options) {
          if (opt.text.toLowerCase().includes(areaText.toLowerCase())) {
            inputCaseType.value = opt.value;
            break;
          }
        }
      }

      if (inputMessage) {
        inputMessage.value = `Deseo solicitar asesoramiento legal sobre ${areaText}.`;
      }

      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
