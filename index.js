import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://camping-wishlist-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const campingListInDB = ref(database, "campsites")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const campingListEl = document.getElementById("camp-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(campingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(campingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearCampingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            appendItemToCampingListEl(currentItem)
        }    
    } else {
        campingListEl.innerHTML = "No items here... yet"
    }
})

function clearCampingListEl() {
    campingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToCampingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `campsites/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    campingListEl.append(newEl)
}