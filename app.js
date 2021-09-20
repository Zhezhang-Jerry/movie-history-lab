// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const History = document.getElementById("movieHist");

// set the <table> in MovieList section and initiate the frist row of the table which is Title and Wathced
const table = document.createElement("table");
History.appendChild(table);
const firstTr = document.createElement("tr");
table.appendChild(firstTr);
rowHtml = `
<td>Title</td>    
<td>Watched</td>
`
firstTr.insertAdjacentHTML('afterbegin', rowHtml)


// get the local storage and show them under Movie History section
window.onload = function(){
    myArray = JSON.parse(window.localStorage.getItem("user1"))
    myObject = JSON.parse(window.localStorage.getItem('user2'));
    if (myArray != null) {
        for (let movieName of myArray) {
            let li = document.createElement("li");
            li.setAttribute("id", movieName)
            let textToInsert = document.createTextNode(movieName);
            li.appendChild(textToInsert);
            myMovieList.appendChild(li);
            console.log(myArray)
        }
    }else {
        myArray = [];
    }

    if (myObject !== null){
        for (key in myObject){
            const tr = document.createElement("tr");
            tr.setAttribute("id", "hist" + key);
            table.appendChild(tr);
    
            rowHtml = `
            <td>${key}</td>    
            <td>${myObject[key]}</td>
            `
            tr.insertAdjacentHTML('afterbegin', rowHtml);
            console.log(myObject);
        }
    }else{
        myObject = {};
    }
    // if (window.localStorage != null) {
    //     for (let movieName of storageMoviearray) {
    //     let li = document.createElement("li");
    //     li.setAttribute("id", movieName)
    //     let textToInsert = document.createTextNode(movieName);
    //     li.appendChild(textToInsert);
    //     myMovieList.appendChild(li);
    //     console.log(storageMoviearray, storageMovieobject)
    // }}
}

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
    if (!(myArray.includes(userTypedText))) { 
        myArray.push(userTypedText)
        // Step 2: Create an empty <li></li>
        const li = document.createElement("li"); // <li></li>
        li.setAttribute("id", userTypedText)
        
        // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
        const textToInsert = document.createTextNode(userTypedText);
        
        // Step 4: Insert text into li
        // <li>Harry Potter </li>
        li.appendChild(textToInsert);
        
        // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
        myMovieList.appendChild(li);
    }
    
    // Step 6: Call the clearInput function to clear the input field
    clearInput()
    movieHistory(userTypedText);

    window.localStorage.setItem('user1', JSON.stringify(myArray));

    
    // window.localStorage.setItem("movieArray", JSON.stringify(myArray));
    // window.localStorage.setItem("movieObject", JSON.stringify(myObject));
}

// create a filter event listener to filt the input letter
const filter = document.getElementById("filter")
filter.addEventListener("keyup", filterNames);

function filterNames() {
    let filterValue = document.getElementById("filter").value.toUpperCase();
    for (let movieName of myArray) {
        if (!(movieName.toUpperCase().includes(filterValue.toUpperCase()))) {
            document.getElementById(movieName).style.display = "none"
        }
        else {
            document.getElementById(movieName).style.display = ""
        }
    }
}

// when user input a moive name, update the object accordingly, 
// show under Movie History section, and save to local storage 
function movieHistory(userTypedText) {
    if (!(userTypedText in myObject)) {
        myObject[userTypedText] = 1;
    }else {
        myObject[userTypedText] ++;
        document.getElementById("hist" + userTypedText).remove();
    } 
    const tr = document.createElement("tr");
    tr.setAttribute("id", "hist" + userTypedText);
    table.appendChild(tr);
    
    rowHtml = `
    <td>${userTypedText}</td>    
    <td>${myObject[userTypedText]}</td>
    `
    tr.insertAdjacentHTML('afterbegin', rowHtml);
    console.log(myObject);
    
    window.localStorage.setItem('user2', JSON.stringify(myObject));
}


// function movieHistory(userTypedText) {
//     if (!(userTypedText in myObject)) {
//         myObject[userTypedText] = 1;
//     }
//     else {
//         myObject[userTypedText] ++;
//         document.getElementById("hist" + userTypedText).remove()
//     }
//     const li = document.createElement("li");
//     li.setAttribute("id", "hist" + userTypedText);
//     let textNote = document.createTextNode(`${userTypedText}                   ${myObject[userTypedText]}`)
//     li.appendChild(textNote)
//     History.appendChild(li);
// }

