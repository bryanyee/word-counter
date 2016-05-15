var wordCount, wordCountListArr, summary, valid;
var createBreak = () => document.createElement('br');
var createDiv = () => document.createElement('div');	

function wordCounter(){
	//Retrieve the text from the webpage textarea
	var textAreaString = document.getElementById('textString').value;

	//Store all the words in a list, excluding punctuation (include hypens and apostrophes)
	var wordList = textAreaString
		.replace(/[\u2018\u2019]/g, "'")		//replaces curly quotes with straight quotes
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

	summary = createDiv();
	summary.id = 'summary';
	summary.innerHTML = "<h1>Summary</h1>Total Word Count: " + wordCount;

	//Add additional word count details only if there is valid input text
	if (valid){
		summary.appendChild(createBreak());
		summary.appendChild(createBreak());

		var row, counter = 1;

		//Create headers for the unique word count table, and add to the Summary div
		row = createDiv();
		row.className = 'row';
		row.innerHTML = "<div class='wordCell headerCell whiteCell'>Word</div><div class='countCell headerCell whiteCell'>Frequency</div>";
		summary.appendChild(row);

		//Add information for each word to the count table
		wordCountListArr.forEach( word => {
			row = createDiv();
			row.className = 'row';

			//create an HTML element for each word and its respective count (in a table/cell format), with alternating row background color
			if(counter % 2 !== 0){ row.innerHTML = "<div class='wordCell grayCell'>" + word[0] + "</div><div class='countCell grayCell'>" + word[1] + "</div>" }
			else { row.innerHTML = "<div class='wordCell whiteCell'>" + word[0] + "</div><div class='countCell whiteCell'>" + word[1] + "</div>" }

			counter++;

			//Add the completed row to the Summary
			summary.appendChild(row);
		});  

		summary.appendChild(createBreak());
	}

	//Add the 'Summary'div to the webpage
	document.getElementById('container').appendChild(summary);


	//Set the width of the word cells to the max width
	var allWordCells = document.getElementsByClassName('wordCell');
	var currentLength = allWordCells[0].clientWidth;		//clientWidth property (read-only) is the width property in pixels
	var maxLength = currentLength;

	Array.prototype.forEach.call(allWordCells, wordCell => { if(wordCell.clientWidth > maxLength) maxLength = wordCell.clientWidth });
	if(maxLength > currentLength) Array.prototype.forEach.call(allWordCells, wordCell => { wordCell.style.width = maxLength.toString() + "px" });
}