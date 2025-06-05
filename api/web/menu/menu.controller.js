
const menuService = require('./menu.service')

const cloudinaryUtil = require('../../../utils/cloudinary.util')

async function listMenu(req, res) {
    const menu = await menuService.list()

    return res.status(200).json({
        data: menu
    })
}

async function renderMenu (req, res) {
    try {
        const menu = await menuService.list()
        return res.render('pizzas', {pizzas: menu})
    } catch (err) {
        return res.status(500).json({error: err && err.message})
    }  
}

async function uploadFile (req, res) {
    try {
        const type = req.params.type

        if (type === 'image') {
            const upload = await cloudinaryUtil.uploadImage()

            const file = await cloudinaryUtil.findFile('pizzas-images')
            console.log('file', file)
            return res.status(200).json(upload)
        }
        return res.status(200).json([])
    } catch (err) {
        return res.status(500).json({error: err && err.message})
    }  
}

module.exports = {
    listMenu,
    renderMenu,
    uploadFile
}


