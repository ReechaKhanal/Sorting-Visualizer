export function performInsertionSort(toBeSorted){

	var updatedState = [];
	
	for (var i=1; i < toBeSorted.length; i++) {
			
		var previous = i-1, current = i;

		while (previous >= 0 && (toBeSorted[current] < toBeSorted[previous])){
				
			var a = toBeSorted[current], b = toBeSorted[previous];

			toBeSorted[current] = b;
			toBeSorted[previous] = a;
				
			current = current-1;
			previous = previous-1;
			
			var test = [];
			for (var j = 0; j< toBeSorted.length; j++){
				test.push(toBeSorted[j]);
			}
			updatedState.push(test);
		}
	}
	return updatedState;
}