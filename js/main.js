/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_tarif_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tarif-api */ "./src/js/components/tarif-api.js");
/* harmony import */ var _components_tarif_api__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_tarif_api__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modals */ "./src/js/components/modals.js");
/* harmony import */ var _components_modals__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_modals__WEBPACK_IMPORTED_MODULE_1__);

// import "./components/minutesdown"


/***/ }),

/***/ "./src/js/_functions.js":
/*!******************************!*\
  !*** ./src/js/_functions.js ***!
  \******************************/
/***/ (() => {

// Реализация бургер-меню
// import { burger } from "./functions/burger"

// import GraphTabs from 'graph-tabs'

// if (document.querySelector('.hero-tabs')) {
//   const tabs = new GraphTabs('buy-tabs')
// }

/***/ }),

/***/ "./src/js/_vars.js":
/*!*************************!*\
  !*** ./src/js/_vars.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body
});

/***/ }),

/***/ "./src/js/_vendor.js":
/*!***************************!*\
  !*** ./src/js/_vendor.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_focus_visible_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor/focus-visible.js */ "./src/js/vendor/focus-visible.js");
/* harmony import */ var _vendor_focus_visible_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_focus_visible_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./src/js/components/modals.js":
/*!*************************************!*\
  !*** ./src/js/components/modals.js ***!
  \*************************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", function () {
  const btnModals = document.querySelectorAll('.btn-modal');
  const modalForms = document.querySelectorAll('[data-modal-target]');
  if (btnModals.length > 0 && modalForms.length > 0) {
    btnModals.forEach(btn => {
      btn.addEventListener("click", () => {
        let dataModalPath = btn.getAttribute('data-modal-path');
        if (document.querySelector(`.graph-modal__container[data-modal-target="${dataModalPath}"]`)) {
          const modal = document.querySelector(`.graph-modal__container[data-modal-target="${dataModalPath}"]`);
          document.querySelector("body").classList.add("disable-scroll");
          document.querySelector("body").style.setProperty("padding-right", '17px');
          document.querySelector('.graph-modal').classList.add("is-open");
          modal.classList.add("graph-modal-open");
          modal.querySelector('.js-modal-close').addEventListener('click', () => {
            modal.classList.remove("graph-modal-open");
            modal.classList.remove("animate-open");
            modal.classList.remove("fade");
            document.querySelector(".graph-modal").classList.remove("is-open");
            document.querySelector("body").classList.remove("disable-scroll");
            document.querySelector("body").style.removeProperty("padding-right");
          });
        }
      });
    });
  }
});

/***/ }),

/***/ "./src/js/components/tarif-api.js":
/*!****************************************!*\
  !*** ./src/js/components/tarif-api.js ***!
  \****************************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", function () {
  const saleItems = document.querySelector(".sale__items");

  //функция четния тарифов
  async function getListTest() {
    let isPopular = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    let isDiscount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let response = await fetch(`https://t-pay.iqfit.app/subscribe/list-test`);
    if (response.ok) {
      let result = await response.json();
      loadListTest(result, isPopular, isDiscount);
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }

  // функция вывода тарифов
  function loadListTest(data, isPopular) {
    let isDiscount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    saleItems.innerHTML = "";
    let popularTemplateStart = '<label class="sale__item item">';
    let popularTemplateBody = "";
    let popularTemplateEnd = "</label>";
    let prices = [];

    //набиваем массив цен без скидок
    data.forEach(item => {
      if (!item.isPopular && !item.isDiscount) {
        prices.push(item.price);
      }
    });

    //вывод скидочных
    if (isPopular === true) {
      let i = 0;
      data.forEach(item => {
        if (item.isPopular) {
          if (i === 0) {
            popularTemplateBody = '<input type="radio" class="custom-radio" name="item" checked>';
          } else {
            popularTemplateBody = '<input type="radio" class="custom-radio" name="item">';
          }
          if (i === 0) {
            popularTemplateBody += `<span class="item__sale">-30%</span>`;
          } else if (i === 1) {
            popularTemplateBody += `<span class="item__sale">-40%</span>`;
          } else if (i === 2) {
            popularTemplateBody += `<span class="item__sale">-50%</span>`;
          } else if (i === 3) {
            popularTemplateBody += `<span class="item__sale">-70%</span>`;
          }
          popularTemplateBody += `<span class="item__period">${item.name}</span>`;
          popularTemplateBody += `<div class="block__price"><span class="item__price">${item.price}₽</span>`;
          if (i === 0) {
            popularTemplateBody += `<del class="item__oldprice">${prices[i]}₽</del></div>
            <div class="item__description">Чтобы просто начать 👍🏻</div>`;
          } else if (i === 1) {
            popularTemplateBody += `<del class="item__oldprice">${prices[i]}₽</del></div>
            <div class="item__description">Привести тело в порядок 💪🏻</div>`;
          } else if (i === 2) {
            popularTemplateBody += `<del class="item__oldprice">${prices[i]}₽</del></div>
            <div class="item__description">Изменить образ&nbsp;жизни 🔥</div>`;
          } else if (i === 3) {
            popularTemplateBody += `<del class="item__oldprice">${prices[i]}₽</del></div>
            <div class="item__description">Всегда быть в форме<span class="no-tablet"> и поддерживать своё здоровье</span> ⭐️</div>`;
          }
          let popularTemplate = "";
          popularTemplate += popularTemplateStart;
          popularTemplate += popularTemplateBody;
          popularTemplate += popularTemplateEnd;
          saleItems.insertAdjacentHTML("beforeend", popularTemplate);
          i++;
        }
      });
    }

    //вывод без скидок
    if (isPopular === false) {
      let i = 0;
      data.forEach(item => {
        if (!item.isPopular && !item.isDiscount) {
          if (i === 0) {
            popularTemplateBody = '<input type="radio" class="custom-radio" name="item" checked>';
          } else {
            popularTemplateBody = '<input type="radio" class="custom-radio" name="item">';
          }
          popularTemplateBody += `<span class="item__period">${item.name}</span>`;
          popularTemplateBody += `<div class="block__price"><span class="item__price">${item.price}₽</span>`;
          if (i === 0) {
            popularTemplateBody += `</div><div class="item__description">Чтобы просто начать 👍🏻</div>`;
          } else if (i === 1) {
            popularTemplateBody += `</div><div class="item__description">Привести тело в порядок 💪🏻</div>`;
          } else if (i === 2) {
            popularTemplateBody += `</div><div class="item__description">Изменить образ&nbsp;жизни 🔥</div>`;
          } else if (i === 3) {
            popularTemplateBody += `</div><div class="item__description">
            Всегда быть в форме<span class="no-tablet"> и поддерживать своё здоровье</span> ⭐️</div>`;
          }
          let popularTemplate = "";
          popularTemplate += popularTemplateStart;
          popularTemplate += popularTemplateBody;
          popularTemplate += popularTemplateEnd;
          saleItems.insertAdjacentHTML("beforeend", popularTemplate);
          i++;
        }
      });
    }

    //вывод в модалку
    if (isDiscount === true) {
      const saleItemsModal = document.querySelector(".graph-modal__content form .sale__items");
      let i = 0;
      data.forEach(item => {
        if (item.isDiscount === true) {
          if (i === 0) {
            popularTemplateBody = '<div class="custom"><input type="radio" class="custom-radio" name="item" checked></div>';
          } else {
            popularTemplateBody = '<div class="custom"><input type="radio" class="custom-radio" name="item"></div>';
          }
          popularTemplateBody += `<span class="item__period">${item.name}</span>`;
          if (i === 0) {
            popularTemplateBody += `<div class="item__oldprice">${prices[i]}₽</div>`;
          } else if (i === 1) {
            popularTemplateBody += `<div class="item__oldprice">${prices[i]}₽</div>`;
          } else if (i === 2) {
            popularTemplateBody += `<div class="item__oldprice">${prices[i]}₽</div>`;
          }
          popularTemplateBody += `<div class="block__price"><span class="item__price">${item.price}₽</span>`;
          if (i === 0) {
            popularTemplateBody += `<span class="item__sale">-40%</span></div>`;
          } else if (i === 1) {
            popularTemplateBody += `<span class="item__sale">-50%</span></div>`;
          } else if (i === 2) {
            popularTemplateBody += `<span class="item__sale">-60%</span></div>`;
          }
          let popularTemplate = "";
          popularTemplate += popularTemplateStart;
          popularTemplate += popularTemplateBody;
          popularTemplate += popularTemplateEnd;
          saleItemsModal.insertAdjacentHTML("beforeend", popularTemplate);
          i++;
        }
      });
    }
  }

  // функция вызова модального окна
  function showModal() {
    const modal = document.querySelector(`.graph-modal__container[data-modal-target="sale-stop"]`);
    document.querySelector("body").classList.add("disable-scroll");
    document.querySelector("body").style.setProperty("padding-right", "17px");
    document.querySelector(".graph-modal").classList.add("is-open");
    modal.classList.add("graph-modal-open");
    getListTest(false, true);
    function closeModal() {
      modal.classList.remove("graph-modal-open");
      modal.classList.remove("animate-open");
      modal.classList.remove("fade");
      document.querySelector(".graph-modal").classList.remove("is-open");
      document.querySelector("body").classList.remove("disable-scroll");
      document.querySelector("body").style.removeProperty("padding-right");
    }
    modal.querySelector(".js-modal-close").addEventListener("click", () => {
      closeModal();
    });
    document.querySelector(".graph-modal").addEventListener("click", () => {
      // closeModal();
    });
  }

  // на сколько минут ставим таймер
  var count = 1;
  let started = false;

  // функция таймера
  function startTimer() {
    if (started) {
      return;
    }
    let start_time = new Date();
    // получаем время окончания таймера
    let stop_time = start_time.setMinutes(start_time.getMinutes() + count);

    // запускаем ежесекундный отсчёт
    const countdown = setInterval(function () {
      let now = new Date().getTime();
      // сколько времени осталось до конца таймера
      let remain = stop_time - now;
      // переводим миллисекунды в минуты и секунды
      let min = Math.floor(remain % (1000 * 60 * 60) / (1000 * 60));
      let sec = Math.floor(remain % (1000 * 60) / 1000);
      // если значение минут и секунд меньше 10, добавляем вначале ведущий ноль
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      document.getElementById("minutes").innerHTML = min;
      document.getElementById("seconds").innerHTML = sec;

      // отсечка 30-ти секунд до конца
      if (min === "00" && sec <= 30) {
        document.getElementById("clockdiv").classList.add("attention");
      }
      // отсечка для анимации исчезновения
      if (min === "00" && sec === "01") {
        document.getElementById("sale").classList.add("prediscount");
      }
      // если время вышло
      if (remain < 0) {
        clearInterval(countdown);
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        document.getElementById("sale").classList.remove("prediscount");
        document.getElementById("sale").classList.add("discount");
        getListTest(false);

        // задержка на вывод модалки
        setTimeout(() => {
          showModal();
        }, 2000);
      }
    }, 1000);
    started = true;
  }
  getListTest();
  startTimer();
});

/***/ }),

/***/ "./src/js/vendor/focus-visible.js":
/*!****************************************!*\
  !*** ./src/js/vendor/focus-visible.js ***!
  \****************************************/
/***/ (() => {

/**
 * Applies the :focus-visible polyfill at the given scope.
 * A scope in this case is either the top-level Document or a Shadow Root.
 *
 * @param {(Document|ShadowRoot)} scope
 */
function applyFocusVisiblePolyfill(scope) {
  var hadKeyboardEvent = true;
  var hadFocusVisibleRecently = false;
  var hadFocusVisibleRecentlyTimeout = null;
  var inputTypesAllowlist = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    time: true,
    datetime: true,
    'datetime-local': true
  };

  /**
   * Helper function for legacy browsers and iframes which sometimes focus
   * elements like document, body, and non-interactive SVG.
   * @param {Element} el
   */
  function isValidFocusTarget(el) {
    if (el && el !== document && el.nodeName !== 'HTML' && el.nodeName !== 'BODY' && 'classList' in el && 'contains' in el.classList) {
      return true;
    }
    return false;
  }

  /**
   * Computes whether the given element should automatically trigger the
   * `focus-visible` class being added, i.e. whether it should always match
   * `:focus-visible` when focused.
   * @param {Element} el
   * @return {boolean}
   */
  function focusTriggersKeyboardModality(el) {
    var type = el.type;
    var tagName = el.tagName;
    if (tagName === 'INPUT' && inputTypesAllowlist[type] && !el.readOnly) {
      return true;
    }
    if (tagName === 'TEXTAREA' && !el.readOnly) {
      return true;
    }
    if (el.isContentEditable) {
      return true;
    }
    return false;
  }

  /**
   * Add the `focus-visible` class to the given element if it was not added by
   * the author.
   * @param {Element} el
   */
  function addFocusVisibleClass(el) {
    if (el.classList.contains('focus-visible')) {
      return;
    }
    el.classList.add('focus-visible');
    el.setAttribute('data-focus-visible-added', '');
  }

  /**
   * Remove the `focus-visible` class from the given element if it was not
   * originally added by the author.
   * @param {Element} el
   */
  function removeFocusVisibleClass(el) {
    if (!el.hasAttribute('data-focus-visible-added')) {
      return;
    }
    el.classList.remove('focus-visible');
    el.removeAttribute('data-focus-visible-added');
  }

  /**
   * If the most recent user interaction was via the keyboard;
   * and the key press did not include a meta, alt/option, or control key;
   * then the modality is keyboard. Otherwise, the modality is not keyboard.
   * Apply `focus-visible` to any current active element and keep track
   * of our keyboard modality state with `hadKeyboardEvent`.
   * @param {KeyboardEvent} e
   */
  function onKeyDown(e) {
    if (e.metaKey || e.altKey || e.ctrlKey) {
      return;
    }
    if (isValidFocusTarget(scope.activeElement)) {
      addFocusVisibleClass(scope.activeElement);
    }
    hadKeyboardEvent = true;
  }

  /**
   * If at any point a user clicks with a pointing device, ensure that we change
   * the modality away from keyboard.
   * This avoids the situation where a user presses a key on an already focused
   * element, and then clicks on a different element, focusing it with a
   * pointing device, while we still think we're in keyboard modality.
   * @param {Event} e
   */
  function onPointerDown(e) {
    hadKeyboardEvent = false;
  }

  /**
   * On `focus`, add the `focus-visible` class to the target if:
   * - the target received focus as a result of keyboard navigation, or
   * - the event target is an element that will likely require interaction
   *   via the keyboard (e.g. a text box)
   * @param {Event} e
   */
  function onFocus(e) {
    // Prevent IE from focusing the document or HTML element.
    if (!isValidFocusTarget(e.target)) {
      return;
    }
    if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
      addFocusVisibleClass(e.target);
    }
  }

  /**
   * On `blur`, remove the `focus-visible` class from the target.
   * @param {Event} e
   */
  function onBlur(e) {
    if (!isValidFocusTarget(e.target)) {
      return;
    }
    if (e.target.classList.contains('focus-visible') || e.target.hasAttribute('data-focus-visible-added')) {
      // To detect a tab/window switch, we look for a blur event followed
      // rapidly by a visibility change.
      // If we don't see a visibility change within 100ms, it's probably a
      // regular focus change.
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(function () {
        hadFocusVisibleRecently = false;
      }, 100);
      removeFocusVisibleClass(e.target);
    }
  }

  /**
   * If the user changes tabs, keep track of whether or not the previously
   * focused element had .focus-visible.
   * @param {Event} e
   */
  function onVisibilityChange(e) {
    if (document.visibilityState === 'hidden') {
      // If the tab becomes active again, the browser will handle calling focus
      // on the element (Safari actually calls it twice).
      // If this tab change caused a blur on an element with focus-visible,
      // re-apply the class when the user switches back to the tab.
      if (hadFocusVisibleRecently) {
        hadKeyboardEvent = true;
      }
      addInitialPointerMoveListeners();
    }
  }

  /**
   * Add a group of listeners to detect usage of any pointing devices.
   * These listeners will be added when the polyfill first loads, and anytime
   * the window is blurred, so that they are active when the window regains
   * focus.
   */
  function addInitialPointerMoveListeners() {
    document.addEventListener('mousemove', onInitialPointerMove);
    document.addEventListener('mousedown', onInitialPointerMove);
    document.addEventListener('mouseup', onInitialPointerMove);
    document.addEventListener('pointermove', onInitialPointerMove);
    document.addEventListener('pointerdown', onInitialPointerMove);
    document.addEventListener('pointerup', onInitialPointerMove);
    document.addEventListener('touchmove', onInitialPointerMove);
    document.addEventListener('touchstart', onInitialPointerMove);
    document.addEventListener('touchend', onInitialPointerMove);
  }
  function removeInitialPointerMoveListeners() {
    document.removeEventListener('mousemove', onInitialPointerMove);
    document.removeEventListener('mousedown', onInitialPointerMove);
    document.removeEventListener('mouseup', onInitialPointerMove);
    document.removeEventListener('pointermove', onInitialPointerMove);
    document.removeEventListener('pointerdown', onInitialPointerMove);
    document.removeEventListener('pointerup', onInitialPointerMove);
    document.removeEventListener('touchmove', onInitialPointerMove);
    document.removeEventListener('touchstart', onInitialPointerMove);
    document.removeEventListener('touchend', onInitialPointerMove);
  }

  /**
   * When the polfyill first loads, assume the user is in keyboard modality.
   * If any event is received from a pointing device (e.g. mouse, pointer,
   * touch), turn off keyboard modality.
   * This accounts for situations where focus enters the page from the URL bar.
   * @param {Event} e
   */
  function onInitialPointerMove(e) {
    // Work around a Safari quirk that fires a mousemove on <html> whenever the
    // window blurs, even if you're tabbing out of the page. ¯\_(ツ)_/¯
    if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'html') {
      return;
    }
    hadKeyboardEvent = false;
    removeInitialPointerMoveListeners();
  }

  // For some kinds of state, we are interested in changes at the global scope
  // only. For example, global pointer input, global key presses and global
  // visibility change should affect the state at every scope:
  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mousedown', onPointerDown, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  document.addEventListener('touchstart', onPointerDown, true);
  document.addEventListener('visibilitychange', onVisibilityChange, true);
  addInitialPointerMoveListeners();

  // For focus and blur, we specifically care about state changes in the local
  // scope. This is because focus / blur events that originate from within a
  // shadow root are not re-dispatched from the host element if it was already
  // the active element in its own scope:
  scope.addEventListener('focus', onFocus, true);
  scope.addEventListener('blur', onBlur, true);

  // We detect that a node is a ShadowRoot by ensuring that it is a
  // DocumentFragment and also has a host property. This check covers native
  // implementation and polyfill implementation transparently. If we only cared
  // about the native implementation, we could just check if the scope was
  // an instance of a ShadowRoot.
  if (scope.nodeType === Node.DOCUMENT_FRAGMENT_NODE && scope.host) {
    // Since a ShadowRoot is a special kind of DocumentFragment, it does not
    // have a root element to add a class to. So, we add this attribute to the
    // host element instead:
    scope.host.setAttribute('data-js-focus-visible', '');
  } else if (scope.nodeType === Node.DOCUMENT_NODE) {
    document.documentElement.classList.add('js-focus-visible');
    document.documentElement.setAttribute('data-js-focus-visible', '');
  }
}

// It is important to wrap all references to global window and document in
// these checks to support server-side rendering use cases

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Make the polyfill helper globally available. This can be used as a signal
  // to interested libraries that wish to coordinate with the polyfill for e.g.,
  // applying the polyfill to a shadow root:
  window.applyFocusVisiblePolyfill = applyFocusVisiblePolyfill;

  // Notify interested libraries of the polyfill's presence, in case the
  // polyfill was loaded lazily:
  var event;
  try {
    event = new CustomEvent('focus-visible-polyfill-ready');
  } catch (error) {
    // IE11 does not support using CustomEvent as a constructor directly:
    event = document.createEvent('CustomEvent');
    event.initCustomEvent('focus-visible-polyfill-ready', false, false, {});
  }
  window.dispatchEvent(event);
}
if (typeof document !== 'undefined') {
  // Apply the polyfill to the global document, so that no JavaScript
  // coordination is required to use the polyfill in the top-level document:
  applyFocusVisiblePolyfill(document);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_vendor */ "./src/js/_vendor.js");
/* harmony import */ var _vars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_vars */ "./src/js/_vars.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_functions */ "./src/js/_functions.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_functions__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_components */ "./src/js/_components.js");




})();

/******/ })()
;
//# sourceMappingURL=main.js.map