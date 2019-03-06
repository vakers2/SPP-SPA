const todoModel = require('../models/todos')
const userModel = require('../models/users')

async function getCards(_, args) {
  let user = await userModel.findById(args.userId).populate({
    path: 'cards',
    options: {
      sort: {
        'date': -1
      }
    }
  }).exec()
  return user.cards
}

async function createCard(_, args) {
  const { userId, ...card } = args.input
  const newCard = await todoModel.create(card)
  console.log(newCard)
  const user = await userModel.findById(userId).exec()
  user.cards.push(newCard)
  await user.save()

  return newCard
}

async function updateCard(_, args) {
  const { id, newStatus } = args
  await todoModel.findByIdAndUpdate(id, { status: newStatus }).exec()
}

async function removeCard(_, args) {
  const { id, userId } = args
  const user = await userModel.findById(userId).exec()
  user.cards.pull(id)
  await user.save()
  await todoModel.findByIdAndDelete(id)
}

module.exports = {
  getCards,
  createCard,
  updateCard,
  removeCard
}
