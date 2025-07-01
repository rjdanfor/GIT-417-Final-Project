"use strict";

// dark/light mode button click
let lightmode = true;
let modeButton = document.getElementById("modeImg");
let backgroundColor = document.querySelector("html");
modeButton.addEventListener("click", modeClick);

function modeClick(){
    if(lightmode){
        modeButton.src = "images/icons8-sun.svg";
        backgroundColor.style.backgroundColor = "var(--light_purple)";
        lightmode = false;
    }else{
        modeButton.src = "images/moon.png";
        backgroundColor.style.backgroundColor = "var(--light_green)";
        lightmode = true;
    }
}



// generate random number
function randomNum(min, max){
   return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// switcher
let modelButton = document.getElementById("btn1");
let fugiButton = document.getElementById("btn2");
let friendsButton = document.getElementById("btn3");

//displays
let modelDisplay = document.getElementById("product1");
let fugiDisplay = document.getElementById("product2");
let friendsDisplay = document.getElementById("product3");

// button event listeners
modelButton.addEventListener("click", displaySwitcher);
fugiButton.addEventListener("click", displaySwitcher);
friendsButton.addEventListener("click", displaySwitcher);

function displaySwitcher(e) {
    // hide all
    modelDisplay.style.display = "none";
    fugiDisplay.style.display = "none";
    friendsDisplay.style.display = "none";

    // show display (without using a thousand else-if)
    switch (e.target.id) {
        case "btn1":
            modelDisplay.style.display = "grid";
            break;
        case "btn2":
            fugiDisplay.style.display = "grid";
            break;
        case "btn3":
            friendsDisplay.style.display = "grid";
            break;
    }
}

// random number game
document.getElementById("guessGame").addEventListener("click", randomNumGame);

function randomNumGame(e){
    //prevent form
    e.preventDefault();

    //clear message
    let gameMsg = document.getElementById("gameMsg");
    gameMsg.textContent = "";

    //get and display values
    let userGuess = parseInt(document.querySelector("#numGuess").value);
    let compareNum = randomNum(1, 10);

    let userNumDisplay = document.getElementById("userNum").querySelector("span");
    let compareNumDisplay = document.getElementById("randomNum").querySelector("span");
    
    userNumDisplay.textContent = userGuess;
    compareNumDisplay.textContent = compareNum;


    //message display on win con
    if(userGuess === compareNum){
        gameMsg.textContent = "Congrats! You win!";
    }else{
        gameMsg.textContent = "Dangit, you lose."
    }
}

//form validation
let fullNameInput = document.getElementById("formFullName");
let emailInput = document.getElementById("formEmail");
let phoneInput = document.getElementById("formPhone");
let emailRadio = document.getElementById("contactChoice1");
let phoneRadio = document.getElementById("contactChoice2");
let commentInput = document.getElementById("formMessage");
let errorElements = document.getElementsByClassName("error");

let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
let phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
let nameRegex = /^\w+\s(?:\w+\s)?\w+$/;

let formCompleteObj = {}

function checkForm(){
    // reset
    let validForm = true;

    // clear errors
    for (let error of errorElements){
        error.style.display = "none";
    }

    //check against regex and null
    if((!nameRegex.test(fullNameInput.value)) || fullNameInput.value == null){
        document.getElementById("nameError").style.display = "block";
        validForm = false;
    }

    // check if radio checked
    if(!emailRadio.checked && !phoneRadio.checked){
        document.getElementById("radioError").style.display = "block";
        validForm = false;
    }

    // throw errors for preferred contact
    if(emailRadio.checked && !emailRegex.test(emailInput.value)){
        document.getElementById("emailError").style.display = "block";
        validForm = false;
    }
    if(phoneRadio.checked && !phoneRegex.test(phoneInput.value)){
        document.getElementById("phoneError").style.display = "block";
        validForm = false;
    }

    // make sure theres any comment
    if(!/.+/.test(commentInput.value) || commentInput.value == null){
        document.getElementById("messageError").style.display = "block";
        validForm = false;
    }

    // if valid create obj
    if(validForm){
        formObject();
    }
}

function formObject(){
    // add to obj
    formCompleteObj.fullName = fullNameInput.value;
    if(emailRadio.checked){
        formCompleteObj.prefContact = "Email";
        formCompleteObj.contact = emailInput.value;
    }else{
        formCompleteObj.prefContact = "Phone";
        formCompleteObj.contact = phoneInput.value;
    }
    formCompleteObj.comment = commentInput.value;

    // display obj
    document.getElementById("thankYou").style.display = "block";
    document.getElementById("thankYou").innerHTML = `Thank you for the valid form! 
    <br> Full Name: ${formCompleteObj.fullName} 
    <br> Method of contact: ${formCompleteObj.prefContact}
    <br> Contact details: ${formCompleteObj.contact}
    <br> Comment: ${formCompleteObj.comment}`;
}


document.getElementById("formSubmit").addEventListener("click", function (e){ 
    checkForm();
    e.preventDefault();
})