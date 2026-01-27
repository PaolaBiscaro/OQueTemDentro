async function extrairTextoImagem(imagemUrl) {
  const { data: { text } } = await Tesseract.recognize(
    imagemUrl,
    "por" //portugues
  )
  return text
}
