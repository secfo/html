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
                if (char === "\n") {
                    char = "<br/>";
                }
                Typer.write(char);
                setTimeout(Typer.addText, Typer.speed);
            }
        },

        startTyping: function () {
            setTimeout(Typer.addText, Typer.speed);
        }
    };

    Typer.init();
});
