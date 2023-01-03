// NOTES:
// to connect to mysql I had to navigate to export PATH=${PATH}:/usr/local/mysql/bin, then "mysql -u root -p"
// export PATH=${PATH}:/Users/ianbrain/Downloads/HTML/test_project/package.json

let projects = []; // when I add cards I will need to change the cardId variable

const projectList = document.getElementsByClassName("project-list-container")[0];
let btnAdd = document.getElementById("submitButton");
let nameInput = document.getElementById("projectName");
let textInput = document.getElementById("projectText");
let projectDisplayList = document.getElementById("projectList");
let displayCards = document.getElementById("display-card-button");
let cardGrid = document.getElementsByClassName("card-grid")[0]; // class name needs [0] for some reason
let gridButton = document.getElementById("display-card-grid");
let projectForm = document.getElementById("projectForm");
let displayCardArea = document.getElementsByClassName("display-cards")[0];
let editBool = false;
cardId = 0;

function buttonFunction() {
    projectList.innerHTML=""; // so that the elements aren't readded to the container
    projects.forEach((project, index) => {
        let itemHR = document.createElement("HR"); // horizontal line
        let itemP = document.createElement("p"); // creates a <p> element
        let itemPText = document.createTextNode(`${project.name}:${project.text}`); // node holds the details (div, p) of an element
            // we need `${} as it is a variable that we are displaying
        itemP.appendChild(itemPText);
        projectList.appendChild(itemP); // adds the <p> element to the projectList html element
        projectList.appendChild(itemHR);
    });
}

// I think I can't add lines as this is a list and it just can't take line elements. I should put it in a regualr container instead (for grid)
// perhaps I can add another element that is just a line to the list....
function addProjects() {
    let template = projects.map(project => `<li>${project.name}: ${project.text}</li>`).join('\n');
    projectDisplayList.innerHTML = template; // ul is an unordered listso we are just setting ul html to the template to display it
}

btnAdd.addEventListener('click', () => {
    if(nameInput.value.length != 0 || textInput.value.length != 0) 
    {
        if(!editBool) {
            projects.push({id: cardId, name: nameInput.value, text: textInput.value});
            nameInput.value="";
            textInput.value="";
            cardId++;
        }
    }
    // if(editBool) {
    //     nameEdit = nameInput.value;
    //     textEdit = textInput.value;
    //     nameInput.value="";
    //     textInput.value="";
    //     editBool = false;
    // }
        //addProjects();

        // projectList.innerHTML=""; // so that the elements aren't readded to the container
        // projects.forEach((project, index) => {
        //     let itemHR = document.createElement("HR"); // horizontal line
        //     let itemP = document.createElement("div"); // creates a <div> element. <p> makes them have a space as its a paragraph
        //     let itemP2 = document.createElement("div"); // so that the text is on a seperate line
        //     let div = document.createElement("div");
        //     let itemPText = document.createTextNode(`Project Name: ${project.name}`); // node holds the details (div, p) of an element
        //         // we need `${} as it is a variable that we are displaying
        //         // let itemPText = document.createTextNode(`${project.name}: ${project.text}`);
        //     let itemPText2 = document.createTextNode(`Project Description: ${project.text}`);
        //     itemP.appendChild(itemPText);
        //     itemP2.appendChild(itemPText2);
        //     div.appendChild(itemP);
        //     div.appendChild(itemP2);
        //     //projectList.appendChild(itemP); // adds the <p> element to the projectList html element
        //     //projectList.appendChild(itemP2);
        //     div.className='objectDiv'; // this allows to call via the objectDiv class in css to set how each element looks
        //     projectList.appendChild(div);
        //     //projectList.appendChild(itemHR);
        // });
    
});

var pos = 0;
//var obj = document.querySelector('#displaying-card');
var cardName = document.querySelector('#card-name');
var cardText = document.querySelector('#card-text');
// it would have been better to use .appendChild rather than create the new <P> elements explicitely
displayCards.addEventListener('click', () => {
    // I need a container for each card with a button to go to the next object
    // document.querySelector('#displaying-card').textContent = projects.join(', ');
    cardName.textContent = "Card Name: " + projects[pos].name;
    cardText.textContent = "Card Text: " + projects[pos].text;
    pos++;
    if(pos >= projects.length) {
        pos = 0;
    }
})

function showGrid() {
    cardGrid.innerHTML=""; // so that the elements aren't readded to the container
    projects.forEach((project) => {
        // let card = document.createElement("div");
        // var cardText = "Name: " + project.name + "Text: " + project.text;
        // card.textContent = cardText;
        // card.className="grid-card-shown";
        // cardGrid.appendChild(card);

        let card = document.createElement("div");
        card.innerHTML += `<p class="name-div">Name: ${project.name}</p>`;

        //text
        var displayText = document.createElement("p");
        displayText.classList.add("text-div", "hide");
        displayText.innerText="Text: " + project.text;

        // show and hide the text
        // var link = document.createElement("a"); // <a> along with href and # creates a link to something else
        // link.setAttribute("href", "#"); 
        // link.setAttribute("class", "show-hide-button");
        // link.innerHTML = "Show";
        // link.addEventListener("click", () => {
        //     displayText.classList.toggle("hide"); // this may be from the list
        // });
        // make sure to undo the commented out card.appendChild(Link)

        // test to try and have the card being clicked show the ans rather than a link
        card.setAttribute("href", "#");
        card.addEventListener("click", () => {
            displayText.classList.toggle("hide");
        });

        //card.appendChild(link);
        card.appendChild(displayText);

        card.className="grid-card-shown";
        cardGrid.appendChild(card);

        // if I want to go back to before just delete all of this
        // to do
            //change it so name can be edited as well
            // hide the input form after submit is pressed 
        // edit cards
        // https://codingartistweb.com/2022/08/flashcard-app-with-javascript/
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        var editButton = document.createElement("button");
        editButton.setAttribute("class", "edit");
        editButton.addEventListener("click", () => {
            //console.log(project.id);
            tempId = project.id; // project.id is changing back to the original in btnAdd event listener. Thus it is stored here

            projectForm.classList.remove("hide");
            editBool = true;
            //testFunction();
            btnAdd.addEventListener('click', () => { // this makes it so the display text is automatically updated. I now need it to change the array itself
                if(editBool) { // this has to be !edit bool. I think as the code above is making edit bool false
                                // this is now changing all the elements that were edited in that past, rather than just only changing the one
                    nameEdit = nameInput.value;
                    textEdit = textInput.value;
                    nameInput.value="";
                    textInput.value="";
                    editBool = false;
                    //console.log(project.id)

                    //displayText.innerText = textEdit; // this isn't doing it. it won't do it the first time pressed. Since edit bool does not clear the input field it sets it the second time pressed
                    projects[tempId].name = nameEdit;
                    projects[tempId].text = textEdit; // this works it changing the text
                    // card.appendChild(displayText); we can just show grid which uses the updated project array
                    projectForm.classList.add("hide"); // this is hiding the form whenever submit is pressed. change it so that a bool makes it only hide when say editbool=true
                    showGrid();
                }
            })
        })

        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "delete");
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        card.appendChild(buttonContainer);
        // added edit bool above after submit is pressed
        // displayText.innerText = textTest; // having display text here makes it so when grid is reloaded we see the change
        // card.appendChild(displayText); //PROBLEM: this is not affecting the cards in quiz as they have the actual value. PROBLEM: does not allow other cards to be added

        deleteButton.addEventListener("click", () => {
            delete projects[project.id];
            showGrid();
        })
    })
}


// add a line break somehow - NO, I will just use padding
// I need to give each of these elements an ID, make css for them to look like cards, and put them in a grid
// then add edit, delete, etc.
gridButton.addEventListener('click', () => {
    showGrid();

    // cardGrid.innerHTML=""; // so that the elements aren't readded to the container

    // projects.forEach((project) => {
    //     // let card = document.createElement("div");
    //     // var cardText = "Name: " + project.name + "Text: " + project.text;
    //     // card.textContent = cardText;
    //     // card.className="grid-card-shown";
    //     // cardGrid.appendChild(card);

    //     let card = document.createElement("div");
    //     card.innerHTML += `<p class="name-div">Name: ${project.name}</p>`;

    //     //text
    //     var displayText = document.createElement("p");
    //     displayText.classList.add("text-div", "hide");
    //     displayText.innerText="Text: " + project.text;

    //     // show and hide the text
    //     var link = document.createElement("a"); // <a> along with href and # creates a link to something else
    //     link.setAttribute("href", "#"); 
    //     link.setAttribute("class", "show-hide-button");
    //     link.innerHTML = "Show";
    //     link.addEventListener("click", () => {
    //         displayText.classList.toggle("hide"); // this may be from the list
    //     });

    //     card.appendChild(link);
    //     card.appendChild(displayText);

    //     card.className="grid-card-shown";
    //     cardGrid.appendChild(card);

    //     // edit cards
    //     // https://codingartistweb.com/2022/08/flashcard-app-with-javascript/


    // })
})

let homeNavigation = document.getElementById("homeNavigation");
let quizNavigation = document.getElementById("quizNavigation");
let gridNavigation = document.getElementById("gridNavigation");

homeNavigation.addEventListener("click", () => {
    projectForm.classList.remove("hide");
    cardGrid.classList.add("hide");
    displayCardArea.classList.add("hide");
    gridButton.classList.add("hide");
    // projectForm.classList.toggle("hide"); 
})
quizNavigation.addEventListener("click", () => {
    projectForm.classList.add("hide");
    cardGrid.classList.add("hide");
    displayCardArea.classList.remove("hide");
    gridButton.classList.add("hide");
})
gridNavigation.addEventListener("click", () => {
    projectForm.classList.add("hide");
    cardGrid.classList.remove("hide");
    displayCardArea.classList.add("hide");
    gridButton.classList.remove("hide");
    showGrid();
})

