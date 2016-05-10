var wordCount, wordCountList, summary;

function wordCounter(){
	//Store all the words in a list, excluding punctuation (include hypens and apostrophes)
	var wordList = document.getElementById('textString').value
		.replace(/[^\w\d' -]|-{2,}/gm, " ")	//removes unacceptable punctuation and multiple hyphens/dashes
		.replace(/\b-\s|\s-\b/gm, " ")		//removes prefix/suffix hyphens/dashes
		.replace(/\s{2,}/gm, " ")			//removes extra spaces, tabs and newlines
		.replace(/^\s|\s$|^-|-$/g, "")		//removes white spaces and hyphens at the beginning or end of the string
		.toLowerCase()						//converts string to lower case
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
	for(let word in wordCountList){
		summaryText = document.createTextNode(word + ":  " + wordCountList[word]);
		summary.appendChild(summaryText);
		summary.appendChild(createBreak());
	}

	//Add the 'Summary'div to the webpage
	document.getElementById('container').appendChild(summary);
}