const _Filters = {
    theme: {
        name: 'Theme',
        description: 'Space, Earth,...',
        icon: '/assets/icons/filters/ic_theme.svg',
        color: '#ac963e',
        values: [
            "earth", "science"
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

        ]  
    },

    audience: {
        name: 'Audience',
        description: 'Science, Education, Programming,...',
        icon: '/assets/icons/filters/ic_audience.svg',
        color: '#7278cb',
        values: [

        ]
    },

    speciality: {
        name: 'Speciality',
        description: 'Physics, Biologist,...',
        icon: '/assets/icons/filters/ic_speciality.svg',
        color: '#cb6242',
        ascensor: 'audience',
        values: [

        ]
    },

    format: {
        name: 'Format',
        description: 'PDF, Image,...',
        icon: '/assets/icons/filters/ic_format.svg',
        color: '#45b2c4',
        values: [

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
        filter: "null",
        name: "Datasets",
        icon: "/assets/icons/filters-values/ic_all.svg"
    },
    // Theme
    earth: {
        filter: "theme",
        name: "Earth",
        icon: "/assets/icons/filters-values/ic_earth.svg"
    },
    ocean: {
        filter: "theme",
        name: "Ocean",
        icon: "/assets/icons/filters-values/ic_ocean.svg"
    },
    space: {
        filter: "theme",
        name: "Space",
        icon: "/assets/icons/filters-values/ic_space.svg"
    }
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
    
    static Filter(valueId) {
        return _FiltersValues[valueId].filter
    }

    static Name(valueId) {
        return _FiltersValues[valueId].name
    }

    static Icon(valueId) {
        return _FiltersValues[valueId].icon
    }
}