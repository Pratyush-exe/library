let fillUp = document.getElementById("form");
let pageDisplay = document.getElementById("page-display");
let addButton = document.getElementById("Add");
let resetButton = document.getElementById("return");
let table = document.getElementById("table");
let submit = document.getElementById("submit");
fillUp.style.display  = "none";

let myLibrary = JSON.parse(localStorage.getItem('library'));

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

submit.addEventListener('click', function () {
    let READ;
    if(document.getElementById("yes").checked){
        READ = "Yes"
    }
    else {READ = "No"}
    myLibrary.push({
        name: document.getElementById("title").value,
        author: document.getElementById("author").value,
        pages: document.getElementById("pages").value.toString(),
        read: READ
    });   
    pageDisplay.style.display = "flex";
    fillUp.style.display = "none";
    addBookToLibrary();
})

addButton.addEventListener('click', function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = 0;
    pageDisplay.style.display = "none";
    fillUp.style.display = "flex";
})

resetButton.addEventListener('click', function () {
    pageDisplay.style.display = "flex";
    fillUp.style.display = "none";
    addBookToLibrary();
})

function addBookToLibrary() {
    for(let i=document.getElementById('table').rows.length-1; i>0; i--){
        document.getElementById('table').deleteRow(i);
    }
    for(let i=0; i<myLibrary.length; i++){
        const bbook = new Book(myLibrary[i].name, myLibrary[i].author, myLibrary[i].pages, myLibrary[i].read)
        let row = table.insertRow(-1);
        row.insertCell(0).textContent = bbook.name;
        row.insertCell(1).textContent = bbook.author;
        row.insertCell(2).textContent = bbook.pages;
        row.insertCell(3).textContent = bbook.read;
        row.insertCell(4).textContent = "x";
        row.cells[0].style = "border-bottom-left-radius: 30px; border-top-left-radius: 30px; padding: 10px;";
        row.cells[4].style = "width: 40px;"+
        "height: 40px;"+
        "font-size: 25px;"+
        "font-family: sans-serif;"+
        "border: none;"+
        "color:white;"+
        "cursor: pointer;"+
        "border-bottom-right-radius: 30px;"+
        "border-top-right-radius: 30px;"
        row.cells[4].onmouseover  = function() {
            row.cells[4].style = "width: 40px;"+
            "height: 40px;"+
            "font-size: 25px;"+
            "font-family: sans-serif;"+
            "border: none;"+
            "color:red;"+
            "cursor: pointer;"+
            "border-bottom-right-radius: 30px;"+
            "border-top-right-radius: 30px;";
        }
        row.cells[4].onmouseout  = function() {
            row.cells[4].style = "width: 40px;"+
            "height: 40px;"+
            "font-size: 25px;"+
            "font-family: sans-serif;"+
            "border: none;"+
            "color:white;"+
            "cursor: pointer;"+
            "border-bottom-right-radius: 30px;"+
            "border-top-right-radius: 30px;";
        }
        row.cells[4].addEventListener('click', function() {
            myLibrary.splice(i, 1);
            addBookToLibrary();
        })
    }
    window.localStorage.setItem("library", JSON.stringify(myLibrary));
}

addBookToLibrary();
