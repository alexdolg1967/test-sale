// на сколько минут ставим таймер
var count = 1;

let started = false;

// запуск таймера
function start() {
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
    // если время вышло
    if (remain < 0) {
      clearInterval(countdown);

      document.getElementById("minutes").innerHTML = "00";
      document.getElementById("seconds").innerHTML = "00";

      document.getElementById("sale").classList.add("discount");
    }
  }, 1000);

  started = true;
}

start();
