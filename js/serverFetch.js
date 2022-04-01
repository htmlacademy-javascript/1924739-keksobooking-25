const getBookings = () => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((data) => data.json())
  .catch((e) => {
    throw new Error(`Ошибка при попытке запроса данных с сервера: ${e.message}`);
  });

const handleFetchError = (error, onRetryAction) => {
  const mainElement = document.querySelector('main');
  const content = `<div class="error">
      <p class="error__message">${error.message}</p>
      <button type="button" class="error__button">Попробовать снова</button>
    </div>`;
  const template = document.createElement('template');
  template.innerHTML = content;
  const button = template.content.querySelector('.error__button');
  const modalDialogElement = template.content.firstElementChild;
  const onErrorBtnClick = () => {
    modalDialogElement.remove();
    onRetryAction();
    button.removeEventListener('click', onErrorBtnClick);
  };
  button.addEventListener('click', onErrorBtnClick);
  mainElement.appendChild(modalDialogElement);
};

export {getBookings, handleFetchError};
