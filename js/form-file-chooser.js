const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview > img');

avatarFileChooser.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((v) => fileName.endsWith(v))) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});


const bookingPhotoFileChooser = document.querySelector('#images');
const bookingImagePreview = document.querySelector('.ad-form__photo');

bookingPhotoFileChooser.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((v) => fileName.endsWith(v))) {
    bookingImagePreview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Фотография жилья" width="70" height="70">`;
  }
});

const clearImagesPreview = () => {
  bookingImagePreview.innerHTML = '';
  avatarPreview.src = 'img/muffin-grey.svg';
};


export {clearImagesPreview};
