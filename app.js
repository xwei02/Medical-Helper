const express = require('express');
const app = express();

app.use(express.static("public"));

var mysql = require('mysql');

// Connect to MySQL
var connection = mysql.createConnection({
    host: 'localhost', // 注意：这里应该是 'localhost' 而非 '127.0.0.1:3306'
    port : 3306,
    user: 'root',
    password: 'wei920116',
    database: 'newschema'
});

// Test the database connection
connection.connect(function(err) {
    if (err) {
        console.error('連接資料庫失敗: ' + err.stack);
        return;
    }

    console.log('連接資料庫成功，ID為 ' + connection.threadId);
    
    // 簡單的查詢來測試連接
    connection.query('SELECT 1', function (error, results, fields) {
        if (error) throw error;
        console.log('資料庫測試查詢成功：', results);
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/test.html');
});

app.get('/api/user', (req, res) => {
    connection.query('SELECT * FROM user', (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});

app.get('/api/medical_record', (req, res) => {
    connection.query('SELECT * FROM medical_record', (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});

app.get('/api/medical_appointment', (req, res) => {
    connection.query('SELECT * FROM medical_appointment', (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});

app.get('/api/inspection_appointment', (req, res) => {
    connection.query('SELECT * FROM inspection_appointment', (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});

app.get('/api/inspection_records', (req, res) => {
    connection.query('SELECT * FROM inspection_records', (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});




// 啟動伺服器
const port = 3000;
app.listen(port, () => {
    console.log(`伺服器正在監聽 http://localhost:${port}`);
});

