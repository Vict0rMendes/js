document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const fromCard = urlParams.get('fromcard');
    const backButton = document.createElement('button');
    const voltarText = document.createElement('h4');
    const buttonBackDiv = document.querySelector('.voltar');

    function buttonBack() {
        voltarText.innerText =  "Voltar para Exercícios: ";
        backButton.className = "btn btn-success";
        backButton.innerText = 'Voltar';
        backButton.onclick = function () {
            history.go(-1);
        };
        buttonBackDiv.appendChild(voltarText).appendChild(backButton);
    }

    if (fromCard) {
        buttonBack();
    }
});