
const canvas = document.getElementById("canvas");
const workspace = document.getElementById("workspace");

let isDragging = false;

let startX = 0;
let startY = 0;

let currentX = 0;
let currentY = 0;

let scale = 0.25;

const minScale = 0.15;
const maxScale = 3;
const zoomSpeed = 0.001;

updateWorkspace();

// Dragging functionality
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

    // Mouse position relative to canvas
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Adjust position to zoom toward mouse
    currentX = mouseX - (mouseX - currentX) * (scale / oldScale);
    currentY = mouseY - (mouseY - currentY) * (scale / oldScale);

    updateWorkspace();
}, { passive: false });

// Update workspace position and zoom
function updateWorkspace() {
    workspace.style.transform =
        `translate(${currentX}px, ${currentY}px) scale(${scale})`;

    document.querySelectorAll(".image-info").forEach(info => {
        info.style.transform = `scale(${1 / scale})`;
    });
}

// Images

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
        connections: [ "dark-imperium-3"],
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

// Generate images and information boxes on the canvas
images.forEach(image => {
    // Create image
    const img = document.createElement("img");

    img.src = image.src;
    img.className = "canvas-image";

    img.style.left = image.x + "px";
    img.style.top = image.y + "px";
    img.style.width = image.width + "px";
    img.style.height = image.height + "px";

    workspace.appendChild(img);

    // Create information box
    const info = document.createElement("div");
    info.className = "image-info";

    info.innerHTML = `
        <h3>${image.info.title}</h3>
        <p>${image.info.description}</p>
        <p>Category: ${image.info.category}</p>
        <p>Date: ${image.info.date}</p>
    `;

    // Position information box below image
    info.style.left = image.x + "px";
    info.style.top = (image.y + image.height + 25) + "px";

    workspace.appendChild(info);
});

const arrowLayer = document.getElementById("arrow-layer");

// Define arrowhead
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

// Generate arrows based on connections
images.forEach(current => {
    current.connections.forEach(connectionId => {

        // Find the image that this image connects to
        const next = images.find(image => image.id === connectionId);

        if (!next) return;

        const start_offset = 85; // This makes it so that an arrow does not start or end inside an image
        const end_offset = 100;

        const startX = current.x + current.width + start_offset;
        const startY = current.y + current.height / 2;

        const endX = next.x - end_offset;
        const endY = next.y + next.height / 2;

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