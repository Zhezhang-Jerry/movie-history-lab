// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const History = document.getElementById("movieHist");
const myObject = {};

// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    const userTypedText = inp.value;
    if (userTypedText == ""){
        alert("Please enter the movie name!")
        return; 
    }

    // Step 2: Create an empty <li></li>
    const li = document.createElement("li"); // <li></li>

    // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
    const textToInsert = document.createTextNode(userTypedText);

    // Step 4: Insert text into li
    // <li>Harry Potter </li>
    li.appendChild(textToInsert);

    // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
    myMovieList.appendChild(li);

    // Step 6: Call the clearInput function to clear the input field
    clearInput();
    movieHistory(userTypedText);
}

function movieHistory(userTypedText) {
    if (!(userTypedText in myObject)) {
        myObject[userTypedText] = 1;
        const li = document.createElement("li");
        let textNote = document.createTextNode(`${userTypedText} ${myObject[userTypedText]}`)
        li.appendChild(textNote)
        History.appendChild(li);
    }
    else {
        myObject[userTypedText] ++;

    }
    console.log(myObject)
}