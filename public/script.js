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

    const modal = document.getElementById("employee-modal");
    const backdrop = document.getElementById("modal-backdrop");
    const openModalBtn = document.querySelector(".header-button-1");
    const closeModalBtns = document.querySelectorAll(".close-modal");
    const form = document.getElementById("employee-form");
    const yourBearerToken = "9e77b40d-621c-4675-9e4a-7d811a754ed5";

    openModalBtn.addEventListener("click", function () {
        modal.classList.remove("hidden");
        backdrop.classList.remove("hidden");
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            modal.classList.add("hidden");
            backdrop.classList.add("hidden");
        });
    });

    backdrop.addEventListener("click", function () {
        modal.classList.add("hidden");
        backdrop.classList.add("hidden");
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
    
        const formData = new FormData(form);
    
        try {
            const response = await fetch("/employees", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${yourBearerToken}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                alert("Employee successfully added!");
                modal.classList.add("hidden");
                backdrop.classList.add("hidden");
                form.reset();
            } else {
                const errorText = await response.text();
                console.error("Server Error:", errorText);
                alert("Error: " + errorText);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error occurred during submission!");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const avatarUpload = document.getElementById("avatar-upload");
  const avatarInput = document.getElementById("avatar");
  const avatarPreview = document.getElementById("avatar-preview");
  const avatarImg = document.getElementById("avatar-img");
  const removeAvatar = document.getElementById("remove-avatar");
  const uploadText = document.getElementById("upload-text");

  avatarUpload.addEventListener("click", function (event) {
    if (event.target !== removeAvatar) {
      avatarInput.click();
    }
  });

  avatarInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarImg.src = e.target.result;
        avatarPreview.style.display = "flex";
        removeAvatar.style.display = "block";
        uploadText.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });

  removeAvatar.addEventListener("click", function (event) {
    event.stopPropagation(); 
    avatarImg.src = "";
    avatarPreview.style.display = "none";
    removeAvatar.style.display = "none";
    uploadText.style.display = "block";
    avatarInput.value = "";
  });
});
  