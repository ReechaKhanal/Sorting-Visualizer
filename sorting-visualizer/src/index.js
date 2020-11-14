import ReactDOM from 'react-dom';
import './index.css';
import React, { useState, useEffect } from "react";
import { performInsertionSort } from "./insertionSort.js";
import { performMergeSort } from "./mergeSort.js";
import { performHeapSort } from "./heapSort.js";

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
	
	renderInsertionSort(){

		var insertionOutput = performInsertionSort(this.state.array.slice());
		var updatedState = [], tempArray = [];

		for (var i=0; i< insertionOutput.length; i++){	
			tempArray = [];
			for (var j=0; j< (insertionOutput[i]).length; j++){
				tempArray.push(this.renderBar(insertionOutput[i][j] * 30));	
			}
			updatedState.push(tempArray);
		}
		return updatedState;
	}
	
	renderMergeSort(output_array){
		
		var toBeSorted = this.state.array.slice();
		var mergeOutput = performMergeSort(toBeSorted);
		var updatedState = [], tempArray = [];

		for (var i=0; i< mergeOutput.length; i++){	
			tempArray = [];
			for (var j=0; j< (mergeOutput[i]).length; j++){
				tempArray.push(this.renderBar(mergeOutput[i][j] * 30));	
			}
			updatedState.push(tempArray);
		}
		return updatedState;
	}

	renderHeapSort(output_array){
		
		var toBeSorted = this.state.array.slice();
		var heapOutput = performHeapSort(toBeSorted);
		var updatedState = [], tempArray = [];

		for (var i=0; i< heapOutput.length; i++){		
			tempArray = [];
			for (var j=0; j< (heapOutput[i]).length; j++){
				tempArray.push(this.renderBar(heapOutput[i][j] * 30));	
			}
			updatedState.push(tempArray);
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
				
		if (type == "Insertion Sort"){
			output_array = this.renderInsertionSort();
		} else if (type == "Merge Sort"){
			output_array = this.renderMergeSort(output_array);
		} else if (type == "Reset"){
			output_array.push(this.state.html);
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