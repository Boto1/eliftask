import { GET_PURCHASES, MESSAGE } from './constants';

export const uploadSuccess = ({ payload }) => ({
  type: GET_PURCHASES,
  payload
});

export const pushMessage = (msg) => ({
  type: MESSAGE, 
  msg
})


export const uploadDocumentRequest = (file) => {
  let data = new FormData();
  data.append('file', file);

  return (dispatch) => {
    fetch('/file', {
      method: 'POST',
      headers: {
        'Accept': 'multipart/form-data'
      },
      body: data
    })
    .then(res => res.json())
    .then(purchases => {
      if(purchases.error) {
        dispatch(pushMessage(purchases.error));
        setTimeout(() => dispatch(pushMessage('')), 5000);
      } else {
        dispatch(uploadSuccess({ payload: purchases }));
      }
    })
    .catch(error => dispatch(pushMessage(error)))
  }
}