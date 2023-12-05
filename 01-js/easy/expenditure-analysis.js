/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let result = {};
  transactions.forEach((trnsac) => {
    if (result[trnsac.category] === undefined) result[trnsac.category] = 0;
    result[trnsac.category] += trnsac.price;
  });
  let updatedResult = [];

  for (const key in result) {
    updatedResult.push({
      category: key,
      totalSpent: result[key],
    });
  }
  return updatedResult;
}

module.exports = calculateTotalSpentByCategory;
