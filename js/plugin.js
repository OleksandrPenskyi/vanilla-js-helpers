class TabsPlugin {
  constructor({
    selector, // селектор для поиска нужного узла в DOM
    defaultTab = 1, // начальный ТАБ
    controlsActiveClass, // активный класс для controls
    panesActiveClass, // активный класс для panes
  }) {
    this.selector = `#${selector}`; // передаем селектор нашего всего блока № 1
    this.defaultTab = defaultTab;
    this.controlsActiveClass = controlsActiveClass;
    this.panesActiveClass = panesActiveClass;

    this.refs = this.getRefs(); // вызываем метод, с помозью которого находим ссылки и записываем их в переменную
    this.start = this.tabEventClick(); // автозапускаем слушателя событий
    this.beginTabFrom = this.beginTabFrom(this.defaultTab); // метод начала Таба с какого-то номера
  }

  // получение ссылок
  getRefs() {
    const refs = {}; // обьект со ссылками
    refs.controls = document.querySelector(`${this.selector} .controls`); // ссылки на Табы
    refs.panes = document.querySelector(`${this.selector} .panes`); //ссылки на описание Таба
    return refs; // результат работы функции
  }

  // при загрузке старницы грузиться Таб № ... по умолчанию
  beginTabFrom(defaultTab) {
    //   ищем в controls ребенка с индексом "defaultTab - 1"
    const target = this.refs.controls.children[defaultTab - 1];
    // делаем активный Таб и описание под этот Таб
    this.addTabEvent(target);
  }

  // вешаем слушателя событий
  tabEventClick() {
    this.refs.controls.addEventListener(
      'click',
      this.onTabEventClick.bind(this), // в this передается только ссылка, потому делаем привязку с bind
    );
  }

  // вспомогательные функции
  // колбек на слушателе событий
  onTabEventClick(event) {
    const target = event.target;

    // если клацнули не в ссылку, то возврат
    if (target.nodeName !== 'A') {
      console.log('Нажал не в А');
      return;
    }

    // проверка на уже текущий активный таб. Если активен - делаем не активным
    // "прошлая" активная ссылка. Ищем среди кнопок та которая на момент нажатия на следующую кнопку была активна до того
    const activeTab = this.refs.controls.querySelector(
      `.${this.controlsActiveClass}`,
    );

    // если прошлый Таб существует, то убираем у него выделение цветом и описание
    if (activeTab) {
      this.removeTabEvent(activeTab);
    }

    // делаем активный Таб и описание под этот Таб
    this.addTabEvent(target);
  }

  // делаем активный Таб и описание под этим Таб
  addTabEvent(target) {
    target.classList.add(this.controlsActiveClass); // делаем Таб активным
    const tabId = target.getAttribute('href').slice(1); // находим значение href у Таба
    const pane = this.refs.panes.querySelector(`#${tabId}`); // находим по tabId описание которое отвечает этому Табу
    pane.classList.add(this.panesActiveClass); // добавляем найденому описанию class, чтобы он стал видимым
  }

  // делаем неаактивным Таб и описание под этим Таб
  removeTabEvent(activeTab) {
    // убираем с текущего активного Таба стиль видимости
    activeTab.classList.remove(this.controlsActiveClass);

    // убираем с текущего активного описания (которое действует с текущим Табом) стиль видимости
    const tabId = activeTab.getAttribute('href').slice(1); // находим значение href у прошлого активного Таба
    const pane = this.refs.panes.querySelector(`#${tabId}`); // находим по tabId описание атрибута "href" которое отвечает этому прошлому активному описанию
    pane.classList.remove('pane--active'); // удаляем прошлому активному описанию class, чтобы он стал невидимым, чтобы добавить видимость следующему активному
  }
}

const tab1 = new TabsPlugin({
  selector: 'tabs-1',
  defaultTab: 2,
  controlsActiveClass: 'controls__item--active',
  panesActiveClass: 'pane--active',
});
