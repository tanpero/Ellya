import { setupImageUploader } from "./image-uploader"

function init(): void {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
  })
}

function doAThing(): void {
  setupImageUploader()
}

init()
