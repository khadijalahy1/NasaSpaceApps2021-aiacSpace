class ColorUtils {
    static HexToRGBA(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }

    static LightenDarkenColor(col, amt) {

        var usePound = false;

        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }

        var num = parseInt(col, 16);

        var r = (num >> 16) + amt;

        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        var b = ((num >> 8) & 0x00FF) + amt;

        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        var g = (num & 0x0000FF) + amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

    }
}

// For stackoverflow question
console.log("You can help me with layout options here. Thanks!")

class Cytoscape {
    static DoLayout(node, name = 'cose') {
        if (name === 'fcose') {
            setTimeout(() => {
                cy.layout({
                    name: 'fcose',
                    // 'draft', 'default' or 'proof' 
                    // - "draft" only applies spectral layout 
                    // - "default" improves the quality with incremental layout (fast cooling rate)
                    // - "proof" improves the quality with incremental layout (slow cooling rate) 
                    quality: "proof",
                    // Use random node positions at beginning of layout
                    // if this is set to false, then quality option must be "proof"
                    randomize: false,

                    fit: false,
                    nodeRepulsion: function (node) { return 99999; },
                    componentSpacing: 10000,
                    padding: 100,
                    uniformNodeDimension: false,

                    animate: true,
                    animationDuration: 250,
                    animationEasing: undefined,
                    /* layout event callbacks */
                    ready: () => { console.log("start") }, // on layoutready
                    stop: () => { console.log("done"); } // on layoutstop
                }).run();
            }, 50);
        }
        else {
            setTimeout(() => {
                cy.layout({
                    name: 'cose',
                    fit: false,
                    nodeRepulsion: function (node) { return 99999; },
                    componentSpacing: 100,
                    padding: 100,
                    randomize: false,
                    animate: 'end',
                    animationEasing: 'ease-in-out',
                    animationDuration: 350,
                    stop: () => {
                        setTimeout(() => {
                            cy.zoom(.8)
                            cy.center(node);
                        }, 100);
                    }
                })
                    .run();

            }, 50);
        }
    }
}