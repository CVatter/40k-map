
const imageLayout = [

    // ==========================================
    // DARK IMPERIUM
    // ==========================================

    {
        id: "dark-imperium-1",
        connections: ["dark-imperium-2"],
        x: 10000,
        y: 2500,
        width: 500,
        height: 800
    },
    {
        id: "dark-imperium-2",
        connections: ["dark-imperium-3"],
        x: 11000,
        y: 2500,
        width: 500,
        height: 800
    },
    {
        id: "dark-imperium-3",
        connections: [],
        x: 12000,
        y: 2500,
        width: 500,
        height: 800
    },


    // ==========================================
    // CRUSADE OF VENGEANCE
    // ==========================================

    {
        id: "crusade-of-vengeance-1",
        connections: ["last-whiteshield"],
        x: 5500,
        y: 1500,
        width: 500,
        height: 800
    },
    {
        id: "crusade-of-vengeance-2",
        connections: [],
        x: 9500,
        y: 1500,
        width: 500,
        height: 800
    },
    {
        id: "crusade-of-vengeance-3",
        connections: [],
        x: 8000,
        y: 2500,
        width: 500,
        height: 800
    },


    // ==========================================
    // VAULTS OF TERRA
    // ==========================================

    {
        id: "the-carrion-throne",
        connections: ["fall-of-cadia"],
        x: 500,
        y: 1500,
        width: 500,
        height: 800
    },
    {
        id: "hollowed-mountain",
        connections: ["emperors-legion"],
        x: 2500,
        y: 1500,
        width: 500,
        height: 800
    },


    // ==========================================
    // WATCHERS OF THE THRONE
    // ==========================================

    {
        id: "emperors-legion",
        connections: ["lords-of-silence"],
        x: 3500,
        y: 1500,
        width: 500,
        height: 800
    },
    {
        id: "regents-shadow",
        connections: ["heretic-saint"],
        x: 9500,
        y: 1500,
        width: 500,
        height: 800
    },

    // ==========================================
    // MISC
    // ==========================================

    {
        id: "fall-of-cadia",
        connections: ["hollowed-mountain"],
        x: 1500,
        y: 1500,
        width: 500,
        height: 800
    },
    {
        id: "lords-of-silence",
        connections: ["crusade-of-vengeance-1"],
        x: 4500,
        y: 1500,
        width: 500,
        height: 800
    },
    {
        id: "knights-of-macragge",
        connections: ["void-king"],
        x: 7500,
        y: 1500,
        width: 500,
        height: 800
    },
    {
        id: "void-king",
        connections: ["crusade-of-vengeance-2"],
        x: 8500,
        y: 1500,
        width: 500,
        height: 800
    },


    // ==========================================
    // CHARACTERS
    // ==========================================

    {
        id: "last-whiteshield",
        connections: ["knights-of-macragge"],
        x: 6500,
        y: 1500,
        width: 500,
        height: 800
    }

];


// ==========================================
// GENERATE IMAGE DATA FROM DATABASE
// ==========================================

const images = imageLayout.map(layout => {
    const dbImage = databaseImages.find(image => image.id === layout.id);

    if (!dbImage) {
        console.error("Image not found in database:", layout.id);
        return null;
    }

    return {
        ...layout,
        src: dbImage.src,
        type: [dbImage.category.toLowerCase()],
        info: {
            title: dbImage.title,
            description: dbImage.brief_description,
            published: dbImage.date,
            author: dbImage.author
        }
    };
}).filter(image => image !== null);