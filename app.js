var wordCount, wordCountList;

function wordCounter(){
	//Count all words, excluding punctuation (include hypens and apostrophes)
	var wordList = document.getElementById('textString').value
		.replace(/\s{2,}/gm, " ")		//removes extra spaces, tabs and newlines
		.replace(/[^\w\d' -]/gm, "")	//removes unacceptable punctuation
		.toLowerCase()					//converts string to lower case
		.split(" ");
	wordCount = wordList.length;

	//Count each unique word
	wordCountList = {};
	wordList.forEach( word => {
		if (wordCountList[word] === undefined) { wordCountList[word] = 1 }
		else { wordCountList[word]++ }
	});

	createAndShowSummary();
}


function createAndShowSummary(){
	//Prepare DOM elements
	var summary = document.getElementById('summary');
	var createBreak = () => document.createElement('br');
	
	//Add the total word count to the 'Summary' div by appending a text node
	var wordCountString = "Total Word Count: " + wordCount;
	var summaryText = document.createTextNode(wordCountString);
	summary.appendChild(summaryText);
	summary.appendChild(createBreak());
	summary.appendChild(createBreak());

	//Add counts for each unique word to the 'Summary' div
	for(let word in wordCountList){
		wordCountString = word + ":  " + wordCountList[word];
		summaryText = document.createTextNode(wordCountString);
		summary.appendChild(summaryText);
		summary.appendChild(createBreak());
	}

	//Show the hidden 'Summary' div by changing the diplay property
	summary.style.display = "block";
}