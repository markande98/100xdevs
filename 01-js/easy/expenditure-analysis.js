/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
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
