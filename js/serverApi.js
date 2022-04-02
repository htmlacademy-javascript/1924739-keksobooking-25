const getBookings = () => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((data) => data.json())
  .catch((e) => {
    throw new Error(`Ошибка при попытке запроса данных с сервера: ${e.message}`);
  });

const createElement = (htmlString) => {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
};

const showErrorDialog = (error, onRetryAction) => {
  const mainElement = document.querySelector('body');
  const dialog = createElement(`<div class="error"><p class="error__message">${error.message}</p></div>`);

  const closeButton = createElement(`<button type="button" class="error__button">${onRetryAction === undefined
    ? 'Понятно'
    : 'Попробовать снова'}</button>`);

  const onCloseButtonClick = () => {
    if (onRetryAction !== undefined) {
      onRetryAction();
    }
    closeButton.removeEventListener('click', onCloseButtonClick);
    dialog.remove();
  };
  closeButton.addEventListener('click', onCloseButtonClick);

  const onKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.removeEventListener('keydown', onKeydownHandler);
      dialog.remove();
    }
  };
  window.addEventListener('keydown', onKeydownHandler);

  dialog.lastChild.after(closeButton);
  mainElement.appendChild(dialog);
};

export {getBookings, showErrorDialog};
