const refs = {
  controls: document.querySelector('.controls'), // ссылки на Табы
  panes: document.querySelector('.panes'), // ссылки на описание Таба
};

// делаем по умолчанию активный первый Таб и описание к нему
const defaultActiveTab = refs.controls.children[0]; // делаем 1-й Таб - активным по умолчанию
// по умолчанию делаем активный Таб и описание под этот Таб
addTabEvent(defaultActiveTab);

refs.controls.addEventListener('click', onTabEventClick);

// колбек на слушателе событий
function onTabEventClick(event) {
  const target = event.target;

  // если клацнули не в ссылку, то возврат
  if (target.nodeName !== 'A') {
    console.log('Нажал не в А');
    return;
  }

  // проверка на уже текущий активный таб. Если активен - делаем не активным
  const activeTab = refs.controls.querySelector('.controls__item--active'); // "прошлая" активная ссылка. Ищем среди кнопок та которая на момент нажатия на следующую кнопку была активна до того

  // если прошлый Таб существует, то убираем у него class
  if (activeTab) {
    // убираем с текущего активного Таба и с его описания стили видимости
    removeTabEvent(activeTab);
  }

  // делаем активный Таб и описание под этот Таб
  addTabEvent(target);
}
// делаем активный Таб и описание под этот Таб
function addTabEvent(target) {
  target.classList.add('controls__item--active'); // делаем Таб активным
  const tabId = target.getAttribute('href').slice(1); // находим значение href у Таба
  const pane = refs.panes.querySelector(`#${tabId}`); // находим по tabId описание которое отвечает этому Табу
  pane.classList.add('pane--active'); // добавляем найденому описанию class, чтобы он стал видимым
}

// делаем неаактивным Таб и описание под этим Таб
function removeTabEvent(activeTab) {
  // убираем с текущего активного Таба стиль видимости
  activeTab.classList.remove('controls__item--active');

  // убираем с текущего активного описания (которое действует с текущим Табом) стиль видимости
  const tabId = activeTab.getAttribute('href').slice(1); // находим значение href у прошлого активного Таба
  const pane = refs.panes.querySelector(`#${tabId}`); // находим по tabId описание атрибута "href" которое отвечает этому прошлому активному описанию
  pane.classList.remove('pane--active'); // удаляем прошлому активному описанию class, чтобы он стал невидимым, чтобы добавить видимость следующему активному
}
