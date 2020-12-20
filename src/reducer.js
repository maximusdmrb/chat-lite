export default (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        userName: action.payload.name,
        roomId: action.payload.roomId,
      };
    case 'ROOM:GET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
