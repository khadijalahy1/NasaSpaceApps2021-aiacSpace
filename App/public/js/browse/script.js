function parseQueryString() {
    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
            objURL[$1] = $3;
        }
    );
    return objURL;
};

(function init() {
    const query = parseQueryString();

    const cont = document.getElementById("container");
    
    fetch("/query" + window.location.search).then((rep) => rep.json()).then((json) => {
    
        title.textContent = "Datasets (" + json.dataset.length + ")";
    
        const any = (str) => { return str ? str : "-" };
    
        document.getElementById("theme").textContent = any(query.theme);
        document.getElementById("source").textContent = any(query.source);
        document.getElementById("parameter").textContent = any(query.parameter);
        document.getElementById("audience").textContent = any(query.audience);
        document.getElementById("speciality").textContent = any(query.speciality);
        document.getElementById("format").textContent = any(query.format);
        document.getElementById("languageType").textContent = any(query.languageType);
        document.getElementById("language").textContent = any(query.language);
    
        json.dataset.forEach(dataset => {
            let elm = document.createElement("div");
            elm.className = "dataset";
    
            let title = document.createElement("a");
            title.className = "title";
            title.href = dataset.landingPage;
            title.textContent = dataset.title;
    
            let desc = document.createElement("span");
            desc.className = "desc";
            desc.textContent = dataset.description;
    
            elm.appendChild(title);
            elm.appendChild(desc);
    
            cont.appendChild(elm);
        });
    })
})();

