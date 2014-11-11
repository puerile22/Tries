// Defines the node object
var Node = function(options) {
  this.value = {
    letter:options,
    word:false
  };
  this.children = {};
};

var Trie = function() {
  this.head = new Node();
  var head = this.head;
  var result;
  // Inserts string into the Trie.
  this.insert = function(string) {
    this.insertHelper(string);
    if (result.status) {
      this.findLastNode(string);
      result.value.word = true;
    } else {
      this._insert(result.node,result.string);
    }
  };

  // Recursive function. Helper function for the insert function.
  this._insert = function(parent, string) {
    var node = new Node(string[0]);
    string = string.slice(1);
    if (string) {
      parent.children[node.value.letter] = node;
      this._insert(node,string);
    } else {
      node.value.word = true;
      parent.children[node.value.letter] = node;
    }
  };
  this.insertHelper = function(string) {
    this._includes(head, string);
  }

  // Returns true if string is in the trie. Returns false otherwise.
  this.includes = function(string) {
    this._includes(head, string);
    if (result.status && result.node.value.word) {
      return true;
    } else {
      return false;
    }
  };

  // Recursive function. Returns true if string is in the trie. Returns false
  // otherwise.
  this._includes = function(parent, string) {
    var children = parent.children;
    if (!string) {
      result = {node: parent, status: true};
      return;
    } else if (this.isEmpty(children)) {
      result = {node: parent, string: string};
      return;
    }
    if (children[string[0]]) {
      this._includes(children[string[0]], string.slice(1));
    } else {
      result = {node:parent, string: string};
      return;
    }
  };

  // Search for all strings that have 'prefix' as the prefix.
  //
  // Returns Array of Strings.
  this.search = function(prefix) {
    if (!prefix) {
      prefix = "";
    }
    var node = this.findLastNode(prefix);
    result = [];
    if (node) {
      this._search(node, prefix);
    }
    return result;
  };

  // Recursive function. Helper function for the search function.
  this._search = function(node, prefix) {
    var children = node.children;
    if (this.isEmpty(children)) {
      result.push(prefix);
    } else {
      if (node.value.word) {
        result.push(prefix);
      }
      for (var key in children) {
        this._search(children[key], prefix + children[key].value.letter);
      }
    }
  };

  // Find the node that correspond to the last character in the string.
  //
  // Returns Node.
  this.findLastNode = function(string) {
    this._findLastNode(head, string);
    return result;
  };

  // Recursive function. Helper function for the findLastNode function.
  this._findLastNode = function(parent, string) {
    if (!string) {
      return result = parent;
    }
    var children = parent.children;
    if (this.isEmpty(children)) {
      result = null;
      return;
    }
    if (children[string[0]]) {
      this._findLastNode(children[string[0]], string.slice(1));
    } else {
      result = null;
      return;
    }
  };

  // Given a node, return all the strings that are part of this node.
  //
  // Returns Array of Strings.
  this.iterate = function(node) {
    result = [];
    if (!node) {
      return result;
    }
    if (node === head) {
      if (this.isEmpty(head.children)) {
        return result;
      } else {
        node.value.letter = "";
      }
    }
    this._iterate(node, node.value.letter);
    return result;
  };

  // Recursive helper function for .iterate
  this._iterate = function(node, string) {
    var children = node.children;
    if (this.isEmpty(children)) {
      result.push(string);
    } else {
      if (node.value.word) {
        result.push(string);
      }
      for (var key in children) {
        this._iterate(children[key], string + children[key].value.letter);
      }
    }
  };

  // You may find this function useful for implementing iterate().
  //
  // Returns true if object is empty. False otherwise.
  this.isEmpty = function (object) {
    for(var i in object) {
      return false;
    }
    return true;
  };
};