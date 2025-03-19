document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("departmentDropdown");
    const confirmButton = document.getElementById("confirm-selection");

    // Prevent dropdown from closing when clicking inside
    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Handle button click
    confirmButton.addEventListener("click", function () {
        const selectedDepartments = [];
        document.querySelectorAll(".department-checkbox:checked").forEach(checkbox => {
            selectedDepartments.push(checkbox.value);
        });

        console.log("Selected Departments:", selectedDepartments);

        // Close dropdown when button is clicked
        bootstrap.Dropdown.getInstance(document.querySelector(".nav-link.dropdown-toggle")).hide();
    });
});
