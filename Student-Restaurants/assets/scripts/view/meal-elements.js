'use strict';

const createMeals = ({name, price, diets}) => {
  const mRow = document.createElement('tr');
  mRow.innerHTML = `
    <td>${name ?? 'Unknown Meal'}</td>
    <td>${price ? `${price} €` : 'N/A'}</td>
    <td>${diets ?? 'No diets available'}</td>
  `;
  return mRow;
};

const createMealsTable = async (meals) => {
  const mealsTable = document.querySelector('.meals-table');
  if (!mealsTable) {
    console.error('No meals table body found');
    return;
  }
  mealsTable.innerHTML = ``;
  mealsTable.innerHTML = `
    <thead>
      <tr class="table-header">
        <th class="meals-header">Meal</th>
        <th class="price-header">Price</th>
        <th class="diets-header">Diets</th>
      </tr>
    </thead>
  `;

  meals?.forEach((course) => {
    const mealRow = createMeals(course);
    mealsTable.appendChild(mealRow);
  });
  return mealsTable;
};

export {createMealsTable};
