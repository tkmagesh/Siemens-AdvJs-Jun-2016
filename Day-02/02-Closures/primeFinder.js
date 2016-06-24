Create a function that checks if the given number is prime or not (returns
true or false)

isPrime(100) //runs the algo
isPrime(101) //runs the algo
isPrime(102) //runs the algo

isPrime(100) //doesnot run the algo
isPrime(101) //doesnot run the algo
isPrime(102) //doesnot run the algo

function getPrimeFinder(){
	var cache = {};
	function isPrime(n){
		if (typeof cache[n] !== 'undefined'){
			console.log("from cache - ", n);
			return cache[n];
		}
		console.log("processing - ", n);
		if (n <= 3) {
			cache[n] = true;
		} else {
			cache[n] = true;
			for( var i=2; i<= (n/2); i++)
				if (n % i === 0){
					cache[n] = false;
					break;
				}
			return cache[n];

		}
	}
	return isPrime
}

function getPrimeFinder(){
	var cache = {};
	function checkPrime(n){
		console.log("processing - ", n);
		if (n <= 3) 
			return true;
			
		for( var i=2; i<= (n/2); i++)
			if (n % i === 0) 
				return false;
				
		return true;
	}
	return function isPrime(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkPrime(n);
		return cache[n];
	}
}

function getOddEvenFinder(){
	var cache = {};
	function checkOddEven(n){
		console.log("processing - ", n);
		return n % 2 === 0 ? : 'even' :'odd';
		
	}
	return function (n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkOddEven(n);
		return cache[n];
	}
}

function memoize(algoFn){
	var cache = {};
	
	return function (n){
		if (typeof cache[n] === 'undefined')
			cache[n] = algoFn(n);
		return cache[n];
	}
}

var isOddOrEven = memoize(function checkOddEven(n){
	console.log("processing - ", n);
	return n % 2 === 0 ? : 'even' :'odd';
})

var isPrime = memoize(function checkPrime(n){
	console.log("processing - ", n);
	if (n <= 3) 
		return true;
		
	for( var i=2; i<= (n/2); i++)
		if (n % i === 0) 
			return false;
			
	return true;
});

function memoize(algoFn){
	var cache = {};
	
	return function (){
		var key = JSON.stringify(arguments);
		if (typeof cache[key] === 'undefined')
			cache[key] = algoFn.apply(this, arguments);
		return cache[key];
	}
}












