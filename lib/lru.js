// NOTE assuming we don't have to check parameters too much

var LRU = function(size_limit) {
    this.size_limit = size_limit;
    this.size = 0;
    this.hash = {};
    this.head = this.tail = null;
};

LRU.prototype.store = function(key, value) {
    var was = this.hash[key];

    if (was === undefined) {
        if (this.size == this.size_limit) {  // NOTE removing the LRU element
            delete this.hash[this.tail];
            this._rmEl(this.tail);
        } else {
            this.size += 1;
        }
    } else {
        this._rmEl(was);
    }

    this.hash[key] = this._mkEl(value);

    return was && was.value;
};

LRU.prototype.fetch = function(key) {
    var is = this.hash[key];
    if (is) {
        this._rmEl(is);
        return (this.hash[key] = this._mkEl(is.value)).value;
    }
};

LRU.prototype._rmEl = function(el) {
    if (el.prev) {
        el.prev.next = el.next;
    } else {
        this.head = el.next;
    }
    if (el.next) {
        el.next.prev = el.prev;
    } else {
        this.tail = el.prev;
    }
};

LRU.prototype._mkEl = function(value) {
    var el = {
        prev: null,
        next: this.head,
        value: value
    };
    if (this.head) {
        this.head.prev = el;
    }
    return this.head = el;
};

module.exports = LRU;
