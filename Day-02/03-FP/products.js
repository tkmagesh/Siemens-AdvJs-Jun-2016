var products = [
	{id : 6, name : "Pen", cost : 20, units : 40, category : 1},
	{id : 4, name : "Hen", cost : 200, units : 5, category : 1},
	{id : 7, name : "Ten", cost : 10, units : 10, category : 2},
	{id : 5, name : "Den", cost : 50, units : 7, category : 2},
	{id : 2, name : "Zen", cost : 100, units : 3, category : 1}
];

/*
sort
filter
any
all
groupBy
min
max
sum
avg
aggregate (reduce)
transform (map)
forEach (each)
*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe("Default List", function(){
	console.table(products);
});
describe("Sorting", function(){
	describe("Default Sorting (products by id)", function(){
		function sortProductsById(){
			for(var i=0; i< products.length-1; i++)
				for(var j=i+1; j<products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sortProductsById();
		console.table(products);
	});
	describe("Any list by any attribute", function(){
		function sort(list, attrName){
			for(var i=0; i< list.length-1; i++)
				for(var j=i+1; j<list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe("products by cost", function(){
			sort(products, "cost");
			console.table(products);
		});
		describe("products by units", function(){
			sort(products, "units");
			console.table(products);
		});
	});

	describe("Any list by any comparison", function(){
		/*
		l < r   -1
		l = r   0
		l > r   1
		*/
		function sort(list, comparisonFn){
			for(var i=0; i< list.length-1; i++)
				for(var j=i+1; j<list.length; j++){
					if (comparisonFn(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}
		describe("products by value [units * cost]", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.units * p1.cost,
					p2Value = p2.units * p2.cost;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			};
			sort(products, productComparerByValue);
			console.table(products);
		})
	});

	describe("any list by anything (attrName / comparisonFn)", function(){
		function sort(list, comparer){
			var comparisonFn = comparer;
			if (typeof comparer === 'string'){
				comparisonFn = function(t1, t2){
					var t1Valuer = t1[comparer],
						t2Value = t2[comparer];
					if (t1Valuer < t2Value) return -1;
					if (t1Valuer === t2Value) return 0;
					return 1;
				}
			}
			for(var i=0; i< list.length-1; i++)
				for(var j=i+1; j<list.length; j++){
					if (comparisonFn(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
				}
		}

		describe("products by category [attrName]", function(){
			sort(products, "category");
			console.table(products);
		});

		describe("products by value [units * cost] [comparisonFn]", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.units * p1.cost,
					p2Value = p2.units * p2.cost;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			};
			sort(products, productComparerByValue);
			console.table(products);
		})
	})
	
});

describe("Filtering", function(){
	describe("Filter products by category 1", function(){
		function filterProductsByCategory1(){
			var result = [];
			for(var i=0; i<products.length; i++)
				if (products[i].category === 1)
					result.push(products[i]);
			return result;
		}
		var category1Products = filterProductsByCategory1();
		console.table(category1Products);

	});

	describe("Any list by any criteria", function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var i=0; i<list.length; i++)
				if (criteriaFn(list[i]))
					result.push(list[i]);
			return result;
		};

		var category1ProductCriteria = function(product){
			return product.category === 1;
		};

		describe("All category 1 products", function(){
			var category1Products = filter(products, category1ProductCriteria);
			console.table(category1Products);
		});

		var costlyProductCriteria = function(product){
			return product.cost >= 100;
		};

		describe("All costly products [ cost >= 100] ", function(){
			var costlyProducts = filter(products, costlyProductCriteria);
			console.table(costlyProducts);
		});

		/*var nonCategory1ProductCriteria = function(product){
			return product.category !== 1;
		};*/

		/*var nonCategory1ProductCriteria = function(product){
			return !category1ProductCriteria(product);
		};*/

		/*var affordableProductCriteria = function(product){
			return product.cost < 100;
		}*/

		/*var affordableProductCriteria = function(product){
			return !costlyProductCriteria(product);
		}*/

		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			};
		}

		var nonCategory1ProductCriteria = negate(category1ProductCriteria);
		
		describe("non category 1 products", function(){
			var nonCategory1Products = filter(products, nonCategory1ProductCriteria);
			console.table(nonCategory1Products);
		});

		var affordableProductCriteria = negate(costlyProductCriteria);
		describe("Affordable products", function(){
			var affordableProducts = filter(products, affordableProductCriteria);
			console.table(affordableProducts);
		});

	})
});

describe("GroupBy", function(){
	function groupBy(list, keySelectorFn){
		var result = {};
		for(var i=0; i<list.length; i++){
			var key = keySelectorFn(list[i]);
			result[key] = result[key] || [];
			result[key].push(list[i]);
		}
		return result;
	}

	function printGroup(groupedObj){
		for(var key in groupedObj)
			describe("Key - " + key, function(){
				console.table(groupedObj[key]);
			});
	}
	describe("Products by category", function(){
		var categoryKeySelectorFn = function(product){
			return product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelectorFn);
		printGroup(productsByCategory);
	});

	describe("Products by cost", function(){
		var costKeySelectorFn = function(product){
			return product.cost < 100 ? "affordable" : "costly";
		};
		var productsByCost = groupBy(products,costKeySelectorFn);
		printGroup(productsByCost);
	})
});