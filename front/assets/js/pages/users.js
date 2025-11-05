import { Modal } from '../components/modal.js';
import { http } from '../core/http.js';
import { renderTemplate } from '../core/template.js';

export async function UsersPage(app) {
  const users = await http.get('/users');
  console.log('👤 Users:', users);

  const rowsPromises = users.map(r => {
  const { name, email, isAdult, isActive } = r; 
  return renderTemplate('base/td-user.html',  {
    name,
    email,
    isAdult: isAdult ? 'Adulto' : 'Menor',
    isActive: isActive ? 'Activo' : 'Inactivo'
  });
}); 

   const rows = await Promise.all(rowsPromises);  
  const html = await renderTemplate('pages/users.html', {  rows: rows.join('')  });
  app.innerHTML = html;

  // Evento para el modal
  const btnNew = document.getElementById('btn-new-user');
  if (!btnNew) return;

  btnNew.addEventListener('click', async () => {
    const modal = await Modal.show({
      id: 'userModal',
      title: 'Nuevo Usuario',
      bodyTemplate: 'modals/userFormModal.html',
      bodyData: {
        id: '',
        name: '',
        email: '',
        password: '',
        checked_active: 'checked',
        checked_adult: 'checked'
      },
      size: 'modal-lg'
    });

    const form = document.getElementById('userForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        isActive: form.isActive.checked,
        isAdult: form.isAdult.checked
      };

      await http.post('/users', data);
      modal.hide();
      alert('Usuario guardado correctamente');
      await UsersPage(app); // recarga tabla
    });
  });
}
