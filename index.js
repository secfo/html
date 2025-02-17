document.addEventListener("DOMContentLoaded", function () {
    var Typer = {
        text: '',
        index: 0,
        speed: 50,
        file: 'index.txt',
        cursor: '<span id="cursor">_</span>', // Blinking cursor

        init: function () {
            let consoleDiv = document.getElementById("console");
            consoleDiv.innerHTML = "<p>Loading...</p>"; // Show "Loading..."

            setTimeout(() => {
                fetch(Typer.file)
                    .then(response => response.text())
                    .then(data => {
                        console.log("Fetched raw text:", data); // Debugging
                        Typer.text = Typer.decodeHtmlEntities(data.trim());
                        consoleDiv.innerHTML = ''; // Clear "Loading..."
                        Typer.startTyping();
                    })
                    .catch(error => console.error("Error loading file:", error));
            }, 2000); // Show "Loading..." for 2 seconds
        },

        decodeHtmlEntities: function (str) {
            let txt = document.createElement("textarea");
            txt.innerHTML = str;
            return txt.value;
        },

        content: function () {
            return document.getElementById("console").innerHTML;
        },

        write: function (str) {
            document.getElementById("console").innerHTML = str + Typer.cursor; // Keep cursor at the end
        },

        addText: function () {
            if (Typer.index < Typer.text.length) {
                let char = Typer.text.charAt(Typer.index);
                Typer.index++;

                if (char === "\n") {
                    char = "<br/>"; // Convert newlines to <br/>
                }

                let currentText = Typer.content().replace(Typer.cursor, ""); // Remove old cursor
                Typer.write(currentText + char); // Write new character

                setTimeout(Typer.addText, Typer.speed);
            } else {
                document.getElementById("cursor").remove(); // Remove cursor after typing is done
            }
        },

        startTyping: function () {
            setTimeout(Typer.addText, Typer.speed);
        }
    };

    Typer.init();
});
