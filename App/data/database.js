var fs = require('fs');

class DB {
    
    static Datasets = null;

    static init() {
        if(! DB.Datasets) {
            DB.Datasets = JSON.parse(fs.readFileSync('./data/sample.json', 'utf8')).dataset;
        }
    }

    static query(filters) {
        DB.init();

        let result = [];

        if(Object.keys(filters).length === 0)
            result = DB.Datasets;
        else
        {
            DB.filter(filters, (dataset) => {
                result.push(dataset);
            });
        }       
        
        return result;
    }

    static count(filters) {
        DB.init();
        
        let count = 0;
        if(Object.keys(filters).length === 0)
            count = DB.Datasets.length;
        else
        {
            DB.filter(filters, () => {
                count++;
            });
        }
        return count;
    }
    
    static filter(filters, callback) {
        DB.Datasets.forEach(dataset => {
            
            let matchTheme = !filters.theme || dataset.theme.find(x => x.toLowerCase() === filters.theme);
            let matchSource = !filters.source || dataset.publisher.name.toLowerCase() === filters.source;
            let matchParameter = !filters.parameter || dataset.parameter?.find(x => x.toLowerCase() === filters.parameter);
            
            let matchAudience = true;
            if(filters.audience)
            {
                let predicate = filters.speciality 
                ? (x => x.field.toLowerCase() === filters.audience && x.speciality.toLowerCase() === filters.speciality) 
                : (x => x.field.toLowerCase() === filters.audience);

                matchAudience = undefined !== dataset.audience.find(predicate);
            } 

            let matchFormat = !filters.format || dataset.distribution?.find(x => (x.mediaType === filters.format));

            let matchLanguage = true;
            if(filters.languageType)
            {
                let predicate = filters.language 
                ? (x => x.type.toLowerCase() === filters.languageType && x.name.toLowerCase() === filters.language) 
                : (x => x.type.toLowerCase() === filters.languageType);

                matchLanguage = undefined !== dataset.language.find(predicate);
            } 
            
            if( matchTheme && matchSource && matchParameter && matchAudience && matchFormat && matchLanguage) 
            {
                callback(dataset);
            }                        
        });
    }
}

exports.db = DB;