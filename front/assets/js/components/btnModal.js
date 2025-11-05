import { Modal } from './modal.js';

export class BtnModal extends HTMLElement {
   

  connectedCallback() {
    // Obtener los atributos del componente
    const modalId = this.getAttribute('modal-id') || 'defaultModal';
    const modalTemplateName  = this.getAttribute('modal-template') || '';
    const modalTitle = this.getAttribute('modal-title') || 'Sin título';
    const modalSize = this.getAttribute('modal-size') || 'modal-md';
    const modalTemplate = `modals/${modalTemplateName}.html`;
    const icon = this.getAttribute('icon') || '';
    const textContent = (icon != '') ?  `<i class="${icon}"></i>`: ''  +  this.getAttribute('text-content') || '';
    // Estilo Bootstrap
    this.classList.add('btn', 'btn-primary');
    if (!this.innerHTML.trim()) this.innerHTML = textContent;

    // Registrar evento click
    this.addEventListener('click', async () => {
      const modal = await Modal.show({
        id: modalId,
        title: modalTitle,
        bodyTemplate:modalTemplate,
        size: modalSize,
        bodyData: {} // Puedes personalizar si el modal necesita datos
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
