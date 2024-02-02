export function unpack(state) {
  return state.map(x => {
    if (x.status === 'packed') {
      return {...x, status: 'unpacked'};
    }
    return x
  });
}

export function reset(state) {
  return state.map(x => {
    return {...x, status: 'unpacked'};
  });
}

export function updateStatus(state, itemId, status) {
  return state.map(x => {
    if (x.id === itemId) {
      return {...x, status: status};
    } else {
      return x;
    }
  });
}

export function updateName(state, itemId, name) {
  return state.map(x => {
    if (x.id === itemId) {
      return {...x, name: name};
    } else {
      return x;
    }
  });
}

export function addItem(state) {
  return state.concat({
    id: state.length + 1,
    name: 'New Item',
    status: 'unpacked',
  })
}

export function deleteItem(state, itemId) {
  return state.filter(x => {
    return x.id !== itemId;
  })
}
