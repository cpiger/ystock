

const actSearchStock = (query) => ({
  type: 'SEARCH_STOCK',
  query
});

const actAddStock = (stock) => ({
  type: 'ADD_STOCK',
  stock
});

const actDelStock = (id) => ({
  type: 'DEL_STOCK',
  id
});

export { actSearchStock, actAddTask, actDelTask };