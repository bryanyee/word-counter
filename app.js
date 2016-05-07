

function wordCounter(){
	var wordList = document.getElementById('textString').value.split(" ");
	var wordCount = wordList.length;

	var wordCountList = {};
	wordList.forEach( word => {
		if (wordCountList[word] === undefined) { wordCountList[word] = 1 }
		else { wordCountList[word]++ }
	});

	var wordCountString = "";			//WORD\t\tCOUNT\n";
	for(let word in wordCountList){
		wordCountString += word + ":  " + wordCountList[word] + "\n";
	}

	//alert("Total Word Count: " + wordCount + "\n\n" + wordCountString);

	showResults();
}


function showResults(){
	document.getElementById('summary').setAttribute("display","block");
}