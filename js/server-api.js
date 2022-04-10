const fetchBookings = () => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((data) => data.json())
  .catch((e) => {
    throw new Error(`Ошибка при попытке запроса данных с сервера: ${e.message}`);
  });

const postFormData = (form) => fetch('https://25.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    body: new FormData(form)
  });

export {fetchBookings, postFormData};
