const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

function submitInput(e) {
	const newItem = itemInput;
	e.preventDefault();
	if (newItem.value === "") {
		console.log("Please enter an item");
		return;
	}
	const li = document.createElement("li");
	itemList.appendChild(li);
	li.appendChild(document.createTextNode(newItem));
	itemButton("remove-item btn-link text-red");
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

//Event listeners
itemForm.addEventListener("submit", submitInput);
