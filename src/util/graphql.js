import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_ITEMS_QUERY = gql`
  {
    getItems {
      id
      name
      stock
      price
      condition
      createdAt
      weight
      category
      description
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityId
          cityName
        }
        seller {
          id
          username
        }
      }
    }
  }
`;

export const SEARCH_ITEMS_QUERY = gql`
  query (
    $keyword: String!
    $category: String!
    $condition: String!
    $city: String!
    $minPrice: Int!
    $maxPrice: Int!
  ) {
    searchItems(
      searchItemInput: {
        keyword: $keyword
        category: $category
        city: $city
        condition: $condition
        minPrice: $minPrice
        maxPrice: $maxPrice
      }
    ) {
      id
      name
      price
      createdAt
      description
      condition
      images {
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityId
          cityName
        }
        seller {
          id
          username
        }
      }
    }
  }
`;

export const FETCH_SINGLE_ITEM_QUERY = gql`
  query ($itemId: ID!) {
    getItem(itemId: $itemId) {
      id
      name
      price
      stock
      weight
      createdAt
      description
      condition
      category
      dimension {
        length
        width
        height
      }
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        seller {
          id
          username
        }
      }
    }
  }
`;

export const FETCH_ITEM_QUERY = gql`
  query ($itemId: ID!, $itemUserId: ID!, $currentUserId: ID!) {
    getItem(itemId: $itemId) {
      id
      name
      price
      stock
      weight
      createdAt
      description
      condition
      category
      dimension {
        length
        width
        height
      }
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityId
          cityName
        }
        seller {
          id
          username
          avatar
        }
      }
    }

    getItemReviews(itemId: $itemId) {
      id
      score
      body
      user {
        id
        email
        buyer {
          id
          name
          avatar
        }
      }
      item {
        id
        name
      }
      images {
        downloadUrl
      }
      createdAt
    }

    isChatExists(itemUserId: $itemUserId, currentUserId: $currentUserId) {
      _id
      lastText
    }
  }
`;

export const FETCH_ITEM_REVIEWS = gql`
  query ($itemId: ID!) {
    getItemReviews(itemId: $itemId) {
      id
      score
      body
      user {
        id
        email
        buyer {
          id
          name
          avatar
        }
      }
      item {
        id
        name
      }
      images {
        downloadUrl
      }
      createdAt
    }
  }
`;

export const FETCH_CART_QUERY = gql`
  query ($itemId: ID!) {
    getUserCartItem(itemId: $itemId) {
      id
      createdAt
      amountItem
      item {
        user {
          id
          email
          phone
          seller {
            id
            username
          }
        }
      }
      isChecked
    }
  }
`;

export const FETCH_BOOKMARKS_QUERY = gql`
  {
    getBookmarks {
      id
      name
      price
      createdAt
      description

      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityName
        }
        seller {
          id
          username
        }
      }
    }
  }
`;

export const FETCH_USER_CART_QUERY = gql`
  {
    getUserCartItems {
      id
      item {
        id
        name
        price
        stock
        category
        condition
        weight
        images {
          id
          downloadUrl
        }
        user {
          id
          seller {
            id
            username
          }
        }
      }
      user {
        id
        email
        phone
        address {
          cityId
          cityName
          postalCode
          detail
        }
        buyer {
          id
          name
        }
        seller {
          id
          username
        }
      }
      note
      isChecked
      amountItem
      createdAt
    }
  }
`;

export const FETCH_USER_CART_CHECKOUT_QUERY = gql`
  query ($userId: ID!) {
    getUserCartItemsCheckout {
      id
      item {
        id
        weight
        name
        price
        category
        condition
        stock
        images {
          id
          downloadUrl
        }
        user {
          id
          seller {
            id
            username
          }
          address {
            cityName
            cityId
            district
            postalCode
            detail
          }
        }
      }
      user {
        id
        email
        phone
        address {
          cityId
          cityName
          postalCode
          detail
        }
        buyer {
          id
          name
        }
        seller {
          id
          username
        }
      }
      note
      isChecked
      amountItem
      createdAt
    }
    getUser(userId: $userId) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      buyer {
        id
        name
      }
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem(
    $name: String!
    $price: Int!
    $stock: Int!
    $category: String!
    $condition: String!
    $weight: Int!
    $description: String!
    $length: Int!
    $width: Int!
    $height: Int!
    $images: [ImageInput]!
  ) {
    addItem(
      addItemInput: {
        name: $name
        price: $price
        stock: $stock
        category: $category
        condition: $condition
        weight: $weight
        description: $description
        dimension: { length: $length, width: $width, height: $height }
        images: $images
      }
    ) {
      id
      name
      price
      stock
      category
      condition
      weight
      description
      dimension {
        length
        width
        height
      }
      images {
        id
        downloadUrl
      }
      createdAt
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation addCartItem(
    $itemId: ID!
    $amountItem: Int!
    $isChecked: Boolean!
    $note: String!
  ) {
    addCartItem(
      itemId: $itemId
      note: $note
      amountItem: $amountItem
      isChecked: $isChecked
    ) {
      note
      amountItem
      createdAt
      isChecked
    }
  }
`;

export const EDIT_CART_MUTATION = gql`
  mutation editCartItem(
    $itemId: ID!
    $amountItem: Int!
    $isChecked: Boolean!
    $note: String!
  ) {
    editCartItem(
      itemId: $itemId
      note: $note
      amountItem: $amountItem
      isChecked: $isChecked
    ) {
      note
      amountItem
      createdAt
      isChecked
    }
  }
`;

export const EDIT_CHECKED_MUTATION = gql`
  mutation updateCheckCart($itemIds: [ID]!, $isChecked: Boolean!) {
    updateCheckCart(checkedCart: { itemIds: $itemIds, isChecked: $isChecked })
  }
`;

export const FETCH_CHATS_QUERY = gql`
  {
    getChats {
      id
      users {
        id
        seller {
          id
          username
        }
      }
      lastText
    }
  }
`;

export const FETCH_CHAT_MESSAGES_QUERY = gql`
  query ($chatId: ID!) {
    getMessages(chatId: $chatId) {
      id
      content
      sentAt
      user
      item {
        id
        name
        price
        image
      }
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription ($chatId: ID!) {
    newMessage(chatId: $chatId) {
      id
      content
      sentAt
      user
      item {
        id
        name
        price
        image
      }
    }
  }
`;


export const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $receiverUserId: ID!, $content: String!) {
    addMessage(
      messageInput: {
        chatId: $chatId
        receiverUserId: $receiverUserId
        content: $content
      }
    ) {
      id
      user
      content
      images {
        id
        downloadUrl
      }
      sentAt
    }
  }
`;

export const FETCH_CITIES_QUERY = gql`
  {
    getCities {
      city_id
      province_id
      province
      type
      city_name
      postal_code
    }
  }
`;

export const FETCH_COST_COURIER_QUERY = gql`
  query (
    $origin: String!
    $destination: String!
    $weight: Int!
    $courier: String!
  ) {
    getCosts(
      costInput: {
        origin: $origin
        destination: $destination
        weight: $weight
        courier: $courier
      }
    ) {
      code
      name
      costs {
        service
        description
        cost {
          value
          etd
          note
        }
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder(
    $items: [OrderItemInput]!
    $state: String!
    $sellerUsername: String!
    $shipping: OrderShippingInput!
    $cartItemIds: [ID]!
  ) {
    addOrder(
      addOrderInput: {
        items: $items
        state: { stateType: $state }
        shipping: $shipping
        sellerUsername: $sellerUsername
      }
      cartItemIds: $cartItemIds
    ) {
      id
      state {
        stateType
        createdAt
        deadline
      }
      shipping {
        courierName
      }
    }
  }
`;
export const UPDATE_ORDER = gql`
  mutation updateOrder($orderId: ID!, $state: String!) {
    updateOrder(
      oderId: $orderId
      updateOrderInput: { state: { stateType: $state } }
    ) {
      id
      state {
        stateType
        createdAt
        deadline
      }
      logs {
        stateType
        succsededAt
        executedAt
      }
    }
  }
`;

export const CHANGE_ORDER_STATE_MUTATION = gql`
  mutation updateOrder {
    updateOrder(
      oderId: "6063dd4a057f5e15784a5742"
      updateOrderInput: { state: { stateType: "PROCESSED" } }
    ) {
      id
      state {
        stateType
        createdAt
        deadline
      }
      logs {
        stateType
        succsededAt
        executedAt
      }
    }
  }
`;
export const ADD_AWB_NUMBER = gql`
  mutation addAwbNumber(
    $orderId: ID!
    $awbNumber: String!
    $courierName: String!
    $buyerAddress: String!
    $shippingCost: Int!
  ) {
    addAwbNumber(
      orderId: $orderId
      awbNumber: $awbNumber
      courierName: $courierName
      buyerAddress: $buyerAddress
      shippingCost: $shippingCost
    ) {
      id
      state {
        stateType
        createdAt
        deadline
      }
      logs {
        stateType
        succsededAt
        executedAt
      }
    }
  }
`;

export const FETCH_USER_ORDER_QUERY = gql`
  {
    getUserOrders {
      id
      items {
        id
        name
        images {
          downloadUrl
        }
        price
        weight
        amountItem
        note
      }
      user {
        buyer {
          id
          name
        }
      }
      seller {
        username
      }
      state {
        stateType
        createdAt
        deadline
      }
      logs {
        stateType
        succsededAt
        executedAt
      }
      shipping {
        awbNumber
        courierName
        buyerAddress
        shippingCost
      }
    }
  }
`;

export const FETCH_SELLER_ORDER_QUERY = gql`
  query ($username: String!) {
    getSellerOrders(username: $username) {
      id
      items {
        id
        name
        price
        weight
        images {
          downloadUrl
        }
        amountItem
        note
      }
      seller {
        username
      }
      user {
        buyer {
          id
          name
          avatar
        }
      }
      shipping {
        awbNumber
        courierName
        buyerAddress
        shippingCost
      }
      state {
        stateType
        createdAt
      }
      logs {
        succsededAt
        stateType
        executedAt
      }
    }
  }
`;
export const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      buyer {
        id
        name
        birthDate
        avatar
      }
      seller {
        id
        username
        createdAt
        description
        avatar
      }
    }
    getCities {
      city_id
      province_id
      province
      type
      city_name
      postal_code
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateUserProfile(
    $avatar: String!
    $name: String!
    $email: String!
    $phone: String!
    $birthDate: String!
    $cityName: String!
    $cityId: String!
    $district: String!
    $postalCode: String!
    $detail: String!
  ) {
    updateUserProfile(
      userProfileInput: {
        avatar: $avatar
        name: $name
        email: $email
        phone: $phone
        birthDate: $birthDate
        address: {
          cityName: $cityName
          cityId: $cityId
          district: $district
          postalCode: $postalCode
          detail: $detail
        }
      }
    ) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      token
      buyer {
        id
        name
        birthDate
        avatar
      }
    }
  }
`;

export const FETCH_ITEM_SELLER_QUERY = gql`
  query ($userId: ID!) {
    getSellerItems(userId: $userId) {
      id
      name
      price
      condition
      category
      createdAt
      description
      weight
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityId
          cityName
        }
        seller {
          id
          username
        }
      }
    }
  }
`;

export const BOOKMARK_ITEM_MUTATION = gql`
  mutation bookmarkItem($itemId: ID!) {
    bookmarkItem(itemId: $itemId) {
      id
      bookmarkedBy {
        id
        userId
        createdAt
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($itemId: ID!) {
    deleteItem(itemId: $itemId)
  }
`;

export const UPDATE_SELLER_PROFILE_MUTATION = gql`
  mutation updateSellerProfile(
    $username: String!
    $avatar: String!
    $description: String!
  ) {
    updateSellerProfile(
      sellerProfileInput: {
        username: $username
        avatar: $avatar
        description: $description
      }
    ) {
      id
      token
      seller {
        id
        username
        avatar
        description
        createdAt
      }
    }
  }
`;

export const DELETE_CART_ITEM_MUTATION = gql`
  mutation deleteCartItem($cartId: ID!) {
    deleteCartItem(cartId: $cartId)
  }
`;

export const ADD_REVIEW_MUTATION = gql`
  mutation addReview(
    $score: Int!
    $body: String!
    $itemId: ID!
    $images: [ImageInput]!
  ) {
    addReview(
      addReviewInput: {
        score: $score
        body: $body
        itemId: $itemId
        images: $images
      }
    ) {
      id
      images {
        id
        downloadUrl
      }
      score
      body
      createdAt
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem(
    $name: String!
    $price: Int!
    $stock: Int!
    $category: String!
    $condition: String!
    $weight: Int!
    $description: String!
    $length: Int!
    $width: Int!
    $height: Int!
    $itemId: ID!
    $images: [ImageInput]!
  ) {
    updateItem(
      itemId: $itemId
      addItemInput: {
        name: $name
        price: $price
        stock: $stock
        category: $category
        condition: $condition
        weight: $weight
        description: $description
        dimension: { length: $length, width: $width, height: $height }
        images: $images
      }
    ) {
      id
      name
      price
      stock
      category
      condition
      weight
      description
      dimension {
        length
        width
        height
      }
      images {
        id
        downloadUrl
      }
      createdAt
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        seller {
          username
          avatar
          description
          createdAt
          id
        }
      }
    }
  }
`;

export const CREATE_PAYMENT_QUERY = gql`
  query makePayment($createPaymentInput: CreatePaymentInput) {
    createPayment(createPaymentInput: $createPaymentInput) {
      token
      redirect_url
      orderId
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      buyer {
        id
        name
      }
      seller {
        id
        username
      }
      token
    }
  }
`;
export const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
    }
  }
`;
