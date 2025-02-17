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
                    console.log("Fetched text:", data); // Debugging line
                    Typer.text = Typer.convertToHTML(data.trim()); // Convert raw text to HTML
                    Typer.write(Typer.text); // Immediately write content instead of simulating typing
                })
                .catch(error => console.error("Error loading file:", error));
        },

        content: function () {
            return document.getElementById("console").innerHTML;
        },

        write: function (str) {
            document.getElementById("console").innerHTML = str;
        },

        convertToHTML: function (text) {
            return text
                .replace(/\n/g, "<br/>") // Convert new lines to <br/>
                .replace(/\s{2,}/g, "&nbsp;&nbsp;"); // Preserve spaces for formatting
        }
    };

    Typer.init();
});
