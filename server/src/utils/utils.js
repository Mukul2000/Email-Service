function generate_key() {
    const val = Math.floor(1000 + Math.random() * 9000);
    return val.toString();
}

module.exports = generate_key 
