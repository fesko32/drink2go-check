const selectWrap = document.querySelector('.catalog__select-wrap');
const select = document.querySelector('.catalog__select');

const slider = document.getElementById('price-slider');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');


select.addEventListener('mousedown', () => {
  selectWrap.classList.add('active');
});

select.addEventListener('blur', () => {
  selectWrap.classList.remove('active');
});

noUiSlider.create(slider, {
  start: [0, 900], // Начальные значения (минимум и максимум)
  connect: true, // Соединение между ручками
  range: {
    min: 0, // Минимальное значение
    max: 1000, // Максимальное значение
  },
  step: 100, // Шаг изменения
  format: {
    to: (value) => Math.round(value), // Форматируем значение
    from: (value) => Number(value),
  },
});

// Обновляем значения в `input` при движении слайдера
slider.noUiSlider.on('update', (values) => {
  priceMinInput.value = values[0]; // Устанавливаем значение в минимальное поле
  priceMaxInput.value = values[1]; // Устанавливаем значение в максимальное поле
});

// Обновляем слайдер при изменении значений в `input`
priceMinInput.addEventListener('change', () => {
  const minValue = parseInt(priceMinInput.value, 10);
  const maxValue = parseInt(priceMaxInput.value, 10);

  // Обновляем слайдер, проверяя, чтобы минимальное значение было не больше максимального
  slider.noUiSlider.set([minValue, maxValue]);
});

priceMaxInput.addEventListener('change', () => {
  const minValue = parseInt(priceMinInput.value, 10);
  const maxValue = parseInt(priceMaxInput.value, 10);

  // Обновляем слайдер, проверяя, чтобы максимальное значение было не меньше минимального
  slider.noUiSlider.set([minValue, maxValue]);
});

function updateConnectColor(values) {
  const connectElement = document.querySelector('.price-inpun');

  // Проверяем, если одно из значений равно 0
  if (parseFloat(values[0]) === 0) {
    connectElement.style.color = '#BDBDBD'; // Серый цвет
  }
  else {
    connectElement.style.color = '#000000'; // Обычный цвет
  }
}

slider.noUiSlider.on('update', (values) => {
  updateConnectColor(values);
});

// Устанавливаем цвет при загрузке
updateConnectColor(slider.noUiSlider.get());
