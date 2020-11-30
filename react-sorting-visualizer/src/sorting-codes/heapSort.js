function heapify(updatedState, inputarray, size, index){
		
	var largest = index;
	var left = index*2 + 1;
	var right = index*2 + 2;
		
	if ((left < size) && (inputarray[index] < inputarray[left])){
		largest = left;
	}
	if ((right < size) && (inputarray[largest] < inputarray[right])){
		largest = right;
	}
	if (largest !== index){
		
		var a = inputarray[index];
		var b = inputarray[largest];

		inputarray[index] = b;
		inputarray[largest] = a;
			
		heapify(updatedState, inputarray, size, largest);
	}

	var test = [];
	for (var k=0; k<inputarray.length; k++){
		var j = inputarray[k];
		test.push(j);
	}
	updatedState.push(test);

	return [updatedState, inputarray];
}

export function performHeapSort(toBeSorted){
	
	var updatedState = [];

	var n = toBeSorted.length;
	var start = Math.floor(n/2);
		
	
	for (var i = start-1; i > -1; i--){
		var output = heapify(updatedState, toBeSorted, n, i);
		updatedState = output[0];
		toBeSorted = output[1];
	}

	for (i = n-1; i > 0; i--){
		var a = toBeSorted[i];
		var b = toBeSorted[0];

		toBeSorted[i] = b;
		toBeSorted[0] = a;

		var output = heapify(updatedState, toBeSorted, i, 0);
		updatedState = output[0];
		toBeSorted = output[1];

	}
	return updatedState;
}