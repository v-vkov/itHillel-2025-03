
const menuService = require('./menu.service')

async function listMenu(req, res) {
    const menu = await menuService.list()

    return res.status(200).json(menu)
}

module.exports = {
    listMenu
}


