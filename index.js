document.addEventListener("DOMContentLoaded", function () {
    var Typer = {
        text: '',
        index: 0,
        speed: 50,
        file: 'index.txt',
        cursor: '<span id="cursor">_</span>', // Blinking Cursor

        init: function () {
            document.getElementById("console").innerHTML = "<p>Loading...</p>"; // Show "Loading..."
            
            setTimeout(() => {
                fetch(Typer.file)
                    .then(response => response.text())
                    .then(data => {
                        Typer.text = Typer.convertToHTML(data.trim()); // Convert text to HTML
                        document.getElementById("console").innerHTML = ''; // Clear "Loading..."
                        Typer.startTyping();
                    })
                    .catch(error => console.error("Error loading file:", error));
            }, 2000); // Wait 2 seconds before starting
        },

        content: function () {
            return document.getElementById("console").innerHTML;
        },

        write: function (str) {
            document.getElementById("console").innerHTML = str + Typer.cursor; // Add cursor
        },

        addText: function () {
            if (Typer.index < Typer.text.length) {
                let char = Typer.text.charAt(Typer.index);
                Typer.index++;

                Typer.write(Typer.text.substring(0, Typer.index)); // Write text dynamically
                setTimeout(Typer.addText, Typer.speed);
            }
        },

        startTyping: function () {
            setTimeout(Typer.addText, Typer.speed);
        },

        convertToHTML: function (text) {
            return text.replace(/\n/g, "<br/>"); // Convert newlines to <br/>
        }
    };

    Typer.init();
});
