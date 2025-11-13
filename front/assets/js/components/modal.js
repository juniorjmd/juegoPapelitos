import { renderTemplate } from '../core/template.js';

export class Modal {
  /**
   * Renderiza y muestra un modal
   * @param {object} config
   * @param {string} config.id - ID único del modal
   * @param {string} config.title - Título del modal
   * @param {string} config.bodyTemplate - Nombre del template del cuerpo (por ej. "modals/gameFormModal.html")
   * @param {object} config.bodyData - Datos para interpolar en el cuerpo
   * @param {string} [config.size=""] - Tamaño opcional (modal-lg, etc.)
   */
  static async show({ id, title, bodyTemplate, bodyData = {}, size = '', onSubForm }) {
    // Renderiza el cuerpo desde el template específico
    const bodyHTML = await renderTemplate(bodyTemplate, bodyData);

    // Renderiza el modal base con ese contenido
    const modalHTML = await renderTemplate('base/modal.html', {
      id, title, size, body: bodyHTML
    });

    // Elimina un modal previo con el mismo id
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    // Inserta en el DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Inicializa Bootstrap modal
    const modalEl = document.getElementById(id);
    const modal = new bootstrap.Modal(modalEl);
    await modal.show();  
    return modal;
  }
}
