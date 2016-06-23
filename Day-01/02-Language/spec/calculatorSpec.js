describe("A Calculator", function(){
	it("Should add two numbers", function(){

		//Arrange
		var n1 = 10,
			n2 = 20,
			expectedResult = 30;

		//Act
		var result = add(n1, n2);

		//Assert
		expect(result).toBe(expectedResult);
	});
});