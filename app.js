const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json());

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mysql = require('mysql');
const upload = multer({ dest: 'uploads/' }); // 设置文件上传的临时目录

// Connect to MySQL
const connection = mysql.createConnection({
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

app.get('/api/userinfo_change', (req, res) => {
// 從查詢參數獲取 userId
const userId = req.query.userId;

// 如果沒有提供 userId，返回錯誤
if (!userId) {
    res.status(400).send('缺少必要的查詢參數：userId');
    return;
}

// 修改 SQL 查詢以包含 userId 條件
const query = 'SELECT * FROM user WHERE user_id = ?';

// 執行帶有 userId 條件的查詢
connection.query(query, [userId], (error, results, fields) => {
    if (error) {
        res.status(500).send('資料庫查詢錯誤');
        return;
    }
    res.json(results); // 發送JSON格式的數據
});
});

app.get('/api/medical_record', (req, res) => {
// 從查詢參數獲取 userId
const userId = req.query.userId;

// 如果沒有提供 userId，返回錯誤
if (!userId) {
    res.status(400).send('缺少必要的查詢參數：userId');
    return;
}

// 修改 SQL 查詢以包含 userId 條件
const query = 'SELECT * FROM medical_record WHERE user_id = ?';

// 執行帶有 userId 條件的查詢
connection.query(query, [userId], (error, results, fields) => {
    if (error) {
        res.status(500).send('資料庫查詢錯誤');
        return;
    }
    res.json(results); // 發送JSON格式的數據
});
});

app.get('/api/medical_appointment', (req, res) => {
    // 從查詢參數獲取 userId
    const userId = req.query.userId;

    // 如果沒有提供 userId，返回錯誤
    if (!userId) {
        res.status(400).send('缺少必要的查詢參數：userId');
        return;
    }

    // 修改 SQL 查詢以包含 userId 條件
    const query = 'SELECT * FROM medical_appointment WHERE user_id = ?';
    
    // 執行帶有 userId 條件的查詢
    connection.query(query, [userId], (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});

app.get('/api/inspection_appointment', (req, res) => {
    // 從查詢參數獲取 userId
    const userId = req.query.userId;

    // 如果沒有提供 userId，返回錯誤
    if (!userId) {
        res.status(400).send('缺少必要的查詢參數：userId');
        return;
    }

    // 修改 SQL 查詢以包含 userId 條件
    const query = 'SELECT * FROM inspection_appointment WHERE user_id = ?';
    
    // 執行帶有 userId 條件的查詢
    connection.query(query, [userId], (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});


app.get('/api/inspection_records', (req, res) => {
 // 從查詢參數獲取 userId
 const userId = req.query.userId;

 // 如果沒有提供 userId，返回錯誤
 if (!userId) {
     res.status(400).send('缺少必要的查詢參數：userId');
     return;
 }

 // 修改 SQL 查詢以包含 userId 條件
 const query = 'SELECT * FROM inspection_appointment WHERE user_id = ?';
 
 // 執行帶有 userId 條件的查詢
 connection.query(query, [userId], (error, results, fields) => {
     if (error) {
         res.status(500).send('資料庫查詢錯誤');
         return;
     }
     res.json(results); // 發送JSON格式的數據
 });
});

app.get('/api/user_password', (req, res) => {
    connection.query('SELECT * FROM user_password', (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});

app.get('/api/admin_password', (req, res) => {
    connection.query('SELECT * FROM admin_password', (error, results, fields) => {
        if (error) {
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results); // 發送JSON格式的數據
    });
});

app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // console.log(username, password);

    // 首先從 user 表中查找 user_id
    const findUserIdQuery = 'SELECT user_id FROM user WHERE user_idNumber = ?';
    connection.query(findUserIdQuery, [username], (findError, findResults) => {
        if (findError) {
            res.status(500).json({ success: false, message: '資料庫錯誤' });
            return;
        }
        if (findResults.length === 0) {
            res.json({ success: false, message: '用戶身份證號碼不存在' });
            return;
        }
        
        // 獲取用戶的 user_id
        const userId = findResults[0].user_id;
        console.log(userId)
        // 現在使用 user_id 進行註冊
        const insertQuery = 'INSERT INTO user_password(user_password, user_id, user_idNumber) VALUES (?, ?, ?)';
        connection.query(insertQuery, [password, userId, username], (insertError, insertResults) => {
            if (insertError) {
                console.error('插入錯誤:', insertError);
                res.status(500).json({ success: false, message: '資料庫錯誤' });
                return;
            }
            res.json({ success: true, message: '註冊成功' });
        });
    });
});

app.post('/api/updateUserInfo', (req, res) => {
    const userId = req.body.userId;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    const updateQuery = 'UPDATE user SET user_email = ?, user_phoneNumber = ?, user_address = ? WHERE user_id = ?';

    connection.query(updateQuery, [email, phoneNumber, address, userId], (error, results) => {
        if (error) {
            res.status(500).send('資料庫更新錯誤');
            return;
        }
        res.send('資料更新成功');
    });
});




// 解析表单数据
app.use(express.urlencoded({ extended: true }));

// 處理圖片上傳，url版本
app.post('/upload', upload.single('image'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/" + req.file.originalname);

    fs.rename(tempPath, targetPath, err => {
        if (err) {
            console.error(err);
            res.status(500).send("An error occurred");
            return;
        }

        // 从请求体获取标题和文本
        const title = req.body.leaflet_title;
        const text = req.body.leaflet_txt;

        // 构造 SQL 查询和参数
        const query = 'INSERT INTO leaflet (leaflet_title, leaflet_img, leaflet_txt) VALUES (?, ?, ?)';
        connection.query(query, [title, targetPath, text], (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(500).send("Database error");
                return;
            }
            res.status(200).send("File uploaded and data saved");
        });
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/images', (req, res) => {
    const query = 'SELECT * FROM leaflet';
    connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send("Database error");
            return;
        }
        results.forEach(image => {
            // 将文件系统路径转换为 Web URL
            const filename = path.basename(image.leaflet_img);
            image.leaflet_img = '/uploads/' + filename;
        });
        res.json(results);
    });
});


 




// 啟動伺服器
const port = 3000;
app.listen(port, () => {
    console.log(`伺服器正在監聽 http://localhost:${port}`);
});


