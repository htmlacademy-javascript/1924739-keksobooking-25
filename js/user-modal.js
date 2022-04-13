import {createElement} from './util.js';

const addDialogCloseHandler = (dialog, onDialogClose) => {

  const onKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      closeDialogAndRemoveListeners(evt, onDialogClose);
    }
  };

  const onMouseClick = (evt) => {
    closeDialogAndRemoveListeners(evt, onDialogClose);
  };

  function closeDialogAndRemoveListeners(evt, onClose) {
    evt.preventDefault();
    window.removeEventListener('keydown', onKeydownHandler);
    window.removeEventListener('click', onMouseClick);
    dialog.remove();
    if (onClose) {
      onClose();
    }
  }

  window.addEventListener('keydown', onKeydownHandler);
  window.addEventListener('click', onMouseClick);
};

const showErrorDialog = (errorMessage, onRetryAction) => {
  const mainElement = document.querySelector('body');
  const dialog = createElement(`<div class="error"><p class="error__message">${errorMessage ?
    `<br>${errorMessage}` : ''}</p></div>`);

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

  addDialogCloseHandler(dialog);

  dialog.lastChild.after(closeButton);
  mainElement.appendChild(dialog);
};

const showSuccessDialog = (onDialogClose) => {
  const mainElement = document.querySelector('body');
  const dialog = createElement(`<div class="success">
      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
    </div>`);

  addDialogCloseHandler(dialog, onDialogClose);

  mainElement.appendChild(dialog);
};

export {showErrorDialog, showSuccessDialog};
