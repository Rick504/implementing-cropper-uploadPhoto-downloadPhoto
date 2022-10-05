// Funções do Cropper
function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
}

    window.addEventListener('DOMContentLoaded', async function () {

        // chamada da função que cria img base64, precisei deixar a função fetch async
        // e a instancia do Cropper

        await fetch('./mock.json')
            .then(res => res.json())
            .then(res => { createImgInit(res) })

        var image = document.getElementById('image-cropper');
        var button = document.getElementById('button');
        var result = document.getElementById('result-crop');
        var croppable = false;
        var cropper = await new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            ready: function () {
                croppable = true;
            },
    });

    document.getElementById('generate-crop').onclick = function () {
        var croppedCanvas;
        var roundedCanvas;
        var roundedImage;

        if (!croppable) {
        return;
        }

        // Crop
        croppedCanvas = cropper.getCroppedCanvas();

        // Round
        roundedCanvas = getRoundedCanvas(croppedCanvas);

        // Show
        roundedImage = document.createElement('img');
        roundedImage.src = roundedCanvas.toDataURL()
        result.innerHTML = '';
        result.appendChild(roundedImage);
    };

     // Função de trocar imagem com onclick
    document.getElementById('change-image-cropper').onclick = function () {
        // aqui poderia chamar a função de carregar a imagem e colocar no replace
        cropper.replace('./exemploTroca.png');
    };

});
