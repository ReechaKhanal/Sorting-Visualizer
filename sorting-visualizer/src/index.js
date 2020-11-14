import ReactDOM from 'react-dom';
import './index.css';
import React, { useState, useEffect } from "react";
import { performInsertionSort } from "./insertionSort.js";
import { performMergeSort } from "./mergeSort.js";
import { performHeapSort } from "./heapSort.js";

/*
Name: SortButton
Description : This class supports a react component for the buttons used in 
			sorting and reset.
			All buttons "Insertion Sort", "Merge Sort", "Heap Sort" and "Reset"
			use this class as a React Component
*/
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
//
/*
Name: Bar
Description: This class serves as the react component for the each individual bar
			in the displayed chart used to visualize sorting.
			This class further impletements the color gradient used in the bars. 
			It takes the height as input of the bar and bases the color on height,
			higher the bar, darker the color.
*/
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
//
/*
Name: EverythingGrid
Description: This class, as the name suggests, serves as a base for almost everything.
			This is where rendering in react starts. It contains all the web-elements,
			uses above classes, and further calls additional class for different types
			of sorting.
*/
class EverythingGrid extends React.Component {

	constructor(props) {
		
		super(props);
		var randomArray = this.randomArray();
		var randomHtml = this.convertArrayToReactArray(randomArray);
		var randomOutputArray = [randomHtml];

		this.state = {
			array: randomArray,
			html: randomHtml,
			output_array: randomOutputArray,
		};
	}
	randomArray(){
		return Array.from({length: 30}, () => Math.floor(Math.random() * 20));
	}

	convertArrayToReactArray(inputArray){
		var outputArray = [];
		for (var i=0; i< inputArray.length; i++){
			outputArray.push(this.renderBar(inputArray[i]*30));
		}
		return outputArray;
	}

	renderInsertionSort(){

		var insertionOutput = performInsertionSort(this.state.array.slice());
		var updatedState = [], tempArray = [];

		for (var i=0; i< insertionOutput.length; i++){	
			
			tempArray = this.convertArrayToReactArray(insertionOutput[i]);
			updatedState.push(tempArray);
		}
		return updatedState;
	}
	
	renderMergeSort(){
		
		var toBeSorted = this.state.array.slice();
		var mergeOutput = performMergeSort(toBeSorted);
		var updatedState = [], tempArray = [];

		for (var i=0; i< mergeOutput.length; i++){	
			tempArray = this.convertArrayToReactArray(mergeOutput[i]);
			updatedState.push(tempArray);
		}
		return updatedState;
	}

	renderHeapSort(){
		
		var toBeSorted = this.state.array.slice();
		var heapOutput = performHeapSort(toBeSorted);
		var updatedState = [], tempArray = [];

		for (var i=0; i< heapOutput.length; i++){		
			tempArray = this.convertArrayToReactArray(heapOutput[i]);
			updatedState.push(tempArray);
		}
		return updatedState;
	}

	renderReset(){

		var array = this.randomArray();
		var html = this.convertArrayToReactArray(array);
		var output_array = [html];
		
		this.setState({array: array, html: html, output_array:output_array,});
	}

	handleClick(type){

		var output_array = [];
				
		if (type == "Insertion Sort"){
			output_array = this.renderInsertionSort();
		} else if (type == "Merge Sort"){
			output_array = this.renderMergeSort();
		} else if (type == "Reset"){
			output_array.push(this.state.html);
			this.renderReset();
		} else{
			output_array = this.renderHeapSort();
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