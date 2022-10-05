// Função para baixar imagem gerada no Cropper com JS puro
async function downloadPhoto() {
    // pegando div do Cropper gerado
    var result = document.getElementById('result-crop').querySelectorAll('img')
    imageSrc = result[0].getAttribute("src")

    //Função de download
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'myPhoto' // nome da imagem pode ser personalizado aqui
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
