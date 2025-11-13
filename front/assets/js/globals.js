const API_URL = 'https://juegopapelitos.onrender.com/api';

const cargarDatosJugadores = async (id) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}`
      , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log({ response })
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const jugadores = await response.json();
    console.log({ jugadores });
    return jugadores;
  } catch (error) {
    console.error("Error al cargar jugadores:", error);
    return [];
  }
}

/*
const formGuardarPlayers = (modal) => {
  const form = document.getElementById('playersByGamModalForm');

  form.addEventListener('submit', async (e) => {
     e.preventDefault();
    const jugadores =   Array.from(form.querySelectorAll('.jugadores_seleccionados'))
      .map(checkbox => ({
        id: checkbox.dataset.id,
        checked: checkbox.checked
      }));
    const response = await fetch(`${API_URL}/players/${form.idJuego.value}`
      , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify({ jugadores })
      }
    );
    console.log({ response })
    if (!response.ok) {console.error(response.error)};
    alert('Juego guardado correctamente');
    modal.hide();

  });
}*/

const formGuardarPlayers = (modal) => {
  console.log('🎯 Ejecutando formGuardarPlayers');

  // Espera un poquito para asegurar que el DOM interno del modal esté renderizado
  setTimeout(() => {
    const form = document.getElementById('playersByGamModalForm');
    if (!form) {
      console.warn('⚠️ No se encontró el formulario playersByGamModalForm.');
      return;
    }

    console.log('✅ Formulario encontrado:', form);

    // Evita duplicar listeners si se vuelve a abrir el modal
    form.onsubmit = null;

    // Listener del submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('🚀 Interceptando submit...');
      const jugadores = Array.from(form.querySelectorAll('.jugadores_seleccionados'))
        .map(checkbox => ({
          id: checkbox.dataset.id,
          checked: checkbox.checked
        }));

      console.log('📦 Jugadores enviados:', jugadores);

      const idJuego = form.querySelector('[name="idJuego"]').value;
      console.log('🎮 ID del juego:', idJuego);

      try {
        //const response = await fetch(`${API_URL}/players/${form.idJuego.value}`
        const response = await fetch(`${API_URL}/players/${idJuego}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jugadores })
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error || `Error HTTP: ${response.status}`);
        }

        alert('✅ Jugadores guardados correctamente');
        modal.hide();
        // window.location.reload();
      } catch (err) {
        console.error('❌ Error al guardar jugadores:', err);
        alert('Error al guardar jugadores. Revisa la consola.');
      }
    });

  }, 100); // Pequeño retraso asegura que el modal esté completamente listo
};

window.cargarDatosJugadores = cargarDatosJugadores;
window.formGuardarPlayers = formGuardarPlayers;