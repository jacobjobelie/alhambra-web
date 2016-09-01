import {
  TOUR_LOCATION_CHANGED,
  TOUR_BEARING_CHANGED,
  TOUR_SPEAKING_CHANGED,
} from '../constants/action-types';

import { Record } from 'immutable';

/**
 * Record is like a class, but immutable and with default values.
 * https://facebook.github.io/immutable-js/docs/#/Record
 */
const InitialState = Record({
  location: {
    distance:1
  },
  locationIndex: NaN,
  speakingCounter: 0,
  state: 'out',
  bearing: 0,
});

const initialState = new InitialState;

/**
 * [projects description]
 * @param  {Record} state  =  initialState [An immutable Record defined above]
 * @param  {function} action [Redux action. Defined in '/actions/terms.js']
 * @return {Record} a new copy of the state you passed into with any changes to it
 */
export default function tour(state = initialState, action) {
  switch (action.type) {
    case TOUR_LOCATION_CHANGED:
      {
        if (action.payload.locationIndex !== state.get('locationIndex')) {
          return state.set('location', action.payload.location)
            .set('locationIndex', action.payload.locationIndex)
            .set('state', action.payload.state)
        }
        return state
      }
    case TOUR_SPEAKING_CHANGED:
      {
        let _c = state.get('speakingCounter')
        return state.set('speakingCounter', _c + 1)
      }
    case TOUR_BEARING_CHANGED:
      {
        return state.set('bearing', action.payload)
      }
    default:
      {
        return state;
      }
  }
}
