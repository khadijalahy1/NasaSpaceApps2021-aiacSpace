const _Filters = {
    theme: {
        name: 'Theme',
        description: 'Space, Earth,...',
        icon: '/assets/icons/filters/ic_theme.svg',
        color: '#ac963e',
        values: [
            "earth", "ocean", "space"
        ]
    },

    source: {
        name: 'Source',
        description: 'Nasa, Canada..',
        icon: '/assets/icons/filters/ic_source.svg',
        color: '#b85abe',
        values: [

        ]
    },

    parameter: {
        name: 'Parameter',
        description: 'Temperature, Humidity, ..',
        icon: '/assets/icons/filters/ic_param.svg',
        color: '#5ea758',
        values: [
            "temperature", "density", "salinity", "wavelengths", "SSHA", "GPS orbit", "pressure", "radiation", "precipitation", "concentration", "water vapor", "pH", "conductivity"
        ]
    },

    audience: {
        name: 'Audience',
        description: 'Science, Education, Programming,...',
        icon: '/assets/icons/filters/ic_audience.svg',
        color: '#7278cb',
        values: [
            "programming", "research", "business", "education", "art"
        ]
    },

    speciality: {
        name: 'Speciality',
        description: 'Physics, Biologist,...',
        icon: '/assets/icons/filters/ic_speciality.svg',
        color: '#cb6242',
        ascensor: 'audience',
        values: {
            programming: ["development", "software", "AI", "ML"],
            research: ["biology", "chemistry", "biology", "meteorology", "geology", "astronomy", "mathematics"],
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
            "text/html", "text/csv", "image/jpeg", "image/html", "image/png", "application/pdf", "application/msword"
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
    // None
    all: {
        name: "Datasets",
        icon: "/assets/icons/filters/all/ic_all.svg"
    },
    // Theme
    earth: {
        name: "Earth",
        icon: "/assets/icons/filters/theme/ic_earth.svg"
    },
    ocean: {
        name: "Ocean",
        icon: "/assets/icons/filters/theme/ic_ocean.svg"
    },
    space: {
        name: "Space",
        icon: "/assets/icons/filters/theme/ic_space.svg"
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
    SSHA: {
        name: "SSHA"
    },
    "GPS orbit": {
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
    "water vapor": {
        name: "Water vapor"
    },
    pH: {
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

    // Format
    "text/html": {
        name: "HTML"
    },
    "text/csv": {
        name: "CSV"
    },
    "image/jpeg": {
        name: "JPEG Image"
    },
    "image/html": {
        name: "Web Image"
    },
    "image/png": {
        name: "PNG Image"
    },
    "application/pdf": {
        name: "PDF"
    },
    "application/msword": {
        name: "MSWord"
    },

}

class Filters {

    static Name(filterId) {
        return _Filters[filterId].name
    }

    static Description(filterId) {
        return _Filters[filterId].description
    }

    static Icon(filterId) {
        return _Filters[filterId].icon
    }

    static Color(filterId) {
        return _Filters[filterId].color
    }

    static Ascensor(filterId) {
        return _Filters[filterId].ascensor
    }

    static Values(filterId) {
        return _Filters[filterId].values
    }

    static get List() {
        return Object.keys(_Filters);
    }
}

class FiltersValues {

    static Name(valueId) {
        return _FiltersValues[valueId].name
    }

    static Icon(valueId) {
        return _FiltersValues[valueId].icon
    }
}