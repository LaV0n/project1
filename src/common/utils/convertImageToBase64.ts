export const convertImageToBase64 =
   (file: File, helpers: { errorHandler: (error: string) => void, successHandler: (image: string) => void }) => {
      const regEx = /\.(jpe?g|png|gif|bmp|svg)$/i
      if (regEx.test(file.name)) {
         if (file.size < 4000000) {
            const reader = new FileReader()
            const img = new Image()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
               img.src = reader.result as string
               img.onload = () => {
                  helpers.successHandler(reader.result as string)
               }
               img.onerror = () => {
                  helpers.errorHandler(`your picture doesn't fit`)
               }
            }
         } else {
            helpers.errorHandler('image is too large')
         }
      } else {
         helpers.errorHandler(`your picture doesn't fit`)
      }
   }