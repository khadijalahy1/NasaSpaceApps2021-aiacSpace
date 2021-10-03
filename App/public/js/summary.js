class Summary {

    static pathElm = document.getElementById("path");
    static countElm = document.getElementById("count");

    static async update(node) 
    {
        Summary.pathElm.textContent = node.id;
        Summary.countElm.textContent = (await (fetch("/count"+node.query.slice(0, -1)).then(rep=>rep.json()))).count;
    }
}