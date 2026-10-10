export function readImage(file, callback) {
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Selecione um arquivo de imagem.')
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    const image = new Image()

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const maxSize = 650
      const scale = Math.min(
        1,
        maxSize / Math.max(image.width, image.height)
      )

      canvas.width = Math.max(1, Math.round(image.width * scale))
      canvas.height = Math.max(1, Math.round(image.height * scale))

      const context = canvas.getContext('2d')

      if (!context) {
        alert('Não foi possível processar a imagem.')
        return
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      callback(canvas.toDataURL('image/jpeg', 0.75))
    }

    image.onerror = () => alert('Não foi possível abrir a imagem.')
    image.src = reader.result
  }

  reader.onerror = () => alert('Não foi possível ler o arquivo.')
  reader.readAsDataURL(file)
}
