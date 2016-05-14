var wordCount, wordCountListArr, summary, valid;
var createBreak = () => document.createElement('br');
var createDiv = () => document.createElement('div');
						

function wordCounter(){
	//Retrieve the text from the webpage textarea
	var textAreaString = document.getElementById('textString').value;

	//Store all the words in a list, excluding punctuation (include hypens and apostrophes)
	var wordList = textAreaString
		.replace(/[^\w' -]|[ '-]{2,}|[\b\s]['-]\s|\s['-][\b\s]|_/gm, " ")	//removes unacceptable punctuation, whitespaces, and hyphens/dashes and apostrophes (repeating or prefix/suffix)
		.replace(/[^\w' -]|[ '-]{2,}|[\b\s]['-]\s|\s['-][\b\s]|_/gm, " ")	//repeats the replace method to catch any unacceptable characters that weren't caught in the first run of the method
		.replace(/^['-\s]|['-\s]$/g, "")		//removes white spaces, hyphens and apostrophes at the beginning or end of the string
		.toLowerCase()							//converts string to lower case
		.split(" ");

	//Checks if the input text is valid
	valid = /[a-zA-Z\d]/.test(textAreaString) ? true : false;
	
	//Set total world count
	wordCount = valid ? wordList.length : 0;

	//Count each unique word and store in an object
	var wordCountListObj = {};
	wordList.forEach( word => {
		if (wordCountListObj[word] === undefined) { wordCountListObj[word] = 1 }
		else { wordCountListObj[word]++ }
	});

	//Convert the word count object into an array
	wordCountListArr = [];
	for(let word in wordCountListObj){ wordCountListArr.push([word, wordCountListObj[word]]) }

	//Sort the array from highest to lowest count
	wordCountListArr.sort( (wordA, wordB) => wordB[1] - wordA[1] );

	createAndShowSummary();
}


function createAndShowSummary(){

	//Prepare the 'Summary' div to display the results
	if(summary !== undefined) summary.remove();

	summary = createDiv();;
	summary.id = 'summary';

	var summaryHeader = document.createElement('h1');
	summaryHeader.appendChild(document.createTextNode('Summary'));
	summary.appendChild(summaryHeader);
	
	//Add the total word count to the 'Summary' div by appending a text node
	var summaryText = document.createTextNode("Total Word Count: " + wordCount);
	summary.appendChild(summaryText);

	//Add additional word count details only if there is valid input text
	if (valid){
		summary.appendChild(createBreak());
		summary.appendChild(createBreak());

		var tableCellOne, tableCellTwo, row, counter = 1;

		//Create headers for the unique word count table
		row = createDiv();
		row.className = 'row';
		tableCellOne = createDiv();
		tableCellOne.className = 'wordCell';
		tableCellTwo = createDiv();
		tableCellTwo.className = 'countCell';
		tableCellOne.appendChild(document.createTextNode('Word'));
		tableCellTwo.appendChild(document.createTextNode('Frequency'));
		tableCellOne.style.fontWeight = 'bold';
		tableCellTwo.style.fontWeight = 'bold';
		row.appendChild(tableCellOne);
		row.appendChild(tableCellTwo);
		summary.appendChild(row);

		wordCountListArr.forEach( word => {
			row = createDiv();
			row.className = 'row';

			//create an HTML element for each word and its respective count (in a table/cell format)
			tableCellOne = createDiv();
			tableCellOne.className = 'wordCell';

			tableCellTwo = createDiv();
			tableCellTwo.className = 'countCell';
			
			//Add the word and its respective count to the new cells
			tableCellOne.appendChild(document.createTextNode(word[0]));
			tableCellTwo.appendChild(document.createTextNode(word[1]));

			//Alternate the color of every other table row
			if(counter % 2 !== 0){
				tableCellOne.style.backgroundColor = '#d3d3d3';
				tableCellTwo.style.backgroundColor = '#d3d3d3';
			}

			counter++;

			//Add the completed cells to the Summary
			row.appendChild(tableCellOne);
			row.appendChild(tableCellTwo);
			summary.appendChild(row);
		});  

			summary.appendChild(createBreak());
	}

	//Add the 'Summary'div to the webpage
	document.getElementById('container').appendChild(summary);
}