document.addEventListener("DOMContentLoaded", function () {
    var Typer = {
        text: '',
        index: 0,
        speed: 50,
        file: 'index.txt',

        init: function () {
            fetch(Typer.file)
                .then(response => response.text()) 
                .then(data => {
                    Typer.text = data.trim();
                    Typer.text = Typer.convertToHTML(Typer.text); // Convert raw text to HTML
                    Typer.startTyping();
                })
                .catch(error => console.error("Error loading file:", error));
        },

        content: function () {
            return document.getElementById("console").innerHTML;
        },

        write: function (str) {
            document.getElementById("console").innerHTML += str;
        },

        addText: function () {
            if (Typer.index < Typer.text.length) {
                let char = Typer.text.charAt(Typer.index);
                Typer.index++;

                Typer.write(char);
                setTimeout(Typer.addText, Typer.speed);
            }
        },

        startTyping: function () {
            setTimeout(Typer.addText, Typer.speed);
        },

        convertToHTML: function (text) {
            return text.replace(/\n/g, "<br/>"); // Convert new lines to HTML
        }
    };

    Typer.init();
});
