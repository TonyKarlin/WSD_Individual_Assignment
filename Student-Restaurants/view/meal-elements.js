'use strict';

const createMeals = (meals) => {
  const mRow = document.createElement('tr');
  mRow.className = 'meal-row';
  const {name, price, diets} = meals;
  if (mRow) {
    mRow.innerHTML = `
    <div class='meal'><h3>${name}</h3></div>
    ${price ? `<div class='meal-price'>${price} €</div>` : ''}
    ${diets ? `<div class='meal-diet'>${diets}</div>` : ''}
    `;
  }
  return mRow;
};

const createMealsTable = (meals) => {
  const mealsTable = document.createElement('table');
  mealsTable.className = 'meals-table';
  mealsTable.innerHTML = `
    <thead>
      <tr>
        <th>Meal</th>
        <th>Price</th>
        <th>Diets</th>
      </tr>
    </thead>
    <tbody class='meals-table-body'>
    </tbody>
  `;
  const mealsTableBody = mealsTable.querySelector('.meals-table-body');
  if (mealsTableBody) {
    meals?.forEach((course) => {
      const mealRow = createMeals(course);
      mealsTableBody.appendChild(mealRow);
    });
  }

  const mainContainer = document.querySelector('.main-container');
  mainContainer.innerHTML = '';
  mainContainer.appendChild(mealsTable);
};

export {createMealsTable};
