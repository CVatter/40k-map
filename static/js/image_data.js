// Image data
const images = [
    {
        id: "dark-imperium-1",
        src: "/static/images/dark-imperium/dark-imperium-1.jpg",
        type: ["novel"],
        connections: ["dark-imperium-2"],
        x: 10000,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "Dark Imperium",
            description: "First book in the Dark Imperium trillogy.",
            published: "June 2017",
            author: "Guy Haley"
        }
    },
    {
        id: "dark-imperium-2",
        src: "/static/images/dark-imperium/dark-imperium-2.jpg",
        type: ["novel"],
        connections: ["dark-imperium-3"],
        x: 11000,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "Dark Imperium: Plague War",
            description: "Second book in the Dark Imperium trillogy.",
            published: "October 2018",
            author: "Guy Haley"
        }
    },
    {
        id: "dark-imperium-3",
        src: "/static/images/dark-imperium/dark-imperium-3.jpg",
        type: ["novel", "dark_imperium"],
        connections: [],
        x: 12000,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "Dark Imperium: Godblight",
            description: "Third book in the Dark Imperium trillogy.",
            published: "May 2021",
            author: "Guy Haley"
        }
    },
    {
        id: "crusade-of-vengeance-1",
        src: "/static/images/crusade-of-vengeance/crusade-of-vengeance-1.jpg",
        type: ["novel", "crusade-of-vengeance"],
        connections: ["crusade-of-vengeance-2"],
        x: 1000,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "Avenging Son",
            description: "This is the first novel in the Indomitus Era",
            published: "August 2020",
            author: "Guy Haley"
        }
    },
    {
        id: "crusade-of-vengeance-2",
        src: "/static/images/crusade-of-vengeance/crusade-of-vengeance-2.jpg",
        type: ["novel", "crusade-of-vengeance"],
        connections: ["crusade-of-vengeance-3"],
        x: 2000,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "The Gate of Bones",
            description: "This is the second novel in the Indomitus Era",
            published: "February 2021",
            author: "Andy Clark"
        }
    },
    {
        id: "crusade-of-vengeance-3",
        src: "/static/images/crusade-of-vengeance/crusade-of-vengeance-3.jpg",
        type: ["novel", "crusade-of-vengeance"],
        connections: [""],
        x: 3000,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "The Wolftime",
            description: "This is the third novel in the Indomitus Era",
            published: "November 2021",
            author: "Gav Thorpe"
        }
    },

];