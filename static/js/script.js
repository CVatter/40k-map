
const canvas = document.getElementById("canvas");
const workspace = document.getElementById("workspace");
const arrowLayer = document.getElementById("arrow-layer");


// ==========================================
// CANVAS SETTINGS
// ==========================================

let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

const minScale = 0.25;
const maxScale = 3;
const zoomSpeed = 0.001;

let scale = minScale;


// ==========================================
// INFORMATION BOX SETTINGS
// ==========================================

let altHeld = false;
let activeInfoState = null;
let infoHideDelay = 250;


// ==========================================
// UPDATE WORKSPACE
// ==========================================

function updateWorkspace() {
    workspace.style.transform =
        `translate(${currentX}px, ${currentY}px) scale(${scale})`;

    document.querySelectorAll(".image-info").forEach(info => {
        info.style.transform = `scale(${1 / scale})`;
    });
}


// ==========================================
// CANVAS PANNING
// ==========================================

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


// ==========================================
// CANVAS ZOOM
// ==========================================

canvas.addEventListener("wheel", (e) => {
    e.preventDefault();

    const oldScale = scale;

    scale -= e.deltaY * zoomSpeed;
    scale = Math.min(maxScale, Math.max(minScale, scale));

    currentX = e.clientX - (e.clientX - currentX) * (scale / oldScale);
    currentY = e.clientY - (e.clientY - currentY) * (scale / oldScale);

    updateWorkspace();
}, { passive: false });


// ==========================================
// ARROWHEAD DEFINITION
// ==========================================

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


// ==========================================
// GENERATE ARROWS
// ==========================================

images.forEach(current => {
    (current.connections || []).forEach(connectionId => {
        const next = images.find(image => image.id === connectionId);
        if (!next) return;

        const startOffset = 85;
        const endOffset = 100;

        const currentCenterX = current.x + current.width / 2;
        const currentCenterY = current.y + current.height / 2;

        const nextCenterX = next.x + next.width / 2;
        const nextCenterY = next.y + next.height / 2;

        const dx = nextCenterX - currentCenterX;
        const dy = nextCenterY - currentCenterY;

        let startX, startY, endX, endY;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                startX = current.x + current.width;
                startY = currentCenterY;

                endX = next.x;
                endY = nextCenterY;
            } else {
                startX = current.x;
                startY = currentCenterY;

                endX = next.x + next.width;
                endY = nextCenterY;
            }
        } else {
            if (dy > 0) {
                startX = currentCenterX;
                startY = current.y + current.height;

                endX = nextCenterX;
                endY = next.y;
            } else {
                startX = currentCenterX;
                startY = current.y;

                endX = nextCenterX;
                endY = next.y + next.height;
            }
        }

        // Apply spacing to both ends of the arrow
        const arrowDX = endX - startX;
        const arrowDY = endY - startY;
        const distance = Math.sqrt(arrowDX * arrowDX + arrowDY * arrowDY);

        if (distance === 0) return;

        const unitX = arrowDX / distance;
        const unitY = arrowDY / distance;

        startX += unitX * startOffset;
        startY += unitY * startOffset;

        endX -= unitX * endOffset;
        endY -= unitY * endOffset;

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


// ==========================================
// INITIALIZE CANVAS
// ==========================================

generateImageElements();
updateWorkspace();