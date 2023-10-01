const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");

function onAddItemSubmit(e) {
	e.preventDefault();
	//converts first letter to uppercase.
	const newItem = itemInput.value[0].toUpperCase() + itemInput.value.slice("1");
	if (newItem === "") {
		alert("Please enter an item");
		return;
	}
	// create item DOM element
	addItemToDom(newItem);
	// add item to local storage
	addItemtoStorage(newItem);
	checkUI();
	//clears input
	itemInput.value = "";
}

function addItemToDom(item) {
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(item));
	const button = itemButton("remove-item btn-link text-red");
	// Add li to the DOM
	itemList.appendChild(li);
	li.appendChild(button);
}

function addItemtoStorage(item) {
	//items already in local storage
	let itemsFromStorage;
	//if no items in local storage set array to empty array
	if (localStorage.getItem("items") === null) {
		itemsFromStorage = [];
	} else {
		//converting string stored in localstorage to array
		itemsFromStorage = JSON.parse(localStorage.getItem("items"));
	}
	// add new item
	itemsFromStorage.push(item);

	// convert to JSON string and set to local storage
	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function itemButton(classes) {
	const button = document.createElement("button");
	button.className = classes;
	const icon = createIcon("fa-solid fa-xmark");
	button.appendChild(icon);
	return button;
}

function createIcon(classes) {
	const icon = document.createElement("i");
	icon.className = classes;
	return icon;
}

function removeItem(e) {
	if (e.target.parentElement.classList.contains("remove-item")) {
		if (confirm("Are you sure you want to delete this item?")) {
			e.target.parentElement.parentElement.remove();
			checkUI();
		}
	}
}
function clearItems() {
	if (confirm("Are you sure you want to clear all items?")) {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}
		checkUI();
	}
}

function filterItems(e) {
	const items = itemList.querySelectorAll("li");
	const text = e.target.value.toLowerCase();
	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();
		if (itemName.indexOf(text) != -1) {
			item.style.display = "flex";
		} else {
			item.style.display = "none";
		}
	});
}

function checkUI() {
	const items = itemList.querySelectorAll("li");

	if (items.length === 0) {
		clearBtn.style.display = "none";
		itemFilter.style.display = "none";
	} else {
		clearBtn.style.display = "block";
		itemFilter.style.display = "block";
	}
}

//Event listeners
itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUI();
