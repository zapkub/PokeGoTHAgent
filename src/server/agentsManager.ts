import { IAgent, INearByPokemon, ObserverAgent, IAgentsCallback, IAgentInfo } from './observer';
import * as Pokedex from './pokedex';


export class AgentsManager implements IAgentsCallback {
  public data: IAgentInfo[] = [];
  constructor(Agents: ObserverAgent[]) {
    Agents.map( item => {
      item.managerCallback = this;
      this.data.push({ info: item.info, nearByPokemon: [], catchablePokemon: [] });
    });
  }

  receiveAgentInfo(data: IAgentInfo): void {
    this.data.map( item => {
      if (item.info.id === data.info.id) {
        item.nearByPokemon = data.nearByPokemon;
        item.catchablePokemon = data.catchablePokemon;
      }
      return item;
    });
  };
};
