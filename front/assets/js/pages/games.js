import { Modal } from '../components/modal.js';
import { http } from '../core/http.js';
import { renderTemplate } from '../core/template.js';

export async function GamesPage(app) {
  const games = await http.get('/games');
  console.log(games);


  const rows = await Promise.all(
    games.map(({ id, title, genre, isActive }) =>
      renderTemplate('base/td-games.html', {
        id,
        title,
        genre,
        isActive: isActive ? 'Activo' : 'Inactivo'
      })
    )
  );


 
  const html = await renderTemplate('pages/games.html', { rows: rows.join('') });
  app.innerHTML = html;
  //console.log('este es el innerHTML que agregue a la variable app', app.innerHTML);


  const btnNew = document.getElementById('btn-new');
  if (!btnNew) return;
  btnNew.addEventListener('click', async () => {
    const modal = await Modal.show({
      id: 'gameModal',
      title: 'Nuevo Juego',
      bodyTemplate: 'modals/gamesFormModal.html',
      bodyData: {
        id: '',
        title: '',
        selected_adult: '',
        selected_kids: '',
        selected_all: 'selected',
        checked: 'checked'
      },
      size: 'modal-lg'
    });

    const form = document.getElementById('gameForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        title: form.title.value,
        genre: form.genre.value,
        isActive: form.isActive.checked
      };

      await http.post('/games', data);
      modal.hide();
      alert('Juego guardado correctamente');
      GamesPage();
    });
   
  });
}
