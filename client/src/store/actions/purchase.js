import { GET_PURCHASES} from './constants';

export const getPurchases = () => dispatch => {
  return fetch('/api/purchases')
    .then(res => res.json())
  .then(purchases => dispatch({type: GET_PURCHASES, payload: purchases}))
}
