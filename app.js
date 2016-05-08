var wordCountString;

function wordCounter(){
	//Count all words
	var wordList = document.getElementById('textString').value.split(" ");
	var wordCount = wordList.length;

	//Count each unique word
	var wordCountList = {};
	wordList.forEach( word => {
		if (wordCountList[word] === undefined) { wordCountList[word] = 1 }
		else { wordCountList[word]++ }
	});

	//Create a summary of the counting information
	wordCountString = "Total Word Count: " + wordCount + "\n\n";			//WORD\t\tCOUNT\n";
	for(let word in wordCountList){
		wordCountString += word + ":  " + wordCountList[word] + "\n";
	}

	showResults();
}

function showResults(){
	//Show the hidden 'Summary' div
	var summary = document.getElementById('summary');
	summary.style.display = "block";

	//Add the summary information to the 'Summary' div
	var summaryText = document.createTextNode(wordCountString);
	summary.appendChild(summaryText);
}