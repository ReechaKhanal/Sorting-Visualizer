export function performMergeSort(toBeSorted){

	var updatedState = [];

	var temp = new Array(30).fill(0);
		
	var output = merge_sort(updatedState, toBeSorted, temp, 0, temp.length-1);
		
	updatedState = output[0];
	toBeSorted = output[1];

	return updatedState;
}

function merge_sort_helper(updatedState, toBeSorted, temp, left, mid, right){
		
	var leftStart = left, leftEnd = mid, rightStart = mid+1, rightEnd = right;
	var array_size = rightEnd - leftStart + 1;
	var index = leftStart;

	while ((leftStart <= leftEnd) && (rightStart <= rightEnd)){
		if (toBeSorted[leftStart] <= toBeSorted[rightStart]){
			
			temp[index] = toBeSorted[leftStart];
			leftStart = leftStart + 1;
		}
		else{
			temp[index] = toBeSorted[rightStart];
			rightStart = rightStart + 1;
		}
		index = index + 1
	}

	while (leftStart <= leftEnd){
		temp[index] = toBeSorted[leftStart];
		index = index + 1;
		leftStart = leftStart + 1;
	}
	while (rightStart <= rightEnd){
		temp[index] = toBeSorted[rightStart];
		index = index + 1;
		rightStart = rightStart + 1;
	}

	for (var i = left; i <= right; i++){
		toBeSorted[i] = temp[i]
	}

	var test = [];		
	for (var k=0; k<toBeSorted.length; k++){
		test.push(toBeSorted[k])
	}

	updatedState.push(test);
	return [updatedState, toBeSorted];
}

function merge_sort(updatedState, toBeSorted, temp, left, right){

	if (( (left >= 0) && (right < toBeSorted.length) )  && (left < right)){

		var mid = Math.floor((left+right)/2);

		var output = merge_sort(updatedState, toBeSorted, temp, left, mid);
		updatedState = output[0];
		toBeSorted = output[1];
		output = merge_sort(updatedState, toBeSorted, temp, mid+1, right);
		updatedState = output[0];
		toBeSorted = output[1];

		return merge_sort_helper(updatedState, toBeSorted, temp, left, mid, right);
	}else{
		return [updatedState, toBeSorted]
	}
}