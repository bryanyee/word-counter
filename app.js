var wordCount, wordCountListArr, summary, valid, selectContainer, containsNonAlphaNumCharacters;
var createBreak = () => document.createElement('br');
var createDiv = () => document.createElement('div');	
var smallWords = ['the','and','of','to','a','in','for','is','on','that','by','this','with','i','you','it','not','or','be','are','at','as','from','an','was','we','can','us','if','has','but','no'];

function wordCounter(specificOption){
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

	//filter the word list to exclude common small words
	if(!document.getElementById('excludeCheckBox').checked && specificOption === false) wordList = wordList.filter( word => smallWords.indexOf(word) < 0 );

	//Checks if the input text is valid
	valid = /[a-zA-Z\d]/m.test(textAreaString) ? true : false;

	//if counting specific words, filter the wordList for specific words, and change local variables as necessary
	containsNonAlphaNumCharacters = false;
	var specificWords;

	if(specificOption === true){
		var specificTextAreaString = document.getElementById('selectString').value;

		containsNonAlphaNumCharacters = /[^a-zA-Z\d\s]/gm.test(specificTextAreaString);

		//store array of user-specified words
		specificWords = specificTextAreaString
			.replace(/\s{2,}|\s|[^a-zA-Z\d\s]/gm, " ")	
			.replace(/\s{2,}|\s|[^a-zA-Z\d\s]/gm, " ")
			.replace(/^\s|\s$/g, "")
			.toLowerCase()
			.split(" ");

		wordList = wordList.filter( word => specificWords.indexOf(word) >= 0 );

		if (specificWords[0] === '') valid = false;
	}
	
	//Set total world count
	wordCount = valid ? wordList.length : 0;

	//Count each unique word and store in an object
	var wordCountListObj = {};
	wordList.forEach( word => {
		if (wordCountListObj[word] === undefined) { wordCountListObj[word] = 1 }
		else { wordCountListObj[word]++ }
	});

	//If counting specific words and a word is not in the text, set its count to zero
	if (specificOption === true) {
		specificWords.forEach( word => { if (wordCountListObj[word] === undefined) wordCountListObj[word] = 0 } );
	}

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


	//If user-specified words include a non-alphanumeric character, show a message
	if(containsNonAlphaNumCharacters) summary.innerHTML += "<br><br>*Non-alphanumeric characters have<br>been removed from the query.";


	//Add additional word count details only if there is valid input text
	//If counting user-speicified words, also check if there are any matches
	if (valid && wordCountListArr.length !== 0){
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

function selectWords(){
	//If the 'Select Words' option area is already showing on th page, hide the area if the user clicks the button again
	if (selectContainer !== undefined && selectContainer.style.display === "inline"){ selectContainer.style.display = "none" }

	//Otherwise, create or re-show the 'Select Words' option area
	else {
		if (selectContainer === undefined){ 
			selectContainer = createDiv();
			selectContainer.id = "selectContainer";
			selectContainer.style.display = "inline";

			selectContainer.innerHTML = "<br>Enter each word, separated by a space or new line:<br><textarea rows='10' cols='45' id='selectString'></textarea><br><input type='button' value='Count Specific Words!' onclick='wordCounter(true)'><br>";
			document.getElementById('container').appendChild(selectContainer);
		}
		else { selectContainer.style.display = "inline" }
	}
}