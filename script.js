document.getElementById("button").addEventListener('click', () => {
    // Use the specific meal name "Arrabiata" in the API URL
    let mealName = document.getElementById('inputName').value 
    let details = document.getElementById("details");
    details.innerHTML = "";
//   Using API all meal items is display in the code
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById("items");
            items.innerHTML = "";

            if (data.meals == null) {
                document.getElementById("msg").style.display = "block";
            } else {
                document.getElementById("msg").style.display = "none";
                data.meals.forEach(meal => {
                    const itemDiv = document.createElement("div");
                    itemDiv.className = "m-2 singleItem";
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`);
                    
                    const itemInfo = `
                        <div class="card" style="width: 12rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body text-center">
                                <h5 class="card-text1">${meal.strMeal}</h5>
                            </div>
                        </div>
                    `;
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv);
                });
            }
        })
        .catch(error => {
            console.error(`Error: ${error.message}`);
        });
});
// All meals datails codes is there
function details(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            let meal = detail.meals[0];
            console.log(meal);

            let details = document.getElementById("details");
            details.innerHTML = "";

            let detailsDiv = document.createElement("div");
            let detailsInfo = `
                <div class="card " style="width: 15rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body ">
                        <h3 class="card-text">${meal.strMeal}</h3>
                        <h6>Ingredients</h6>
                        <ul>
                            <li>${meal.strArea}</li>
                            <li>${meal.strCategory}</li>
                            <li>${meal.strIngredient1}</li>
                            <li>${meal.strIngredient2}</li>
                            <li>${meal.strIngredient3}</li>
                            <li>${meal.strIngredient4}</li>
                        </ul>
                    </div>
                </div>
            `;
            detailsDiv.innerHTML = detailsInfo;
            details.appendChild(detailsDiv);
        })
        .catch(error => {
            console.error(`Error: ${error.message}`);
        });
}

//  This code block waits for the DOM to be fully loaded and then calls the getRandomMeals function
document.addEventListener("DOMContentLoaded", () => {
    getRandomMeals();
  });
  const randomMealsContainer = document.getElementById("random-meals-container");
  // Fetches random meals from the API and displays them
  function getRandomMeals() {
    fetchMeals("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((data) => {
        const randomMeals = data.meals.slice(0);
        displayRandomMeals(randomMeals, "random-meals-container");
      })
      .catch((error) => console.error("Error fetching random meals:", error));
  }
  //function to display random meal
  function displayRandomMeals(meals, containerId) {
    const mealsContainer = document.getElementById(containerId);
    mealsContainer.innerHTML = "";
  
    meals.forEach((meal) => {
      const mealDiv = document.createElement("div");
      mealDiv.classList.add("meal");
      mealDiv.innerHTML = `
              <h2>${meal.strMeal}</h2>
              <img class="image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <p>${meal.strInstructions}</p>
          `;
  
      mealsContainer.appendChild(mealDiv);
    });
  }
  // Fetch meals from the API
  function fetchMeals(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching meals:", error);
        throw error;
      });
  }







