const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'da6qm74to', 
    api_key: '799818611612895', 
    api_secret: 'QqGlLivCRPIHl6G-E25cA0PJn90'
  })


const uploadImage = async (data) => {
    const uploadResult = await cloudinary.uploader.upload(
      'https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-9.jpg', // change to dynamic data
      {
        folder: 'pizzas-images'
      }
    )

    return uploadResult
}

const findFile = async (folderName) => {
    const file = await cloudinary.search.expression(`folder:${folderName}`).execute()

    return file
}

module.exports = {
    uploadImage,
    findFile
}
