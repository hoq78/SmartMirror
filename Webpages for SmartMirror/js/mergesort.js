function mergeSort(items) {
    if (items.length < 2) {
        return items;
    }

    middle = parseInt(items.length / 2);
    left = items.slice(0, middle);
    right = items.slice(middle, items.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0][0] >= right[0][0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }
    return result;
}
