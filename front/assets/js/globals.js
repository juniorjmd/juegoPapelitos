const API_URL = 'http://localhost:3000/api';

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
}

window.cargarDatosJugadores = cargarDatosJugadores;
window.formGuardarPlayers = formGuardarPlayers;