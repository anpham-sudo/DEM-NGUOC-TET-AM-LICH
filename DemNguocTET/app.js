const TET_DATES = [
  { at: "2026-02-17T00:00:00+07:00", name: "Tết Bính Ngọ", year: "Năm Ngọ" },
  { at: "2027-02-06T00:00:00+07:00", name: "Tết Đinh Mùi", year: "Năm Mùi" },
  { at: "2028-01-26T00:00:00+07:00", name: "Tết Mậu Thân", year: "Năm Thân" },
  { at: "2029-02-13T00:00:00+07:00", name: "Tết Kỷ Dậu", year: "Năm Dậu" },
  { at: "2030-02-03T00:00:00+07:00", name: "Tết Canh Tuất", year: "Năm Tuất" },
  { at: "2031-01-23T00:00:00+07:00", name: "Tết Tân Hợi", year: "Năm Hợi" },
  { at: "2032-02-11T00:00:00+07:00", name: "Tết Nhâm Tý", year: "Năm Tý" },
  { at: "2033-01-31T00:00:00+07:00", name: "Tết Quý Sửu", year: "Năm Sửu" },
  { at: "2034-02-19T00:00:00+07:00", name: "Tết Giáp Dần", year: "Năm Dần" },
  { at: "2035-02-08T00:00:00+07:00", name: "Tết Ất Mão", year: "Năm Mão" },
  { at: "2036-01-28T00:00:00+07:00", name: "Tết Bính Thìn", year: "Năm Thìn" }
];

const ONE_DAY = 24 * 60 * 60 * 1000;

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const festivalEl = document.getElementById("festival-name");
const solarEl = document.getElementById("solar-date");
const messageEl = document.getElementById("message");
const cardEl = document.querySelector(".card");

function tetCalendar() {
  return TET_DATES.map(function (item) {
    return {
      name: item.name,
      year: item.year,
      date: new Date(item.at)
    };
  });
}

function nextTet(now) {
  return tetCalendar().find(function (item) {
    return item.date.getTime() > now.getTime();
  });
}

function tetInProgress(now) {
  return tetCalendar().find(function (item) {
    const elapsed = now.getTime() - item.date.getTime();
    return elapsed >= 0 && elapsed < ONE_DAY;
  });
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatSolar(date) {
  const parts = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric"
  }).formatToParts(date);

  const lookup = {};
  parts.forEach(function (part) {
    lookup[part.type] = part.value;
  });

  const weekday = lookup.weekday.charAt(0).toUpperCase() + lookup.weekday.slice(1);
  return weekday + ", " + lookup.day + " tháng " + lookup.month + " năm " + lookup.year;
}

function showTime(days, hours, minutes, seconds) {
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function render(now) {
  const celebrating = tetInProgress(now);
  const tet = celebrating || nextTet(now);

  if (!tet) {
    festivalEl.textContent = "Hết dữ liệu Tết trong lịch";
    solarEl.textContent = "";
    messageEl.textContent = "Hãy bổ sung mốc Tết tiếp theo trong app.js.";
    return;
  }

  festivalEl.textContent = tet.name + " · " + tet.year;
  solarEl.textContent = "Mùng 1 · " + formatSolar(tet.date);

  if (celebrating) {
    showTime(0, 0, 0, 0);
    cardEl.classList.add("is-new-year");
    messageEl.textContent = "Chúc Mừng Năm Mới!";
    return;
  }

  const totalSeconds = Math.floor((tet.date.getTime() - now.getTime()) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  showTime(days, hours, minutes, seconds);
  cardEl.classList.remove("is-new-year");

  if (days > 0) {
    messageEl.textContent = "Còn " + days + " ngày nữa là đến giao thừa.";
  } else {
    messageEl.textContent = "Giao thừa trong hôm nay.";
  }
}

const WISHES = [
  "An khang thịnh vượng, vạn sự như ý.",
  "Năm mới sức khỏe dồi dào, gia đình sum vầy.",
  "Xuân về hạnh phúc, tài lộc đầy nhà."
];

const wishEl = document.getElementById("wish");
const wishBtn = document.getElementById("wish-btn");
const copyBtn = document.getElementById("copy-btn");
const petalBtn = document.getElementById("petal-btn");
let wishIndex = 0;

wishBtn.addEventListener("click", function () {
  wishEl.hidden = false;
  wishEl.textContent = WISHES[wishIndex % WISHES.length];
  wishIndex += 1;
});

copyBtn.addEventListener("click", function () {
  const text = festivalEl.textContent + " — " + messageEl.textContent;
  const done = function () {
    const original = copyBtn.textContent;
    copyBtn.textContent = "Đã chép";
    window.setTimeout(function () {
      copyBtn.textContent = original;
    }, 1400);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done);
    return;
  }

  done();
});

petalBtn.addEventListener("click", function () {
  const hidden = document.body.classList.toggle("petals-off");
  petalBtn.setAttribute("aria-pressed", hidden ? "false" : "true");
  petalBtn.textContent = hidden ? "Hiện hoa" : "Hoa rơi";
});

render(new Date());
setInterval(function () {
  render(new Date());
}, 1000);
