function isSubsetSum(set, n, sum, root = null) {
  let node;
  AnimationStack.insertStack(`isSubset(set, ${n}, ${sum})`);

  if (sum === 0) {
    node = insertNode(sum, root);
    insertNewNode(node);
    node.isSub = true;
    editData(node, node.isSub);
    AnimationStack.removeStack(true);
    return;
  }

  if (n === 0) {
    node = insertNode(sum, root);
    insertNewNode(node);
    node.isSub = false;
    editData(node, node.isSub);
    AnimationStack.removeStack(true);
    return;
  }

  if (set[n - 1] > sum) {
    AnimationStack.removeStack(true);
    return isSubsetSum(set, n - 1, sum, root);
  }

  node = insertNode(sum, root);
  insertNewNode(node);

  isSubsetSum(set, n - 1, sum - set[n - 1], node);
  if (!node.left.isSub) isSubsetSum(set, n - 1, sum, node);

  let left, right;
  if (node.left !== null) {
    left = node.left.isSub;
    deleteNode(node.left);
  }
  if (node.right !== null) {
    right = node.right.isSub;
    deleteNode(node.right);
  }

  node.isSub = left || right;
  editData(node, node.isSub);

  AnimationStack.removeStack();
  return;
}
