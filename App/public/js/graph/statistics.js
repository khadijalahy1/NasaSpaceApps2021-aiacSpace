class Statistics {

    static pathElm = document.getElementById("path");
    static countElm = document.getElementById("count");

    static setPath(path) {
        Statistics.pathElm.textContent = path;
    }

    static setCount(count) {
        Statistics.countElm.textContent = count;
    }
}