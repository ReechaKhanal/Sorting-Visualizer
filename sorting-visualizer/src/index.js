import ReactDOM from 'react-dom';
import './index.css';
import React, { useState, useEffect } from "react";

class SortButton extends React.Component{
	render(){
		return (
			<button 
				className="SortButton"
				onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}
}

class Bar extends React.Component{
	render(){

		var a = this.props.height;
		var b = 67339; // 0x1070B
		var c = (b*a)/30; 
		var e = 5831134 - c; // 0x58F9DE - (0x1070B)*hex(a)
		var f = e.toString(16);
		const styles= {
			buttonStyle: {
				backgroundColor: '#'+f,
				height:this.props.height+"px"
			}
		};

		return(
			<button className="bar1" style={styles.buttonStyle}></button>
		);
	}
}

class EverythingGrid extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			array: [7, 11, 8, 16, 17, 
					19, 5, 13, 4, 7, 
					12, 3, 15, 9, 2, 
					18, 16, 1, 5, 8, 
					12, 14, 18, 9, 3, 
					6, 7, 2, 10, 4],
		
			html: [this.renderBar(210), this.renderBar(330), this.renderBar(240), this.renderBar(480), this.renderBar(510),
					this.renderBar(570), this.renderBar(150), this.renderBar(390), this.renderBar(120), this.renderBar(210), 
					this.renderBar(360), this.renderBar(90), this.renderBar(450), this.renderBar(270), this.renderBar(60), 
					this.renderBar(540), this.renderBar(480), this.renderBar(30), this.renderBar(150), this.renderBar(240), 
					this.renderBar(360), this.renderBar(420), this.renderBar(540), this.renderBar(270), this.renderBar(90),
					this.renderBar(180), this.renderBar(210), this.renderBar(60), this.renderBar(300), this.renderBar(120)],

			output_array: [[this.renderBar(210), this.renderBar(330), this.renderBar(240), this.renderBar(480), this.renderBar(510),
					this.renderBar(570), this.renderBar(150), this.renderBar(390), this.renderBar(120), this.renderBar(210), 
					this.renderBar(360), this.renderBar(90), this.renderBar(450), this.renderBar(270), this.renderBar(60), 
					this.renderBar(540), this.renderBar(480), this.renderBar(30), this.renderBar(150), this.renderBar(240), 
					this.renderBar(360), this.renderBar(420), this.renderBar(540), this.renderBar(270), this.renderBar(90),
					this.renderBar(180), this.renderBar(210), this.renderBar(60), this.renderBar(300), this.renderBar(120)]],
		};
	}
	
	renderInsertionSort(output_array){

		const toBeSorted = this.state.array.slice();
		var updatedState = output_array;
		
		var i = 1;
		for (i=1; i < toBeSorted.length; i++) {
			
			var previous = i-1, current = i;

			while (previous >= 0 && (toBeSorted[current] < toBeSorted[previous])){
				
				var a = toBeSorted[current], b = toBeSorted[previous];

				toBeSorted[current] = b;
				toBeSorted[previous] = a;
				
				current = current-1;
				previous = previous-1;

				var test = [];
				var k = 0;

				for (k=0; k<toBeSorted.length; k++){
					var j = toBeSorted[k]*30;
					test.push(this.renderBar(j))
				}

				updatedState.push(test);
			}
		}
		return updatedState;
	}

	merge_sort_helper(updatedState, toBeSorted, temp, left, mid, right){
		
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
		
		var i = left;
		for (i = left; i <= right; i++){
			toBeSorted[i] = temp[i]
		}

		var test = [];
		var k = 0;
				
		for (k=0; k<toBeSorted.length; k++){
			var j = toBeSorted[k]*30;
			test.push(this.renderBar(j))
		}
		updatedState.push(test);

		return [updatedState, toBeSorted];
	}

	merge_sort(updatedState, toBeSorted, temp, left, right){
		if (( (left >= 0) && (right < toBeSorted.length) )  && (left < right)){

			var mid = Math.floor((left+right)/2);

			var output = this.merge_sort(updatedState, toBeSorted, temp, left, mid);
			updatedState = output[0];
			toBeSorted = output[1];

			output = this.merge_sort(updatedState, toBeSorted, temp, mid+1, right);
			updatedState = output[0];
			toBeSorted = output[1];


			return this.merge_sort_helper(updatedState, toBeSorted, temp, left, mid, right);
		}else{
			return [updatedState, toBeSorted]
		}
	}
	
	renderMergeSort(output_array){
		var toBeSorted = this.state.array.slice();
		var updatedState = output_array;

		var temp = [0, 0, 0, 0, 0, 
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0];
		
		var output = this.merge_sort(updatedState, toBeSorted, temp, 0, temp.length-1);
		
		updatedState = output[0];
		toBeSorted = output[1];

		return updatedState;
	}

	heapify(updatedState, inputarray, size, index){
		
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
			
			this.heapify(updatedState, inputarray, size, largest);
		}

		var test = [];
		var k = 0;
		for (k=0; k<inputarray.length; k++){
			var j = inputarray[k]*30;
			test.push(this.renderBar(j));
		}
		updatedState.push(test);

		return [updatedState, inputarray];

	}

	renderHeapSort(output_array){
		
		var toBeSorted = this.state.array.slice();
		var updatedState = output_array;

		var n = toBeSorted.length;
		var start = Math.floor(n/2);
		
		var i =0;
		for (i = start-1; i > -1; i--){
			var output = this.heapify(updatedState, toBeSorted, n, i);
			updatedState = output[0];
			toBeSorted = output[1];
		}

		for (i = n-1; i > 0; i--){
			var a = toBeSorted[i];
			var b = toBeSorted[0];

			toBeSorted[i] = b;
			toBeSorted[0] = a;

			var output = this.heapify(updatedState, toBeSorted, i, 0);
			updatedState = output[0];
			toBeSorted = output[1];

		}
		return updatedState;
	}

	renderReset(){
		
		const array = [7, 11, 8, 16, 17, 
					19, 5, 13, 4, 7, 
					12, 3, 15, 9, 2, 
					18, 16, 1, 5, 8, 
					12, 14, 18, 9, 3, 
					6, 7, 2, 10, 4];
		const html = [this.renderBar(210), this.renderBar(330), this.renderBar(240), this.renderBar(480), this.renderBar(510),
					this.renderBar(570), this.renderBar(150), this.renderBar(390), this.renderBar(120), this.renderBar(210), 
					this.renderBar(360), this.renderBar(90), this.renderBar(450), this.renderBar(270), this.renderBar(60), 
					this.renderBar(540), this.renderBar(480), this.renderBar(30), this.renderBar(150), this.renderBar(240), 
					this.renderBar(360), this.renderBar(420), this.renderBar(540), this.renderBar(270), this.renderBar(90),
					this.renderBar(180), this.renderBar(210), this.renderBar(60), this.renderBar(300), this.renderBar(120)];

		const output_array = [[this.renderBar(210), this.renderBar(330), this.renderBar(240), this.renderBar(480), this.renderBar(510),
					this.renderBar(570), this.renderBar(150), this.renderBar(390), this.renderBar(120), this.renderBar(210), 
					this.renderBar(360), this.renderBar(90), this.renderBar(450), this.renderBar(270), this.renderBar(60), 
					this.renderBar(540), this.renderBar(480), this.renderBar(30), this.renderBar(150), this.renderBar(240), 
					this.renderBar(360), this.renderBar(420), this.renderBar(540), this.renderBar(270), this.renderBar(90),
					this.renderBar(180), this.renderBar(210), this.renderBar(60), this.renderBar(300), this.renderBar(120)]];
		this.setState({array: array, html: html, output_array:output_array,});
	}

	handleClick(type){

		var output_array = [];
		output_array.push(this.state.html);
		
		if (type == "Insertion Sort"){
			output_array = this.renderInsertionSort(output_array);
		} else if (type == "Merge Sort"){
			output_array = this.renderMergeSort(output_array);
		} else if (type == "Reset"){
			this.renderReset();
		} else{
			output_array = this.renderHeapSort(output_array);
		}
		this.setState({output_array: output_array,});
	}

	renderButton(type){
		return (
			<SortButton 
				value = {type}
				onClick= {() => this.handleClick(type)}/>
		);
	}
	renderBar(height){
		return <Bar height = {height}/>
	}
	render() {
		const welcome = "Sorting Visualizer";
		
		const Text = () => {
  			var work = this.state.output_array.slice();
  			const [seconds, setSeconds] = useState(0);
  			useEffect(() => {
    			const interval = setInterval(() => {
      				setSeconds((second) => (second === (work.length-1) ? (work.length-1) : second + 1));
    			}, 150);

    		return () => clearInterval(interval);
  			}, []);

  			useEffect(() => {
    		console.log("seconds", seconds);
  			}, [seconds]);
  			return (
    			<div>
      				<h1>{work[seconds]}</h1>
    			</div>
  			);
		};
		return (
			<div className="all">
				<div className="welcome">{welcome}</div>
				<div className = "sort-types">
					{this.renderButton("Insertion Sort")}
					{this.renderButton("Merge Sort")}
					{this.renderButton("Heap Sort")}
					{this.renderButton("Reset")}
				</div>
				<br/>
				<span className = "all-bars">
					<Text />
				</span>
			</div>
		);
	}
}

ReactDOM.render(
  <EverythingGrid />,
  document.getElementById('root')
);