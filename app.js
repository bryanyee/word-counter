var wordCount, wordCountListArr, summary;

function wordCounter(){
	//Store all the words in a list, excluding punctuation (include hypens and apostrophes)
	var wordList = document.getElementById('textString').value
		.replace(/[^\w\d' -]|['-]{2,}/gm, " ")	//removes unacceptable punctuation and repeating hyphens/dashes and apostrophes
		.replace(/\b['-]\s|\s['-]\b/gm, " ")	//removes prefix or suffix hyphens/dashes and apostrophes
		.replace(/\s{2,}/gm, " ")				//removes extra spaces, tabs and newlines
		.replace(/^['-\s]|['-\s]$/g, "")		//removes white spaces, hyphens and apostrophes at the beginning or end of the string
		.toLowerCase()							//converts string to lower case
		.split(" ");
	wordCount = ( (wordList.length === 1 && (wordList[0] === "" || wordList[0] === " ") ) || wordList.length === 0) ? 0 : wordList.length;

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

	var createBreak = () => document.createElement('br');
	summary.appendChild(createBreak());
	summary.appendChild(createBreak());

	//Add counts for each unique word to the 'Summary' div
	wordCountListArr.forEach( word => {
		summaryText = document.createTextNode(word[0] + ":  " + word[1]);
		summary.appendChild(summaryText);
		summary.appendChild(createBreak());
	});

	//Add the 'Summary'div to the webpage
	document.getElementById('container').appendChild(summary);
}