import { PlayerImplRepository } from '../../infrastructure/repositories/player-impl.repository.js';
import { MongoPlayerDatasource } from '../../infrastructure/datasources/mongo-player.datasource.js';  
import { PlayerEntity } from '../../domain/entities/player.entity.js';

export class PlayerController {
  readonly playerRepo = new PlayerImplRepository(new MongoPlayerDatasource()); 

  public getplayer = async (req: any, res: any) => {
    try {
      const players = await this.playerRepo.getPlayer();
      res.json(players);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting players' });
    }
  }
  public createplayer = async (req: any, res: any) => {
    const player = await this.playerRepo.createPlayer(req.body);
    res.json(player);

  }


  public createplayers = async (req: any, res: any) => {
  console.log({body : req.body , param:req.params})
    const { jugadores } = req.body;
    const { idGame } = req.params;
     if (!idGame) {
      return res.status(400).json({ message: 'Formato inválido: se esperaba un id de juego' });
    }
    if (!Array.isArray(jugadores)) {
      return res.status(400).json({ message: 'Formato inválido: se esperaba un array de players' });
    }
    if (jugadores.length === 0) {
      return res.status(400).json({ message: 'Debe enviar al menos un jugador' });
    }
     
    const resultados = {creados : Array<PlayerEntity>(), eliminados : Array<PlayerEntity>()};

    for (const jugador of jugadores) { 
      let player  = { id :'', user: jugador.id ,     game: idGame , isActive:true};
      console.log(jugador, typeof(jugador),player );
      const exit = await this.playerRepo.getPlayerByUserAndGame(jugador.id , idGame); 
      if(exit){
        if(!jugador.checked){
          console.log({exit}) 
        const eliminado =   await this.playerRepo.deactivatePlayer(exit.id)
          resultados.eliminados.push(eliminado!);
        } 
      }else if(jugador.checked){
      const creado = await this.playerRepo.createPlayer(player);
       resultados.creados.push(creado);}
    }

    res.status(201).json({ message: 'Jugadores creados', data: resultados });

  }
  public updateplayer = async (req: any, res: any) => {
    const { playerId } = req.params;
    const updateData = req.body;
    return this.playerRepo.updatePlayer(playerId, updateData);
  }
  public deactivateplayer(playerId: string) {
    return this.playerRepo.deactivatePlayer
  }


}