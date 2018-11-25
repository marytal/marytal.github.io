var randomPrice = function() {
  var price = '$0.' + add_padding(Math.floor(Math.random() * 99) + 1);
  return price;
}

function add_padding(n) {
    return (n < 10) ? ("0" + n) : n;
}

function activate() {
  var prices = /[$](\.|\,|\d+)+/g;
  doc_body = document.body;
  doc_body.innerHTML = doc_body.innerHTML.replace(prices,randomPrice);
}

activate()

// hi