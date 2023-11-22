const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/test.html');
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`伺服器正在監聽 http://localhost:${port}`);
});