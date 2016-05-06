

function wordCounter(){
	var wordList = document.getElementById('textString').value.split(" ");
	var wordCount = wordList.length;

	alert("Word Count: " + wordCount)
}