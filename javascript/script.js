// function untuk fetch api categories
async function fetchCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    displayCategories(data.categories);
}

//function untuk menampilkan data dari api categories
function displayCategories(categories) {
        categories.map((item) => {
            const catCls = document.querySelector(".categories");
            const image = document.createElement("img");
            image.src = item.strCategoryThumb;
            const div = document.createElement("div");
            div.appendChild(image);

            const catName = document.createElement("p");
            catName.textContent = item.strCategory;
            div.appendChild(catName);

            //aksi agar ketika div di klik akan mengarah ke meals.html
            div.addEventListener('click', () => {
                window.location.href = `meals.html?category=${item.strCategory}`;
            });

            catCls.appendChild(div);
        });
        console.log(categories);
}


// function untuk mengambil nilai parameter query di url, menggunakan parameter param
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


// function untuk fetch api dari isi categories
async function fetchMeals(category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    displayMeals(data.meals);
}

//function untuk menampilkan data api dari isi categories
function displayMeals(meals) {
    meals.map((item) => {
        const mealCls = document.querySelector(".list-categories");
        const image = document.createElement("img");
        image.src = item.strMealThumb;
        const div = document.createElement("div");
        mealCls.appendChild(div);
        div.appendChild(image);

        const mealName = document.createElement("p");
        mealName.textContent = item.strMeal;
        div.appendChild(mealName);

        div.addEventListener('click', () => {
            window.location.href = `detail.html?mealID=${item.idMeal}`;
        });

    });
    console.log(meals);
}


// function untuk fetch api detail 
async function fetchMealDetail(mealID) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const data = await response.json();
    displayMealDetail(data.meals[0]);
}

//function untuk menampilkan isi detail dari api tsb
function displayMealDetail(meal) {
    const mealDetail = document.querySelector(".meal-detail");
    const detailName = document.createElement("h1");
    detailName.textContent = meal.strMeal;
    const div = document.createElement('div');
    div.appendChild(detailName);
    
    const detailImage = document.createElement("img");
    detailImage.src = meal.strMealThumb;
    div.appendChild(detailImage);

    const tampAside = document.createElement('div');
    tampAside.className = 'tamp-aside';
    div.appendChild(tampAside);

    const detailTitleCat = document.createElement('h4');
    detailTitleCat.textContent = 'Category :';
    tampAside.appendChild(detailTitleCat);

    const detailCat = document.createElement("p");
    detailCat.textContent =  meal.strCategory;
    tampAside.appendChild(detailCat);

    const detailTitleCo = document.createElement('h4');
    detailTitleCo.textContent = 'Country :';
    tampAside.appendChild(detailTitleCo);

    const detailArea = document.createElement("p");
    detailArea.textContent = meal.strArea;
    tampAside.appendChild(detailArea);

    const detailTitleIng = document.createElement('h4');
    detailTitleIng.textContent = 'Ingredients :';
    tampAside.appendChild(detailTitleIng);

    const ingredientsList = document.createElement('ul');
    getIngredients(meal).map(ingredient => {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });
    tampAside.appendChild(ingredientsList);

    const tampUp = document.createElement('div');
    tampUp.className = 'tamp-up';
    tampUp.appendChild(detailImage);
    tampUp.appendChild(tampAside);
    div.appendChild(tampUp);
    
    const tampDown = document.createElement('div');
    tampDown.className = 'tamp-down';
    div.appendChild(tampDown);
    
    const detailIns = document.createElement("p");
    detailIns.textContent = meal.strInstructions;
    tampDown.appendChild(detailIns);

    const detailWatch = document.createElement('a');
    detailWatch.textContent = 'Watch Tutorial on YouTube'
    detailWatch.href = meal.strYoutube;
    detailWatch.target = '_blank';
    tampDown.appendChild(detailWatch);    
    
    mealDetail.appendChild(div);

}

//memanggil ingredients dalam detail
function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
    }
    return ingredients;
}

//cara pemanggilan fungsi getQueryParam nya (mengambil fungsi dari parameter query)
const category = getQueryParam('category');
const mealID = getQueryParam('mealID');

if (category) {
    fetchMeals(category);
} else if (mealID) {
    fetchMealDetail(mealID);
} else {
    fetchCategories();
}


async function fetchCountry(){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    displayCountry(data.meals);
}

function displayCountry(meals){
    meals.map((item) => {
        const foodCls = document.querySelector('.food-area');
        const areaName = document.createElement('p');
        areaName.textContent = item.strArea;
        const div = document.createElement('div');
        div.appendChild(areaName);

        div.addEventListener('click', () => {
            window.location.href = `areas.html?area=${item.strArea}`;
        });

        foodCls.appendChild(div);
    });
    console.log(meals);

}


async function fetchMealsArea(area) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await response.json();
    displayMealsArea(data.meals);
}

function displayMealsArea(meals) {
    meals.map((item) => {
        const areaCls = document.querySelector(".list-food-areas");
        const image = document.createElement("img");
        image.src = item.strMealThumb;
        const div = document.createElement("div");
        areaCls.appendChild(div);
        div.appendChild(image);

        const mealFood = document.createElement("p");
        mealFood.textContent = item.strMeal;
        div.appendChild(mealFood);

        div.addEventListener('click', () => {
            window.location.href = `detail.html?mealID=${item.idMeal}`;
        });

    });
}

const area = getQueryParam('area');

if (area) {
    fetchMealsArea(area);
} else {
    fetchCountry();
}


async function fetchIngredients() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    const ingredients = data.meals;

    for (let i = 0; i < 25; i++) {
        const ingredient = ingredients[i];

        const container = document.querySelector('.ingredients');
        const div = document.createElement('div');

        const nameIng = document.createElement('h4');
        nameIng.textContent = ingredient.strIngredient;
        div.appendChild(nameIng);

        const descriptionIng = document.createElement('p');
        descriptionIng.textContent = ingredient.strDescription
        div.appendChild(descriptionIng);

        container.appendChild(div);
    }
}

fetchIngredients();


//membuat aksi untuk bagian search
document.addEventListener('DOMContentLoaded', () => {
    function searchMeal() {
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');

        if (searchForm && searchInput) {
            searchForm.addEventListener('submit', (event) => {
                //mencegah aksi default
                event.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `search.html?meal=${query}`;
                }

                //mengosongkan / mereset form search ketika sudah di isi
                document.getElementById('search-form').reset();
            });
        } else {
            console.error('Not Found');
        }

        
    }
    searchMeal();

    async function searchResult() {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('meal');

        if (query) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            displayResults(data.meals);
        }
    }

    function displayResults(meals) {
        const container = document.getElementById('search-results');    
        
        //logika untuk menampilkan kondisi jika ada dan tidak adanya data
        if (meals) {
            meals.map(meal => {
                const mealDiv = document.createElement('div');
                
                const mealImage = document.createElement('img');
                mealImage.src = meal.strMealThumb;
                mealDiv.appendChild(mealImage);

                const mealName = document.createElement('p');
                mealName.textContent = meal.strMeal;
                mealDiv.appendChild(mealName);

                mealDiv.addEventListener('click', () => {
                    window.location.href = `detail.html?mealID=${meal.idMeal}`;
                });
                
                container.appendChild(mealDiv);
            });
        } else {
            const noResults = document.createElement('p');
            noResults.textContent = 'No meals found.';
            container.appendChild(noResults);
        }

    }
    searchResult();
});        


