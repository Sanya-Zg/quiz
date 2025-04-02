

    // Burger menu toggle
    document.querySelector(".burger-menu").addEventListener("click", function() {
        document.querySelector(".nav").classList.toggle("active");
        document.querySelector('.contant').classList.toggle('mt');
    });

    const answerMenu = document.querySelector(".answer_menu");
    const dropdown = document.querySelector(".dropdown");
    
    // Open/close menu
    function toggleMenu() {
        const isExpanded = answerMenu.getAttribute("aria-expanded") === "true";
        answerMenu.setAttribute("aria-expanded", !isExpanded);
        dropdown.style.display = isExpanded ? "none" : "block";
        
        if (!isExpanded) {
            // Move focus to the first menu item
            const firstItem = dropdown.querySelector("a");
            if (firstItem) firstItem.focus();
        }
    }
    
    // Close the menu and return focus to the button
    function closeMenu() {
        answerMenu.setAttribute("aria-expanded", "false");
        dropdown.style.display = "none";
        answerMenu.focus(); 
    }
    
    // Click and key handler
    answerMenu.addEventListener("click", toggleMenu);
    answerMenu.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        } else if (e.key === "ArrowDown" && dropdown.style.display === "block") {
            e.preventDefault();
            const firstItem = dropdown.querySelector("a");
            if (firstItem) firstItem.focus();
        }
    });
    
    // Close when pressing Escape
    dropdown.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        } 
        // Navigation with arrows inside the menu
        else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const items = Array.from(dropdown.querySelectorAll("a"));
            const currentIndex = items.indexOf(document.activeElement);
            let nextIndex;
            
            if (e.key === "ArrowDown") {
                nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            }
            
            items[nextIndex].focus();
        }
    });
    
    // Close when clicked outside the menu
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".menu_dropdown")) {
            closeMenu();
        }
    });

    const answers = document.querySelectorAll('.answer');
    const submitButton = document.getElementById('answer_submit');

    answers.forEach(answer => {
        answer.setAttribute('role', 'button');
        answer.setAttribute('tabindex', '0');

        answer.addEventListener('click', () => {
            selectAnswer(answer);
            submitButton.focus(); 
        });

        answer.addEventListener('keydown', (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectAnswer(answer);
                submitButton.focus();
            }
        });
    });

    function selectAnswer(selected) {
        answers.forEach(el => {
            el.classList.remove('selected');
            el.setAttribute('aria-selected', 'false');
        });
        selected.classList.add('selected');
        selected.setAttribute('aria-selected', 'true');
    }