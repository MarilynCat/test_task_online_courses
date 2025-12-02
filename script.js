// Данные курсов
const coursesData = [
    {
        id: 1,
        title: "The Ultimate Google Ads Training Course",
        category: "marketing",
        price: 100,
        instructor: "Jerome Bell",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Jerome+Bell"
    },
    {
        id: 2,
        title: "Product Management Fundamentals",
        category: "management",
        price: 480,
        instructor: "Marvin McKinney",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Marvin+McKinney"
    },
    {
        id: 3,
        title: "HR Management and Analytics",
        category: "hr-recruiting",
        price: 200,
        instructor: "Leslie Alexander Li",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Leslie+Alexander"
    },
    {
        id: 4,
        title: "Brand Management & PR Communications",
        category: "marketing",
        price: 530,
        instructor: "Kristin Watson",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Kristin+Watson"
    },
    {
        id: 5,
        title: "Graphic Design Basic",
        category: "design",
        price: 500,
        instructor: "Guy Hawkins",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Guy+Hawkins"
    },
    {
        id: 6,
        title: "Business Development Management",
        category: "management",
        price: 400,
        instructor: "Dianne Russell",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Dianne+Russell"
    },
    {
        id: 7,
        title: "Highload Software Architecture",
        category: "development",
        price: 600,
        instructor: "Brooklyn Simmons",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Brooklyn+Simmons"
    },
    {
        id: 8,
        title: "Human Resources - Selection and Recruitment",
        category: "hr-recruiting",
        price: 150,
        instructor: "Kathryn Murphy",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Kathryn+Murphy"
    },
    {
        id: 9,
        title: "User Experience. Human-centered Design",
        category: "design",
        price: 240,
        instructor: "Cody Fisher",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Cody+Fisher"
    }
];

// Маппинг категорий для отображения
const categoryLabels = {
    "marketing": "Marketing",
    "management": "Management",
    "hr-recruiting": "HR & Recruiting",
    "design": "Design",
    "development": "Development"
};

// Маппинг цветов категорий
const categoryColors = {
    "marketing": "#03CEA4",
    "management": "#5A87FC",
    "hr-recruiting": "#F89828",
    "design": "#F52F6E",
    "development": "#7772F1"
};

// Состояние приложения
let currentCategory = "all";
let searchQuery = "";

// Элементы DOM
const coursesContainer = document.getElementById("coursesContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter");
const loadMoreBtn = document.getElementById("loadMoreBtn");

// Функция создания карточки курса
function createCourseCard(course) {
    const card = document.createElement("div");
    card.className = "course-card";
    
    const categoryColor = categoryColors[course.category];
    const categoryLabel = categoryLabels[course.category];
    
    card.innerHTML = `
        <div class="course-card__image-wrapper">
            <img src="${course.image}" alt="${course.title}" class="course-card__image">
        </div>
        <div class="course-card__content">
            <span class="course-card__category" style="background-color: ${categoryColor}">
                ${categoryLabel}
            </span>
            <h3 class="course-card__title">${course.title}</h3>
            <div class="course-card__price-wrapper">
                <span class="course-card__price">$${course.price}</span>
                <span class="course-card__divider">|</span>
                <span class="course-card__instructor">by ${course.instructor}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Функция фильтрации курсов
function filterCourses() {
    let filtered = coursesData;
    
    // Фильтрация по категории
    if (currentCategory !== "all") {
        filtered = filtered.filter(course => course.category === currentCategory);
    }
    
    // Фильтрация по поисковому запросу
    if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(course => 
            course.title.toLowerCase().includes(query)
        );
    }
    
    return filtered;
}

// Функция отображения курсов
function renderCourses() {
    const filtered = filterCourses();
    
    coursesContainer.innerHTML = "";
    
    if (filtered.length === 0) {
        coursesContainer.innerHTML = '<p class="courses__empty">Курсы не найдены</p>';
        loadMoreBtn.style.display = "none";
        return;
    }
    
    filtered.forEach(course => {
        const card = createCourseCard(course);
        coursesContainer.appendChild(card);
    });
    
    // Скрываем кнопку "Load more", так как карточек всего 9
    loadMoreBtn.style.display = "none";
}

// Обработчик поиска
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderCourses();
});

// Обработчики фильтров
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Убираем активный класс со всех кнопок
        filterButtons.forEach(btn => btn.classList.remove("filter_active"));
        // Добавляем активный класс к нажатой кнопке
        button.classList.add("filter_active");
        // Обновляем текущую категорию
        currentCategory = button.dataset.category;
        renderCourses();
    });
});

// Инициализация
renderCourses();

