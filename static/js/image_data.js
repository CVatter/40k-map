// Image data
const images = [



    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // DARK IMPERIUM
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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



    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // CRUSADE OF VENGEANCE
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    {
        id: "crusade-of-vengeance-1",
        src: "/static/images/indomitus-era/crusade-of-vengeance/crusade-of-vengeance-1.jpg",
        type: ["novel", "crusade-of-vengeance"],
        connections: ["last-whiteshield"],
        x: 5500,
        y: 1500,
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
        connections: [""],
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



    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // VAULTS OF TERRA
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    {
        id: "the-carrion-throne",
        src: "/static/images/indomitus-era/vaults-of-terra/the-carrion-throne.jpg",
        type: ["novel", "vaults-of-terra"],
        connections: ["the-fall-of-cadia"],
        x: 500,
        y: 1500,
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
        id: "hollowed-mountain",
        src: "/static/images/indomitus-era/vaults-of-terra/hollowed-mountain.jpg",
        type: ["novel", "vaults-of-terra"],
        connections: ["emperors-legion"],
        x: 2500,
        y: 1500,
        width: 500,
        height: 800,
        info: {
            title: "Vaults of Terra: The Hollowed Mountain",
            description: "This is the second novel of the Vaults of Terra trillogy",
            published: "July 2019",
            author: "Chris Wraight"
        }
    },

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // WATCHERS OF THE THRONE
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    {
        id: "emperors-legion",
        src: "/static/images/indomitus-era/watchers-of-the-throne/emperors-legion.jpg",
        type: ["novel", "Watchers of the Throne"],
        connections: ["lords-of-silence"],
        x: 3500,
        y: 1500,
        width: 500,
        height: 800,
        info: {
            title: "Watchers of the Throne: The Emperor's Legion",
            description: "This is the first novel of the Watchers of the Throne trillogy and fourth novel in the Indomitus Era",
            published: "September 2017",
            author: "Chris Wraight"
        }
    },



    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // MISC
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    {
        id: "the-fall-of-cadia",
        src: "/static/images/indomitus-era/misc/fall-of-cadia.jpg",
        type: ["novel", "misc"],
        connections: ["hollowed-mountain"],
        x: 1500,
        y: 1500,
        width: 500,
        height: 800,
        info: {
            title: "The Fall of Cadia",
            description: "This is the second book in the Indomitus Era",
            published: "August 2023",
            author: "Robert Rath"
        }
    },
    {
        id: "lords-of-silence",
        src: "/static/images/indomitus-era/misc/lords-of-silence.jpg",
        type: ["novel", "misc"],
        connections: ["crusade-of-vengeance-1"],
        x: 4500,
        y: 1500,
        width: 500,
        height: 800,
        info: {
            title: "Lords of Silence",
            description: "This is the fifth book in the Indomitus Era",
            published: "August 2018",
            author: "Chris Wraight"
        }
    },
    {
        id: "knights-of-macragge",
        src: "/static/images/indomitus-era/misc/knights-of-macragge.jpg",
        type: ["novel", "misc"],
        connections: ["void-king"],
        x: 7500,
        y: 1500,
        width: 500,
        height: 800,
        info: {
            title: "Knights of Macragge",
            description: "This is the eigth book in the Indomitus Era",
            published: "August 2019",
            author: "Nick Kyme"
        }
    },



    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // CHARACTERS
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    {
        id: "last-whiteshield",
        src: "/static/images/indomitus-era/char/last-whiteshield.jpg",
        type: ["novel", "char"],
        connections: ["knights-of-macragge"],
        x: 6500,
        y: 1500,
        width: 500,
        height: 800,
        info: {
            title: "Minka Lesk: The Last Whiteshield",
            description: "This is the seventh book in the Indomitus Era and the first character novel",
            published: "June 2023",
            author: "Justin D. Hill"
        }
    },

];