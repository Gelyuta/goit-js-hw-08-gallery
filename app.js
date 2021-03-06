const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Задание:
// Создание и рендер разметки по массиву данных
//  galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery 
// и получение url большого изображения.
// Открытие модального окна по клику на элементе 
// галереи.
// Подмена значения атрибута src элемента 
// img.lightbox__image.
// Закрытие модального окна по клику на кнопку
//  button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента 
// img.lightbox__image. Это необходимо для того, 
// чтобы при следующем открытии модального окна,
//  пока грузится изображение, мы не видели предыдущее.

// ********************************************
// Дополнительно:
// Закрытие модального окна по клику на 
// div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом 
// модальном окне клавишами "влево" и "вправо".



// Галерея 
const galleryEl = document.querySelector('.js-gallery');

const imagesMarkup = createGalleryImagesMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', imagesMarkup);

// console.log(createGalleryImagesMarkup(galleryItems))

function createGalleryImagesMarkup(galleryItems) {
 return galleryItems.map(({ preview, original, description }, index) => {
    return `
    <li class = "gallery__item">
    <a class = "gallery__link" href = "${original}">
    <img class = "gallery__image" src = "${preview}" alt = "${description}"  data-source = "${original}"  data-index = "${index}">
    </>
    </a>
    </li>
     `;
     
}).join(' ');
}

// Модалка 

const refs = {
  modalEl: document.querySelector('.js-lightbox'),
  overlayModalEl: document.querySelector('.lightbox__overlay'),
  btnCloseModalEl: document.querySelector('[data-action="close-lightbox"]'),
  imageEl: document.querySelector('.lightbox__image')
}




galleryEl.addEventListener('click', onClickGalleryImage)

function onClickGalleryImage (e){
e.preventDefault();

if(!e.target.classList.contains('gallery__image')){
  return
}
// console.log(e.target.dataset.source)

refs.modalEl.classList.add('is-open')
window.addEventListener('keydown', onEskPress)

refs.imageEl.src = e.target.dataset.source
refs.btnCloseModalEl.addEventListener('click', onCloseModal)
refs.overlayModalEl.addEventListener('click', onOverlayClick)
// console.log(refs.imageEl)
}

function onCloseModal() {
  window.removeEventListener('keydown', onEskPress);
  refs.modalEl.classList.remove('is-open');
  refs.imageEl.src = '';
}

function onOverlayClick(e) {
  if(e.currentTarget === e.target){
    onCloseModal() 
  }
}

function onEskPress(e) {
if(e.code === 'Escape'){
  onCloseModal() 
  }
}

// Пролистывание галереи

// function onArrowRight() {
//   if (currentIndex + 1 > galleryItems.length - 1) {
//     currentIndex = 0;
//   } else {
//     currentIndex += 1;
//   }
//   lightBoxImgContent(
//     galleryItems[currentIndex].original,
//     galleryItems[currentIndex].description,
//   );
// }

// function onArrowLeft() {
//   if (currentIndex - 1 < 0) {
//     currentIndex = galleryItems.length - 1;
//   } else {
//     currentIndex -= 1;
//   }
//   lightBoxImgContent(
//     galleryItems[currentIndex].original,
//     galleryItems[currentIndex].description,
//   );
// }
