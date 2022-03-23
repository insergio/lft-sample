export function updateUserStore(user) {
    return {
      type: 'UPDATE_CURRENT_STOCK',
      payload: user
    };
  }