document.addEventListener("DOMContentLoaded", function () {
    // Prevent dropdown from closing when clicking inside
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // Function to close a dropdown when the confirm button is clicked
    function closeDropdown(dropdownMenuId) {
        const dropdownMenu = document.getElementById(dropdownMenuId);
        if (dropdownMenu) {
            const dropdownToggle = dropdownMenu.closest(".dropdown").querySelector(".nav-link.dropdown-toggle");
            if (dropdownToggle) {
                const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
                dropdownInstance.hide();

                // Reset text color after closing
                dropdownToggle.style.color = "";  // Reset to default Bootstrap color
            }
        }
    }

    // Handle department selection button
    document.getElementById("confirm-selection").addEventListener("click", function () {
        const selectedDepartments = [];
        document.querySelectorAll(".department-checkbox:checked").forEach(checkbox => {
            selectedDepartments.push(checkbox.value);
        });

        console.log("Selected Departments:", selectedDepartments);

        // Close the department dropdown
        closeDropdown("dropdown-menu1");
    });

    // Handle priority selection button
    document.getElementById("confirm-priority").addEventListener("click", function () {
        const selectedPriorities = [];
        document.querySelectorAll(".priority-checkbox:checked").forEach(checkbox => {
            selectedPriorities.push(checkbox.value);
        });

        console.log("Selected Priorities:", selectedPriorities);

        // Close the priority dropdown
        closeDropdown("dropdown-menu2");
    });

    document.getElementById("confirm-employee").addEventListener("click", function () {
        const selectedEmployees = [];
        document.querySelectorAll(".employee-checkbox:checked").forEach(checkbox => {
            selectedEmployees.push(checkbox.value);
        });

        console.log("Selected Employees:", selectedEmployees);

        // Close the priority dropdown
        closeDropdown("dropdown-menu3");
    });
});
