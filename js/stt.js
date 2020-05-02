window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    const result = document.getElementById("result");
    const main = document.getElementsByTagName("main")[0];
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let listening = false;
    const recognition = new SpeechRecognition();
    const start = () => {
        recognition.start();
        button.textContent = "Stop listening!";
        main.classList.add("speaking");
    };
    const stop = () => {
        recognition.stop();
        button.textContent = "Start listening!";
        main.classList.remove("speaking");
    };
    const onResult = event => {
        // console.log(event);
        result.innerHTML = "";
        for (const res of event.results) {
            const text = document.createTextNode(res[0].transcript);
            const p = document.createElement("p");
            // check if finished speaking
            if (res.isFinal) {
                p.classList.add("final");
                // adds class to make text darker
            }
            p.appendChild(text);
            result.appendChild(p);
        }
    };
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);
    button.addEventListener("click", () => {
        listening ? stop() : start();
        listening = !listening;
    });

});