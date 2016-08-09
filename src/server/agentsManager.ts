import { IAgent, INearByPokemon, ObserverAgent, IAgentsCallback, AgentInfo } from './observer';


export class AgentsManager implements IAgentsCallback {
  constructor(Agents: ObserverAgent[]) {

  }

  receiveAgentInfo(data: AgentInfo): void {

  }
};
