
const canvas = document.getElementById("canvas");
const workspace = document.getElementById("workspace");
const arrowLayer = document.getElementById("arrow-layer");

// Canvas settings
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let scale = 0.25;

const minScale = 0.15;
const maxScale = 3;
const zoomSpeed = 0.001;

// Information box settings
let altHeld = false;
let activeInfoState = null;
let infoHideDelay = 250;



// Update workspace position and zoom
function updateWorkspace() {
    workspace.style.transform =
        `translate(${currentX}px, ${currentY}px) scale(${scale})`;

    document.querySelectorAll(".image-info").forEach(info => {
        info.style.transform = `scale(${1 / scale})`;
    });
}


// Panning functionality
canvas.addEventListener("mousedown", (e) => {
    if (e.target !== canvas && e.target !== workspace) return;

    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    updateWorkspace();
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});


// Zoom functionality
canvas.addEventListener("wheel", (e) => {
    e.preventDefault();

    const oldScale = scale;

    scale -= e.deltaY * zoomSpeed;
    scale = Math.min(maxScale, Math.max(minScale, scale));

    // Zoom toward the mouse position
    currentX = e.clientX - (e.clientX - currentX) * (scale / oldScale);
    currentY = e.clientY - (e.clientY - currentY) * (scale / oldScale);

    updateWorkspace();
}, { passive: false });


// Image data
const images = [
    {
        id: "dark-imperium-1",
        src: "/static/images/dark-imperium-1.jpg",
        type: ["novel"],
        connections: ["dark-imperium-2"],
        x: 0,
        y: 500,
        width: 500,
        height: 800,
        info: {
            title: "First Location",
            description: "This is the first location on the map.",
            category: "Location",
            date: "November 9, 2026"
        }
    },
    {
        id: "dark-imperium-2",
        src: "/static/images/dark-imperium-2.jpg",
        type: ["novel"],
        connections: ["dark-imperium-3"],
        x: 1000,
        y: 500,
        width: 500,
        height: 800,
        info: {
            title: "2nd Location",
            description: "This is the first location on the map.",
            category: "Location",
            date: "November 9, 2026"
        }
    },
    {
        id: "dark-imperium-3",
        src: "/static/images/dark-imperium-3.jpg",
        type: ["novel", "dark_imperium"],
        connections: [],
        x: 2000,
        y: 500,
        width: 500,
        height: 800,
        info: {
            title: "3rd Location",
            description: "This is the first location on the map.",
            category: "Location",
            date: "November 9, 2026"
        }
    }
];


// Generate images and information boxes
images.forEach(image => {

    // Create image
    const img = document.createElement("img");

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
        <p class="category"></p>
        <p class="date"></p>
    `;

    workspace.appendChild(info);

    // Populate information
    info.querySelector("h3").textContent = image.info.title;
    info.querySelector(".description").textContent = image.info.description;
    info.querySelector(".category").textContent = `Category: ${image.info.category}`;
    info.querySelector(".date").textContent = `Date: ${image.info.date}`;

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

            if (
        !altHeld &&
        !state.overImage &&
        !state.overInfo &&
        !state.dragging &&
        !info.classList.contains("pinned")
        ) {
        info.classList.remove("visible");

        if (activeInfoState === state) {
            activeInfoState = null;
            }
        }
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

}); // Correctly close images.forEach()


// Initialize workspace after generating images and information boxes
updateWorkspace();


// Arrowhead definition
arrowLayer.innerHTML = `
    <defs>
        <marker id="arrowhead"
            markerWidth="100"
            markerHeight="100"
            refX="75"
            refY="50"
            orient="auto"
            markerUnits="userSpaceOnUse">

            <polygon points="0 0, 100 50, 0 100"
                fill="#ffffff"
                stroke="#ffffff"
                stroke-linejoin="round"
                stroke-linecap="round"/>
        </marker>
    </defs>
`;


// Generate arrows based on image connections
images.forEach(current => {

    current.connections.forEach(connectionId => {

        const next = images.find(image => image.id === connectionId);

        if (!next) return;

        const startOffset = 85;
        const endOffset = 100;

        const startX = current.x + current.width + startOffset;
        const startY = current.y + current.height / 2;

        const endX = next.x - endOffset;
        const endY = next.y + next.height / 2;

        // Create SVG line
        const arrow = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        arrow.setAttribute("x1", startX);
        arrow.setAttribute("y1", startY);
        arrow.setAttribute("x2", endX);
        arrow.setAttribute("y2", endY);

        arrow.classList.add("arrow");

        arrowLayer.appendChild(arrow);
    });

});


// Track Alt key
document.addEventListener("keydown", (e) => {
    if (e.key === "Alt") {
        altHeld = true;
    }
});


// Release Alt key
document.addEventListener("keyup", (e) => {
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

                // Reset information box position
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
});


// Reset Alt behavior if window loses focus
window.addEventListener("blur", () => {
    altHeld = false;

    if (activeInfoState) {
        const state = activeInfoState;

        if (
            !state.overImage &&
            !state.overInfo &&
            !state.info.classList.contains("pinned")
        ) {
            state.info.classList.remove("visible");
            activeInfoState = null;
        }
    }
});