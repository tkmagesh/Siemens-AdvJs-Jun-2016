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
aggregate
transform
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












