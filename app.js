var wordCount, wordCountListArr, summary, valid;

function wordCounter(){
	//Retrieve the text from the webpage textarea
	var textAreaString = document.getElementById('textString').value;

	//Store all the words in a list, excluding punctuation (include hypens and apostrophes)
	var wordList = textAreaString
		.replace(/[^\w\d' -]|[ '-]{2,}|[\b\s]['-]\s|\s['-][\b\s]/gm, " ")	//removes unacceptable punctuation, whitespaces, and hyphens/dashes and apostrophes (repeating or prefix/suffix)
		.replace(/[^\w\d' -]|[ '-]{2,}|[\b\s]['-]\s|\s['-][\b\s]/gm, " ")	//repeats the replace method to catch any unacceptable characters that weren't caught in the first method call
		.replace(/^['-\s]|['-\s]$/g, "")		//removes white spaces, hyphens and apostrophes at the beginning or end of the string
		.toLowerCase()							//converts string to lower case
		.split(" ");

	//Checks if the input text is valid
	valid = /[\w\d]/.test(textAreaString) ? true : false;
	
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

	summary = document.createElement('div');
	summary.id = 'summary';

	var summaryHeader = document.createElement('h1');
	summaryHeader.appendChild(document.createTextNode('Summary'));
	summary.appendChild(summaryHeader);
	
	//Add the total word count to the 'Summary' div by appending a text node
	var summaryText = document.createTextNode("Total Word Count: " + wordCount);
	summary.appendChild(summaryText);

	//Add additional word count details only if there is valid input text
	if (valid){
		var createBreak = () => document.createElement('br');
		summary.appendChild(createBreak());
		summary.appendChild(createBreak());

		//Add counts for each unique word to the 'Summary' div
		wordCountListArr.forEach( word => {
			summaryText = document.createTextNode(word[0] + ":  " + word[1]);
			summary.appendChild(summaryText);
			summary.appendChild(createBreak());
		});
	}

	//Add the 'Summary'div to the webpage
	document.getElementById('container').appendChild(summary);
}