function queue() {
  const items = [];
  return {
    enqueue(n) {
      items.push(n);
    },
    dequeue() {
      return items.shift();
    },
  };
}

export default queue;
