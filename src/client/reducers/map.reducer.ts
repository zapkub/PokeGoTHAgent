import * as MapActions from '../actions/map.actions';
import { INearByPokemon, ICatchablePokemon, IAgentInfo} from '../../server/observer';
export class MapState {
  agents: IAgentInfo[] = [];
}
export const map = (state: MapState, action: {type: string, payload: any}) => {
  if (!state) {
    state = new MapState();
  }
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case MapActions.RELOAD_POKEMON_LIST :
      const payload = action.payload as IAgentInfo[];
      nextState.agents = [...payload];
      break;
    default:
    break;
  }

  return nextState;
};
