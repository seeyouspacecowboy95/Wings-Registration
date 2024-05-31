const steps = document.querySelectorAll(".step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const childrenContainer = document.getElementById("childrenContainer");
const addChildBtn = document.getElementById("addChildBtn");
let currentStep = 0;
let childCount = 0;
const maxChildren = 5;

const idTypeSelect = document.getElementById("idType");
const idNumberField = document.getElementById("idNumberField");
const passportNumberField = document.getElementById("passportNumberField");

const spouseIdTypeSelect = document.getElementById("spouseIdType");
const spouseIdNumberField = document.getElementById("spouseIdNumberField");
const spousePassportNumberField = document.getElementById("spousePassportNumberField");

idTypeSelect.addEventListener("change", function() {
    if (this.value === "id") {
        idNumberField.style.display = "block";
        passportNumberField.style.display = "none";
    } else if (this.value === "passport") {
        idNumberField.style.display = "none";
        passportNumberField.style.display = "block";
    } else {
        idNumberField.style.display = "none";
        passportNumberField.style.display = "none";
    }
});

spouseIdTypeSelect.addEventListener("change", function() {
    if (this.value === "id") {
        spouseIdNumberField.style.display = "block";
        spousePassportNumberField.style.display = "none";
    } else if (this.value === "passport") {
        spouseIdNumberField.style.display = "none";
        spousePassportNumberField.style.display = "block";
    } else {
        spouseIdNumberField.style.display = "none";
        spousePassportNumberField.style.display = "none";
    }
});

nextBtn.addEventListener("click", function() {
    if (currentStep === 0) {
        // Move to step 2
        step1.style.display = "none";
        step2.style.display = "block";
    } else if (currentStep === steps.length - 1) {
        // Submit the form or perform any necessary action
        return;
    }


    steps[currentStep].classList.remove("active");
    steps[currentStep].classList.add("completed");

    currentStep++;
    prevBtn.disabled = false; // Enable the "Previous" button

    steps[currentStep].classList.add("active");

    // Implement smooth page transition here
    // For example, you could use JavaScript to load the next page content dynamically

    // Update the progress bar
    const progressBar = document.querySelector(".progress-bar");
    const progressWidth = (currentStep + 1) / steps.length * 100;
    progressBar.style.setProperty("--progress-width", `${progressWidth}%`);
});

prevBtn.addEventListener("click", function() {
    if (currentStep === 1) {
        // Move back to step 1
        step1.style.display = "block";
        step2.style.display = "none";
    }

    steps[currentStep].classList.remove("active");
    steps[currentStep].classList.remove("completed");

    currentStep--;
    if (currentStep === 0) {
        prevBtn.disabled = true; // Disable the "Previous" button on the first step
    }

    steps[currentStep].classList.add("active");

    // Implement smooth page transition here
    // For example, you could use JavaScript to load the previous page content dynamically

    // Update the progress bar
    const progressBar = document.querySelector(".progress-bar");
    const progressWidth = (currentStep + 1) / steps.length * 100;
    progressBar.style.setProperty("--progress-width", `${progressWidth}%`);
});

function addChildForm() {
    if (childCount >= maxChildren) {
        alert(`You can only add up to ${maxChildren} children.`);
        return;
    }

    const childForm = document.createElement("div");
    childForm.classList.add("child-form");

    const childFormHTML = `
        <h3>Child ${childCount + 1}</h3>
        <div>
            <label for="childSurname${childCount}">Surname:</label>
            <input type="text" id="childSurname${childCount}" name="childSurname${childCount}" required>
        </div>
        <div>
            <label for="childName${childCount}">Name:</label>
            <input type="text" id="childName${childCount}" name="childName${childCount}" required>
        </div>
        <div>
            <label for="childInitials${childCount}">Initials:</label>
            <input type="text" id="childInitials${childCount}" name="childInitials${childCount}" required>
        </div>
        <!-- Add remaining child form fields here -->
    `;

    childForm.innerHTML = childFormHTML;
    childrenContainer.appendChild(childForm);
    childCount++;
}

addChildBtn.addEventListener("click", addChildForm);