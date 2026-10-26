
const track = document.getElementById("sliderTrack");
// Получил блок, в котором находятся все изображения

const prevButton = document.getElementById("prev");
// Получил кнопку переключения назад

const nextButton = document.getElementById("next");
// Получил кнопку переключения вперёд

const pagination = document.getElementById("pagination");
// Получил блок для точек переключения страниц

const images = Array.from(track.querySelectorAll("img"));
// Собрал все изображения в массив, чтобы с ними было удобнее работать

let currentPage = 0;
// Запомнил текущую страницу, начиная с нулевой

let visibleCount = 3;
// Указал количество изображений, которые показываются одновременно

let totalPages = 0;
// Создал переменную для общего количества страниц

function updateGallery() {
    // Функция обновляет галерею и её пейджер

    // На смартфоне показываю одно изображение
    visibleCount = window.innerWidth <= 600 ? 1 : 3;

    // Вычисляю количество страниц в зависимости от ширины экрана
    totalPages = Math.ceil(images.length / visibleCount);

    // Проверяю, чтобы текущая страница не выходила за пределы галереи
    currentPage = Math.min(currentPage, totalPages - 1);

    // Очищаю точки перед созданием новых
    pagination.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
        // Создаю точки для каждой страницы

        const dot = document.createElement("button");
        // Создал кнопку для переключения на страницу

        dot.classList.add("dot");
        // Добавил класс для оформления точки

        dot.setAttribute("aria-label", `Страница ${i + 1}`);
        // Добавил название страницы для доступности

        if (i === currentPage) {
            dot.classList.add("active");
            // Выделил точку текущей страницы
        }

        dot.addEventListener("click", () => {
            // При нажатии на точку переключаю страницу

            currentPage = i;
            // Запоминаю выбранную страницу

            updateGallery();
            // Обновляю галерею
        });

        pagination.appendChild(dot);
        // Добавляю точку в пейджер
    }

    // Получаю ширину одного изображения
    const imageWidth = images[0].getBoundingClientRect().width;

    // Получаю расстояние между изображениями
    const gap = parseFloat(getComputedStyle(track).gap) || 0;

    // Вычисляю, на какое расстояние нужно сдвинуть галерею
    const offset = currentPage * visibleCount * (imageWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
    // Сдвигаю изображения влево на нужное расстояние

    // Отключаю кнопку назад на первой странице
    prevButton.disabled = currentPage === 0;

    // Отключаю кнопку вперёд на последней странице
    nextButton.disabled = currentPage === totalPages - 1;

    // Получаю все точки пейджера
    const dots = pagination.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        // Проверяю каждую точку и выделяю текущую страницу
        dot.classList.toggle("active", index === currentPage);
    });
}

// Переключение назад
prevButton.addEventListener("click", () => {
    // Выполняю действие при нажатии на левую стрелку

    if (currentPage > 0) {
        // Проверяю, что это не первая страница

        currentPage--;
        // Перехожу на предыдущую страницу

        updateGallery();
        // Обновляю положение изображений и пейджер
    }
});

// Переключение вперёд
nextButton.addEventListener("click", () => {
    // Выполняю действие при нажатии на правую стрелку

    if (currentPage < totalPages - 1) {
        // Проверяю, что это не последняя страница

        currentPage++;
        // Перехожу на следующую страницу

        updateGallery();
        // Обновляю положение изображений и пейджер
    }
});

// Перестраиваю галерею при изменении ширины экрана
window.addEventListener("resize", updateGallery);

// Запускаю обновление галереи после загрузки страницы
window.addEventListener("load", updateGallery);
