document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    function closeDropdown(dropdownMenuId) {
        const dropdownMenu = document.getElementById(dropdownMenuId);
        if (dropdownMenu) {
            const dropdownToggle = dropdownMenu.closest(".dropdown").querySelector(".nav-link.dropdown-toggle");
            if (dropdownToggle) {
                const dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
                dropdownInstance.hide();
            }
        }
    }

    const selectedFiltersContainer = document.getElementById("selected-filters");
    const capsuleTemplate = document.getElementById("capsule-template");
    const clearFiltersButton = document.getElementById("clear-filters");
    const selectedFilters = new Map();

    function updateClearButtonVisibility() {
        clearFiltersButton.style.display = selectedFilters.size > 0 ? "inline-block" : "none";
    }

    function getCheckboxLabel(checkbox) {
        return checkbox.closest("label") ? checkbox.closest("label").textContent.trim() : checkbox.parentElement.textContent.trim();
    }

    function addFilter(type, id, name) {
        const key = `${type}-${id}`;

        if (document.querySelector(`.filter-capsule[data-type="${type}"][data-id="${id}"]`)) {
            return;
        }

        if (!selectedFilters.has(key)) {
            selectedFilters.set(key, name);

            const newCapsule = capsuleTemplate.cloneNode(true);
            newCapsule.id = key;
            newCapsule.dataset.type = type;
            newCapsule.dataset.id = id;
            newCapsule.querySelector(".filter-text").textContent = name;
            newCapsule.classList.remove("hidden");

            newCapsule.querySelector(".remove-filter").addEventListener("click", function () {
                selectedFilters.delete(key);
                newCapsule.remove();
                uncheckCheckbox(type, id);
                updateClearButtonVisibility();
            });

            selectedFiltersContainer.appendChild(newCapsule);
            updateClearButtonVisibility();
        }
    }

    function uncheckCheckbox(type, id) {
        document.querySelectorAll(`.${type}-checkbox`).forEach(checkbox => {
            if (checkbox.value === id) {
                checkbox.checked = false;
            }
        });
    }

    function removeFilterIfUnchecked() {
        document.querySelectorAll(".department-checkbox, .priority-checkbox, .employee-checkbox").forEach(checkbox => {
            if (!checkbox.checked) {
                const key = `${checkbox.classList[0]}-${checkbox.value}`;
                if (selectedFilters.has(key)) {
                    selectedFilters.delete(key);
                    const capsule = document.querySelector(`.filter-capsule[data-type="${checkbox.classList[0]}"][data-id="${checkbox.value}"]`);
                    if (capsule) capsule.remove();
                }
            }
        });
        updateClearButtonVisibility();
    }

    document.querySelectorAll(".department-checkbox, .priority-checkbox, .employee-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", removeFilterIfUnchecked);
    });

    document.getElementById("confirm-selection").addEventListener("click", function () {
        document.querySelectorAll(".department-checkbox:checked").forEach(checkbox => {
            addFilter("department", checkbox.value, getCheckboxLabel(checkbox));
        });
        closeDropdown("dropdown-menu1");
    });
    
    document.getElementById("confirm-priority").addEventListener("click", function () {
        document.querySelectorAll(".priority-checkbox:checked").forEach(checkbox => {
            addFilter("priority", checkbox.value, getCheckboxLabel(checkbox));
        });
        closeDropdown("dropdown-menu2");
    });
    
    document.getElementById("confirm-employee").addEventListener("click", function () {
        document.querySelectorAll(".employee-checkbox:checked").forEach(checkbox => {
            addFilter("employee", checkbox.value, getCheckboxLabel(checkbox));
        });
        closeDropdown("dropdown-menu3");
    });    

    clearFiltersButton.addEventListener("click", function () {
        selectedFilters.clear();
        selectedFiltersContainer.innerHTML = "";
        document.querySelectorAll(".department-checkbox, .priority-checkbox, .employee-checkbox").forEach(checkbox => {
            checkbox.checked = false;
        });
        updateClearButtonVisibility();
    });

    updateClearButtonVisibility();
});
