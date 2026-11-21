// Image data
const images = [
    {
        id: "dark-imperium-1",
        src: "/static/images/indomitus-era/dark-imperium/dark-imperium-1.jpg",
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
        src: "/static/images/indomitus-era/dark-imperium/dark-imperium-2.jpg",
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
        src: "/static/images/indomitus-era/dark-imperium/dark-imperium-3.jpg",
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
        src: "/static/images/indomitus-era/crusade-of-vengeance/crusade-of-vengeance-1.jpg",
        type: ["novel", "crusade-of-vengeance"],
        connections: ["crusade-of-vengeance-2"],
        x: 6000,
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
        src: "/static/images/indomitus-era/crusade-of-vengeance/crusade-of-vengeance-2.jpg",
        type: ["novel", "crusade-of-vengeance"],
        connections: ["crusade-of-vengeance-3"],
        x: 7000,
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
        src: "/static/images/indomitus-era/crusade-of-vengeance/crusade-of-vengeance-3.jpg",
        type: ["novel", "crusade-of-vengeance"],
        connections: [""],
        x: 8000,
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
    {
        id: "the-carrion-throne",
        src: "/static/images/indomitus-era/vaults-of-terra/the-carrion-throne.jpg",
        type: ["novel", "vaults-of-terra"],
        connections: ["the-fall-of-cadia"],
        x: 0,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "Vaults of Terra: The Carrion Throne",
            description: "This is the first novel of the Vaults of Terra trillogy",
            published: "May 2017",
            author: "Chris Wraight"
        }
    },
    {
        id: "the-fall-of-cadia",
        src: "/static/images/indomitus-era/misc/fall-of-cadia.jpg",
        type: ["novel", "misc"],
        connections: [""],
        x: 1000,
        y: 2500,
        width: 500,
        height: 800,
        info: {
            title: "The Fall of Cadia",
            description: "This is the second book in the Indomitus Era",
            published: "August 2023",
            author: "Robert Rath"
        }
    },

];