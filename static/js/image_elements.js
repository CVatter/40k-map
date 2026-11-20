
function generateImageElements() {

    // Generate images and information boxes
    images.forEach(image => {

        // Create image
        const img = document.createElement("img");

        img.addEventListener("click", () => {
            window.location.href = `/info/${image.id}`;
        });

        img.src = image.src;
        img.className = "canvas-image";
        img.draggable = false;

        img.style.left = image.x + "px";
        img.style.top = image.y + "px";
        img.style.width = image.width + "px";
        img.style.height = image.height + "px";

        workspace.appendChild(img);


        // Create information box
        const info = document.createElement("div");

        info.className = "image-info";

        info.innerHTML = `
            <div class="info-drag-handle"></div>
            <button class="pin-button" type="button" title="Pin info box">📌</button>
            <h3></h3>
            <p class="description"></p>
            <p class="author"></p>
            <p class="published"></p>
        `;

        // Populate information
        info.querySelector("h3").textContent = image.info.title;
        info.querySelector(".description").textContent = image.info.description;
        info.querySelector(".author").textContent = `Author: ${image.info.author}`;
        info.querySelector(".published").textContent = `Published: ${image.info.published}`;

        // Position information box below image
        info.style.left = image.x + "px";
        info.style.top = (image.y + image.height + 25) + "px";

        // Save original position
        const originalX = image.x;
        const originalY = image.y + image.height + 25;

        workspace.appendChild(info);


        // Individual hover state
        const state = {
            info: info,
            overImage: false,
            overInfo: false,
            dragging: false,
            hideTimeout: null
        };


        // Drag information box
        const dragHandle = info.querySelector(".info-drag-handle");

        let isDraggingInfo = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let infoStartX = 0;
        let infoStartY = 0;

        dragHandle.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();

            isDraggingInfo = true;
            state.dragging = true;

            dragStartX = e.clientX;
            dragStartY = e.clientY;

            infoStartX = parseFloat(info.style.left);
            infoStartY = parseFloat(info.style.top);

            document.body.style.userSelect = "none";
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDraggingInfo) return;

            const deltaX = (e.clientX - dragStartX) / scale;
            const deltaY = (e.clientY - dragStartY) / scale;

            info.style.left = (infoStartX + deltaX) + "px";
            info.style.top = (infoStartY + deltaY) + "px";
        });

        document.addEventListener("mouseup", () => {
            if (!isDraggingInfo) return;

            isDraggingInfo = false;
            state.dragging = false;

            document.body.style.userSelect = "";

            if (!state.overInfo && !state.overImage) {
                scheduleHide();
            }
        });


        // Schedule information box to hide
        function scheduleHide() {
            clearTimeout(state.hideTimeout);

            state.hideTimeout = setTimeout(() => {
                if (
                    !altHeld &&
                    !state.overImage &&
                    !state.overInfo &&
                    !state.dragging &&
                    !info.classList.contains("pinned")
                ) {
                    info.classList.remove("visible");

                    // Reset information box position
                    info.style.left = originalX + "px";
                    info.style.top = originalY + "px";

                    if (activeInfoState === state) {
                        activeInfoState = null;
                    }
                }
            }, infoHideDelay);
        }


        // Show information box when hovering over image
        img.addEventListener("mouseenter", () => {
            clearTimeout(state.hideTimeout);

            // Hide previously active information box unless pinned
            if (activeInfoState && activeInfoState !== state) {
                const previousState = activeInfoState;

                if (!previousState.info.classList.contains("pinned")) {
                    previousState.info.classList.remove("visible");
                }
            }

            activeInfoState = state;
            state.overImage = true;

            info.classList.add("visible");
        });


        // Handle leaving the image
        img.addEventListener("mouseleave", () => {
            state.overImage = false;

            if (!altHeld && !info.classList.contains("pinned")) {
                scheduleHide();
            }
        });


        // Keep information box visible while hovering over it
        info.addEventListener("mouseenter", () => {
            clearTimeout(state.hideTimeout);

            activeInfoState = state;
            state.overInfo = true;

            info.classList.add("visible");
        });


        // Handle leaving the information box
        info.addEventListener("mouseleave", () => {
            state.overInfo = false;

            if (
                !altHeld &&
                !state.dragging &&
                !info.classList.contains("pinned")
            ) {
                scheduleHide();
            }
        });


        // Pin and unpin information box
        const pinButton = info.querySelector(".pin-button");

        pinButton.addEventListener("click", (e) => {
            e.stopPropagation();

            const isPinned = info.classList.toggle("pinned");

            if (isPinned) {
                info.classList.add("visible");
            }

            pinButton.title = isPinned ? "Unpin info box" : "Pin info box";
            pinButton.setAttribute("aria-pressed", isPinned);

            if (
                !isPinned &&
                !altHeld &&
                !state.overImage &&
                !state.overInfo
            ) {
                scheduleHide();
            }
        });

    });

    // Track Alt key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Alt") {
            e.preventDefault();
            altHeld = true;

            if (activeInfoState) {
                clearTimeout(activeInfoState.hideTimeout);
                activeInfoState.info.classList.add("visible");
            }
        }
    }, true);


    // Release Alt key
    window.addEventListener("keyup", (e) => {
        if (e.key === "Alt") {
            altHeld = false;

            if (activeInfoState) {
                const state = activeInfoState;

                if (
                    !state.overImage &&
                    !state.overInfo &&
                    !state.info.classList.contains("pinned")
                ) {
                    state.info.classList.remove("visible");

                    const image = images.find(img =>
                        img.info.title === state.info.querySelector("h3").textContent
                    );

                    if (image) {
                        state.info.style.left = image.x + "px";
                        state.info.style.top = (image.y + image.height + 25) + "px";
                    }

                    activeInfoState = null;
                }
            }
        }
    }, true);


    // Reset Alt behavior if window loses focus
    window.addEventListener("blur", () => {
        altHeld = false;
    });

    
    // Initialize workspace after generating images and information boxes
    updateWorkspace();
}
