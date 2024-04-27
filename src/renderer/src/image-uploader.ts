export const setupImageUploader = () => {
  const uploadInput = document.getElementById('imageUpload') as HTMLInputElement
  const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement
  const canvasContainer = document.querySelector('.canvas-container') as HTMLElement


  let drawImage

  // 当图片被选择时触发的事件
  uploadInput.addEventListener('change', function (event: Event) {

    if (uploadInput.files && uploadInput.files[0]) {
      const reader = new FileReader()

      // 将图片文件转换为DataURL
      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target?.result) {
          const img = new Image()

          // 一旦图片加载完成，就将其绘制到canvas上
          drawImage = function () {
            // 计算图片缩放比例
            const containerRect = canvasContainer.getBoundingClientRect()
            const imgRatio = img.width / img.height
            const containerRatio = containerRect.width / containerRect.height
            let scaleFactor = 1

            // 确定缩放比例
            if (imgRatio > containerRatio) {
              scaleFactor = containerRect.width / img.width
            } else {
              scaleFactor = containerRect.height / img.height
            }

            // 设置canvas尺寸并绘制图片
            canvas.width = img.width * scaleFactor
            canvas.height = img.height * scaleFactor
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
          }

          img.onload = drawImage
          // 开始加载图片
          img.src = e.target?.result as string
        }
      }

      // 读取图片文件
      reader.readAsDataURL(uploadInput.files[0])
    }
  })

  // 确保canvas尺寸与容器一致
  window.addEventListener('resize', function() {
    const containerRect = canvasContainer.getBoundingClientRect()
    canvas.width = containerRect.width
    canvas.height = containerRect.height
    drawImage()
  })
}