const canvas = document.getElementById("canvas");
const workspace = document.getElementById("workspace");
const arrowLayer = document.getElementById("arrow-layer");

// Canvas settings
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

const minScale = 0.15;
const maxScale = 3;
let scale = minScale;
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

generateImageElements();