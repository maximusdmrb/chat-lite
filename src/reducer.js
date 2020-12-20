export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        userName: action.payload.name,
        roomId: action.payload.roomId,
      };
    case 'ROOM:GET_DATA':
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };
    case 'ROOM:GET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'GET_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};
