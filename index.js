document.addEventListener("DOMContentLoaded", function () {
    var Typer = {
        text: '',
        index: 0,
        speed: 50,
        file: 'data.html', // Load renamed file
        cursor: '<span id="cursor">_</span>',

        init: function () {
            let consoleDiv = document.getElementById("console");
            consoleDiv.innerHTML = "<p>Loading...</p>";

            setTimeout(() => {
                fetch(Typer.file)
                    .then(response => response.text())
                    .then(data => {
                        console.log("Fetched raw text:", data); // Debugging output
                        Typer.text = data.trim();
                        consoleDiv.innerHTML = '';
                        Typer.startTyping();
                    })
                    .catch(error => console.error("Error loading file:", error));
            }, 2000);
        },

        content: function () {
            return document.getElementById("console").innerHTML;
        },

        write: function (str) {
            document.getElementById("console").innerHTML = str + Typer.cursor;
        },

        addText: function () {
            if (Typer.index < Typer.text.length) {
                let char = Typer.text.charAt(Typer.index);
                Typer.index++;

                if (char === "\n") {
                    char = "<br/>";
                }

                let currentText = Typer.content().replace(Typer.cursor, "");
                Typer.write(currentText + char);

                setTimeout(Typer.addText, Typer.speed);
            } else {
                document.getElementById("cursor").remove();
            }
        },

        startTyping: function () {
            setTimeout(Typer.addText, Typer.speed);
        }
    };

    Typer.init();
});
