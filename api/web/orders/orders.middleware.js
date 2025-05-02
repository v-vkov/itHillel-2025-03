function validateOrder(req, res, next) {
    const { items, total } = req.body

    if (!Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
        return res.status(400).json({ message: 'Invalid order data' })
    }

    next()
}

module.exports = {
    validateOrder
}
