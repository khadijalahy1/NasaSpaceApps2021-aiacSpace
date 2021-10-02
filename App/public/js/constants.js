const _Filters = {
    theme: {
        name: 'Theme',
        description: 'Space, Earth,...',
        icon: '/assets/icons/filters/ic_theme.svg',
        color: '#ac963e',
        values: [
            "geospatial", "jason_3", "ocean", "earth", "space", "vegetation", "aqua", "ecology", "operations", "mars", "defense"
        ]
    },

    source: {
        name: 'Source',
        description: 'Nasa, Canada..',
        icon: '/assets/icons/filters/ic_source.svg',
        color: '#b85abe',
        values: [
            "ob_daac", "nasa", "ornl_daac", "lp_daac", "copernicus"
        ]
    },

    parameter: {
        name: 'Parameter',
        description: 'Temperature, Humidity, ..',
        icon: '/assets/icons/filters/ic_param.svg',
        color: '#5ea758',
        values: [
            "temperature", "density", "salinity", "wavelengths", "ssha", "gps_orbit", "pressure", "radiation", "precipitation", "concentration", "water_vapor", "ph", "conductivity"
        ]
    },

    audience: {
        name: 'Audience',
        description: 'Science, Education, Programming,...',
        icon: '/assets/icons/filters/ic_audience.svg',
        color: '#7278cb',
        successors: ['speciality'],
        values: [
            "programming", "research", "business", "education", "art"
        ]
    },

    speciality: {
        name: 'Speciality',
        description: 'Physics, Biologist,...',
        icon: '/assets/icons/filters/ic_speciality.svg',
        color: '#cb6242',
        predecessor: 'audience',
        values: {
            programming: ["development", "software", "ai", "ml"],
            research: ["biology", "chemistry", "meteorology", "geology", "astronomy", "mathematics"],
            business: ["agriculture", "maritim", "defense", "software"],
            education: ["chemistry", "biology", "physics", "geology", "management", "mathematics", "astronomy"],
            art: []
        }
    },

    format: {
        name: 'Format',
        description: 'PDF, Image,...',
        icon: '/assets/icons/filters/ic_format.svg',
        color: '#45b2c4',
        values: [
            "text_html", "text_csv", "image_jpeg", "image_html", "image_png", "application_pdf", "application_msword"
        ]
    },

    language: {
        name: 'Language',
        description: 'English, Spanish, Python,...',
        icon: '/assets/icons/filters/ic_lang.svg',
        color: '#c75b83',
        values: [

        ]
    },
}

const _FiltersValues = {
    // All (This is not a real filter)
    all: {
        name: "Datasets",
        icon: "/assets/icons/filters/all/ic_all.svg"

    },
    // Theme
    earth: {
        name: "Earth",
        // icon: "/assets/icons/filters/theme/ic_earth.svg"
    },
    aqua: {
        name: "Aqua",
        // icon: "/assets/icons/filters/theme/ic_ocean.svg"
    },
    space: {
        name: "Space",
        // icon: "/assets/icons/filters/theme/ic_space.svg"
    },
    geospatial: {
        name: "Geospatial"
    },
    jason_3: {
        name: "JASON-3"
    },
    ocean: {
        name: "Ocean"
    },
    vegetation: {
        name: "Vegetation"
    },
    ecology: {
        name: "Ecology"
    },
    operations: {
        name: "Operations"
    },
    mars: {
        name: "Mars"
    },
    defense: {
        name: "Defense"
    },

    // Source
    ob_daac: {
        name: "OB.DAAC"
    }, //attention here!!!
    nasa: {
        name: "NASA"
    },
    ornl_daac: {
        name: "ORNL_DAAC"
    },
    lp_daac: {
        name: "LP DAAC"
    },
    copernicus: {
        name: "copernicus"
    },

    // Parameter
    temperature: {
        name: "Temperature"
    },
    density: {
        name: "Density"
    },
    salinity: {
        name: "Salinity"
    },
    wavelengths: {
        name: "Wave lengths"
    },
    ssha: {
        name: "SSHA"
    },
    gps_orbit: {
        name: "GPS orbit"
    },
    pressure: {
        name: "Pressure"
    },
    radiation: {
        name: "Radiation"
    },
    precipitation: {
        name: "Precipitation"
    },
    concentration: {
        name: "Concentration"
    },
    water_vapor: {
        name: "Water vapor"
    },
    ph: {
        name: "pH"
    },
    conductivity: {
        name: "Conductivity"
    },

    // Audience
    programming: {
        name: "Programming"
    },
    research: {
        name: "Research"
    },
    business: {
        name: "Business"
    },
    education: {
        name: "Education"
    },
    art: {
        name: "Art"
    },

    // Speciality
    development: {
        name: "Development"
    },
    software: {
        name: "Software"
    },
    ai: {
        name: "AI"
    },
    ml: {
        name: "ML"
    },
    biology: {
        name: "Biology"
    },
    chemistry: {
        name: "Chemistry"
    },
    meteorology: {
        name: "Meteorology"
    },
    geology: {
        name: "Geology"
    },
    astronomy: {
        name: "Astronomy"
    },
    mathematics: {
        name: "Mathematics"
    },
    agriculture: {
        name: "Agriculture"
    },
    maritim: {
        name: "Maritim"
    },
    defense: {
        name: "Defense"
    },
    physics: {
        name: "Physics"
    },
    management: {
        name: "Management"
    },


    // Format
    text_html: {
        name: "HTML"
    },
    text_csv: {
        name: "CSV"
    },
    image_jpeg: {
        name: "JPEG Image"
    },
    image_html: {
        name: "Web Image"
    },
    image_png: {
        name: "PNG Image"
    },
    application_pdf: {
        name: "PDF"
    },
    application_msword: {
        name: "MSWord"
    },

}

class Filters {

    static Name(filterId) {
        return _Filters[filterId]?.name
    }

    static Description(filterId) {
        return _Filters[filterId]?.description
    }

    static Icon(filterId) {
        return _Filters[filterId]?.icon
    }

    static Color(filterId) {
        return _Filters[filterId]?.color
    }

    static Predecessor(filterId) {
        return _Filters[filterId]?.predecessor
    }

    static Successors(filterId) {
        return _Filters[filterId]?.successors
    }

    static Values(filterId) {
        return _Filters[filterId]?.values;
    }

    static get List() {
        return Object.keys(_Filters);
    }
}

class FiltersValues {

    static Name(valueId) {
        return _FiltersValues[valueId]?.name
    }

    static Icon(valueId) {
        return _FiltersValues[valueId]?.icon
    }
}