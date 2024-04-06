document.addEventListener("DOMContentLoaded", function () {
  const saleItems = document.querySelector(".sale__items");

  //функция четния тарифов
  async function getListTest(isPopular = true, isDiscount = false) {
    let response = await fetch(`https://t-pay.iqfit.app/subscribe/list-test`);

    if (response.ok) {
      let result = await response.json();
      loadListTest(result, isPopular, isDiscount);
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }

  // функция вывода тарифов
  function loadListTest(data, isPopular, isDiscount = false) {
    saleItems.innerHTML = "";

    let popularTemplateStart = '<label class="sale__item item">';
    let popularTemplateBody = "";
    let popularTemplateEnd = "</label>";

    let prices = [];

    //набиваем массив цен без скидок
    data.forEach((item) => {
      if (!item.isPopular && !item.isDiscount) {
        prices.push(item.price);
      }
    });

    //вывод скидочных
    if (isPopular === true) {
      let i = 0;
      data.forEach((item) => {
        if (item.isPopular) {
          if (i === 0) {
            popularTemplateBody =
              '<input type="radio" class="custom-radio" name="item" checked>';
          } else {
            popularTemplateBody =
              '<input type="radio" class="custom-radio" name="item">';
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
      data.forEach((item) => {
        if (!item.isPopular && !item.isDiscount) {
          if (i === 0) {
            popularTemplateBody =
              '<input type="radio" class="custom-radio" name="item" checked>';
          } else {
            popularTemplateBody =
              '<input type="radio" class="custom-radio" name="item">';
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
      const saleItemsModal = document.querySelector(
        ".graph-modal__content form .sale__items"
      );
      let i = 0;

      data.forEach((item) => {
        if (item.isDiscount === true) {
          if (i === 0) {
            popularTemplateBody =
              '<div class="custom"><input type="radio" class="custom-radio" name="item" checked></div>';
          } else {
            popularTemplateBody =
              '<div class="custom"><input type="radio" class="custom-radio" name="item"></div>';
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
    const modal = document.querySelector(
      `.graph-modal__container[data-modal-target="sale-stop"]`
    );

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
      let min = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
      let sec = Math.floor((remain % (1000 * 60)) / 1000);
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
