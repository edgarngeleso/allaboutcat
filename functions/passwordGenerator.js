const passwordGenerator = ()=>{
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let output="";
    for(let i=0;i<8;i++){
        let random_value = chars[Math.floor(Math.random(chars.length)*chars.length)];
        output+=random_value;
    }
    return output;
}

module.exports = {
    passwordGenerator
}