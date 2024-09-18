import {
    fetchCategories
} from "../Model/catagories.js"

import {
    deleteWork,
    fetchWorks
} from "../Model/works.js"

//// FILTERS //// 

// Function to initialize filters and gallery

const createCategoryElement = function (category) {
    const button = document.createElement("button");
    button.innerText = category.name
    button.setAttribute("data-id", category.id)
    return button
}

const initFilters = async function () {
    let categories = await fetchCategories()
    let categoriesElements = categories.map(createCategoryElement)
    const filter = document.querySelector(".filter")
    filter.appendChild(createCategoryElement({
        id: 0,
        name: "Tous"
    }))
    categoriesElements.forEach((category) => {
        filter.appendChild(category)
    })

    // Selecting the filter buttons and the filterable images

    const filterButtons = document.querySelectorAll(".filter button");
    filterButtons[0].classList.add("active")
    const gallery = document.querySelectorAll(".gallery figure");

    // Define the filterimages function
    const filterimages = (e) => {
        let active = document.querySelector(".active")
        if (active) active.classList.remove("active");
        e.target.classList.add("active");
        // Optional: to test the selected elements console.log(e.target);

        // iteratte over each filterable image
        displayWorks(
            document.works.filter(
                (work) => {
                    if (e.target.dataset.id == 0)
                        return true
                    return work.categoryId == Number(e.target.dataset.id)
                }
            )
        )
    };

    // Add click event listener to each filter button
    filterButtons.forEach(button => button.addEventListener("click", filterimages));

    // Optional: to test the selected elements console.log(filterButtons, gallery);
}
initFilters();



const galleryContainer = document.querySelector(".gallery");


function createWorkElement(work) {
    let figure = document.createElement("figure")
    let img = document.createElement("img")
    let figcaption = document.createElement("figcaption")
    img.src = work.imageUrl
    img.alt = work.title
    figure.appendChild(img)
    figure.appendChild(figcaption)
    figcaption.textContent = work.title;
    return figure
}

function displayWorks(works) {
    let worksElement = works.map(createWorkElement)
    galleryContainer.innerHTML = ""
    let i = 0
    worksElement.forEach((work) => {
        console.log(i++)
        galleryContainer.appendChild(work)
    })
}

async function initWorks() {
    document.works = await fetchWorks(); // Fetch works (images)
    if (!document.works) {
        console.error("Failed to fetch images");
        return;
    }
    displayWorks(document.works)
}

initWorks()

/////// show and hide elemnt depending on the user status  //////////

document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("loginId");
    const logoutLink = document.getElementById("logoutId");
    const editButton = document.getElementById("edit")
    const filter = document.querySelector(".filter")

    // Check login status by checking if token is present in localStorage
    const isLoggedIn = !!localStorage.getItem("token");

    // Toggle visibility of login/logout links based on login status
    if (isLoggedIn) {
        loginLink.classList.add("hidden");   // Hide login link
        logoutLink.classList.remove("hidden"); // Show logout link
        editButton.classList.remove("hidden") // show the edit button
        filter.classList.add("hidden")
    } else {
        loginLink.classList.remove("hidden");   // Show login link
        logoutLink.classList.add("hidden");   // Hide logout link
        editButton.classList.add("hidden")    // hide the edit button
        filter.classList.remove("hidden")
    }

    // Logout functionality
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        localStorage.removeItem("token"); // Remove the token from localStorage
        window.location.href = "index.html"; // Redirect to home or login page after logout
    });
});