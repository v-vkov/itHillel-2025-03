
const menuService = require('./menu.service')

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

module.exports = {
    listMenu,
    renderMenu
}


