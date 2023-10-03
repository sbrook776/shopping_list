const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
	const itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDom(item));
	checkUI();
}

function onAddItemSubmit(e) {
	e.preventDefault();
	//converts first letter to uppercase.
	let newItem = itemInput.value.trim();
	if (newItem === "") {
		alert("Please enter an item");
		return;
	} else {
		newItem = itemInput.value[0].toUpperCase() + itemInput.value.slice("1");
	}
	// check for edit mode

	if (isEditMode) {
		const itemToEdit = itemList.querySelector(".edit-mode");
		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.classList.remove("edit-mode");
		itemToEdit.remove();
		isEditMode = false;
	} else {
		// check item exists if not in edit mode so that we can keep existing item
		if (checkIfItemExists(newItem)) {
			alert("That item already exists!");
			return;
		}
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

function addItemtoStorage(item) {
	//items already in local storage
	const itemsFromStorage = getItemsFromStorage();

	// add new item
	itemsFromStorage.push(item);

	// convert to JSON string and set to local storage
	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
	//items already in local storage
	let itemsFromStorage;
	//if no items in local storage set array to empty array
	if (localStorage.getItem("items") === null) {
		itemsFromStorage = [];
	} else {
		//converting string stored in localstorage to array
		itemsFromStorage = JSON.parse(localStorage.getItem("items"));
	}
	return itemsFromStorage;
}

function onClickItem(e) {
	if (e.target.parentElement.classList.contains("remove-item")) {
		removeItem(e.target.parentElement.parentElement);
	} else if (e.target.closest("li")) {
		setItemToEdit(e.target);
	}
}

function checkIfItemExists(item) {
	const itemsFromStorage = getItemsFromStorage();
	//since includes returns true or false we can just return its value.
	return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
	isEditMode = true;

	itemList
		.querySelectorAll("li")
		.forEach((i) => i.classList.remove("edit-mode"));
	item.classList.add("edit-mode");
	formBtn.innerHTML = '<i class= "fa-solid fa-pen"></i> Update Item';
	formBtn.style.backgroundColor = "#228B22";
	itemInput.value = item.textContent;
}

function removeItem(item) {
	if (confirm("Are you sure?")) {
		// remove item from DOM
		item.remove();

		// remove item from storage
		removeItemFromStorage(item.textContent);
		checkUI();
	}
}

function removeItemFromStorage(item) {
	let itemsFromStorage = getItemsFromStorage();
	// Returns array of items not including the removed
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
	// re-set local storage
	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
	if (confirm("Are you sure you want to clear all items?")) {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}
		// clear from local storage for clear all button
		localStorage.removeItem("items");

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
	itemInput.value = "";
	const items = itemList.querySelectorAll("li");

	if (items.length === 0) {
		clearBtn.style.display = "none";
		itemFilter.style.display = "none";
	} else {
		clearBtn.style.display = "block";
		itemFilter.style.display = "block";
	}
	formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
	formBtn.style.backgroundColor = "#333";
	isEditMode = false;
}

// Initialize app
function init() {
	itemForm.addEventListener("submit", onAddItemSubmit);
	itemList.addEventListener("click", onClickItem);
	clearBtn.addEventListener("click", clearItems);
	itemFilter.addEventListener("input", filterItems);
	document.addEventListener("DOMContentLoaded", displayItems);

	checkUI();
}

init();
//Event listeners
