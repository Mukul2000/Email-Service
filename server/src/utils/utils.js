function generate_key() {
    const val = Math.floor(1000 + Math.random() * 9000);
    return toString(val);
}

module.exports = {generate_key}