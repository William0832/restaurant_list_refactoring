const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const sortList = [
  {
    id: 0,
    name: 'A-Z',
    type: 'name',
    value: 'asc',
    isUsed: false
  },
  {
    id: 1,
    name: 'Z-A',
    type: 'name',
    value: 'desc',
    isUsed: false
  },
  {
    id: 2,
    name: '類別',
    type: 'category',
    value: 'asc',
    isUsed: false
  },
  {
    id: 3,
    name: '地區',
    type: 'location',
    value: 'asc',
    isUsed: false
  },
  {
    id: 4,
    name: '評分-升冪',
    type: 'rating',
    value: 'asc',
    isUsed: false
  },
  {
    id: 5,
    name: '評分-降冪',
    type: 'rating',
    value: 'desc',
    isUsed: false
  }
]

// setting route
router.get('/', (req, res) => {
  // 存入keyword
  const keyword = req.query.keyword
  // 存入sort 類型
  const sortId = req.query.sortId
  const sort = sortList[Number(sortId)]
  sort.isUsed = true
  const sortOption = { [sort.type]: [sort.value] }
  // 篩選資料
  Restaurant.find()
    .sort(sortOption)
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      // 搜尋篩選
      if (keyword) {
        restaurants = restaurants.filter(
          item =>
            item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.category.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return res.render('index', { sortId, sortList, keyword, restaurants })
    })
})
module.exports = router
