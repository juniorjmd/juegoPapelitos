import { Modal } from './modal.js';

export class BtnModal extends HTMLElement {


  connectedCallback() {
    // Obtener los atributos del componente
    const onSubForm = this.getAttribute('onSubForm');
    const onOpenCode = this.getAttribute('on-open');
    const nombreData = this.getAttribute('nombre-data') || 'dataset';
    const datosExtra = this.getAttribute('datosExtra') || {};
    const modalId = this.getAttribute('modal-id') || 'defaultModal';
    const modalTemplateName = this.getAttribute('modal-template') || '';
    const modalTitle = this.getAttribute('modal-title') || 'Sin título';
    const modalSize = this.getAttribute('modal-size') || 'modal-md';
    const modalTemplate = `modals/${modalTemplateName}.html`;
    const icon = this.getAttribute('icon') || '';
    const textContent = (icon != '') ? `<i class="${icon}"></i>` : '' + this.getAttribute('text-content') || '';
    // Estilo Bootstrap
    let dataset = [];
    this.classList.add('btn', 'btn-primary');
    if (!this.innerHTML.trim()) this.innerHTML = textContent;

    // Registrar evento click
    this.addEventListener('click', async () => {
      if (onOpenCode) {
        // alert(onOpenCode)
        try {
          dataset = await eval(onOpenCode); // ¡ejecuta cargarDatosJugadores(123)!
        } catch (e) {
          console.error("Error ejecutando on-open:", e);
        }
      }

      console.log(datosExtra);
      let data = {};
       try {
        data = JSON.parse(datosExtra)
        } catch (err) {
          console.warn('⚠️ datosExtra no es JSON válido:', datosExtra);
        }
      const bodyData = { [nombreData]: dataset  , ...data }; 
      // console.log({bodyData});
      const modal = await Modal.show({
        id: modalId,
        title: modalTitle,
        bodyTemplate: modalTemplate,
        size: modalSize,
        onSubForm,
        bodyData
      }); 
      // 🔥 Disparar un evento personalizado para que otra parte pueda reaccionar
      this.dispatchEvent(new CustomEvent('modal:opened', { detail: { id: modalId } }));

      // Esperar al cierre del modal
      modal.element.addEventListener('hidden.bs.modal', () => {
        this.dispatchEvent(new CustomEvent('modal:closed', { detail: { id: modalId } }));
      });
    });
  }
}
