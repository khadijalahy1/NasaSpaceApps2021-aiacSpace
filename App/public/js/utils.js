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
}

class Cytoscape {
    static DoLayout(fit=true) {
        cy.layout({
          name: 'concentric',
          fit: fit,
          minNodeSpacing: 50,
          padding: 100,
          animate: true,
          animationDuration: 350,
          animationEasing: 'ease-in-out'
        }).run()
      }
}