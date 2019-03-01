const gql = {
  GQL_ENDPOINT: 'http://localhost:4000/graphql',
  GET_CARDS: `query ($userId: String!) {
    getCards(userId: $userId) {
      _id
      name
      date
      description
      progress
    }
  }`,
  POST_CARD: `mutation ($userId: String!, $name: String!, $description: String, $progress: String!, $date: String) {
    createCard(input: {userId: $userId, name: $name, description: $description, progress: $progress, date: $date}) {
      _id
      name
      description
      progress
      date
    }
  }
  `,
  UPDATE_CARD: `mutation ($id: String!, $newProgress: String!) {
    updateCard(id: $id, newProgress: $newProgress)
  }
  `,
  DELETE_CARD: `mutation ($id: String!, $userId: String!) {
    removeCard(id: $id, userId: $userId)
  }`
}

export {
  gql
}
