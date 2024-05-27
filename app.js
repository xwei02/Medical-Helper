const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
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
    host: 'localhost', 
    port : 3306,
    user: 'root',
    password: 'Yvonne920415',
    database: 'newschema'
});
// 用於頻繁呼叫
const pool = mysql.createPool({
    host: 'localhost', 
    port : 3306,
    user: 'root',
    password: 'Yvonne920415',
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

app.get('/api/user_name', (req, res) => {
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
 const query = 'SELECT * FROM inspection_records WHERE user_id = ?';
 
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

app.get('/api/admin_account', (req, res) => {
    connection.query('SELECT * FROM admin_account', (error, results, fields) => {
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

app.post('/api/user_question', (req, res) => {
    // 提取请求体中的数据
    const { user_id, user_qtext } = req.body; // 不需要从请求体中提取 user_qtime

    // 构造 SQL 查询
    const query = 'INSERT INTO user_question (user_id, user_qtext, user_qtime) VALUES (?, ?, NOW())';

    // 执行查询
    connection.query(query, [user_id, user_qtext], (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('資料庫寫入錯誤');
            return;
        }
        res.json({ success: true, message: 'Question added successfully' });
    });
});

app.post('/api/admin_reply', (req, res) => {
    // 提取请求体中的数据
    const { admin_id, admin_rtext, question_id } = req.body; // 不需要从请求体中提取 user_qtime

    // 构造 SQL 查询
    const query = 'INSERT INTO admin_reply (admin_id, admin_rtext, question_id, admin_rtime) VALUES (?, ?, ?, NOW())';

    // 执行查询
    connection.query(query, [admin_id, admin_rtext, question_id], (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('資料庫寫入錯誤');
            return;
        }
        res.json({ success: true, message: 'Question added successfully' });
    });
});

app.get('/api/user_questions', (req, res) => {
    connection.query('SELECT * FROM user_question', (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('Error fetching questions');
            return;
        }
        res.json(results);
    });
});


// // 設定 Gmail 服務帳戶

app.post('/sendVerificationEmail', async (req, res) => {
    const userEmail = req.body.email;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'yvonneli0415@gmail.com',
        pass: 'clxn sxnh ypha vtkx',
    },
    });

  // 發送 Gmail 驗證身分的郵件
  
  try {
    const result = await transporter.sendMail({
      from: 'yvonneli0415@gmail.com',
      to: userEmail,
      subject: 'Gmail 驗證身分',
      text: '請點擊以下連結以驗證您的身分：http://localhost:3000/user_login.html',
    });
    res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Error sending verification email', error);
    res.status(500).json({ success: false, error: 'Error sending verification email' });
  }
});

app.get('/api/user_feedback', (req, res) => {
    const userId = req.query.userId;
    const query = `SELECT 
    user_question.question_id,
    user_question.user_qtext,
    user_question.user_qtime,
    admin_reply.admin_rtext,
    admin_reply.admin_rtime
    FROM 
        user_question
    LEFT JOIN 
        admin_reply ON user_question.question_id = admin_reply.question_id
    WHERE 
        user_question.user_id = ?;`;

    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('Error fetching feedback');
            return;
        }
        res.json(results);
    });
});

app.get('/api/user_questions', (req, res) => {
    connection.query('SELECT * FROM user_question', (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('Error fetching questions');
            return;
        }
        res.json(results);
    });
});

app.get('/api/user_questions', (req, res) => {
    connection.query('SELECT * FROM user_question', (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('Error fetching questions');
            return;
        }
        res.json(results);
    });
});

app.get('/api/leaflet_title', (req, res) => {
    connection.query('SELECT * FROM leaflet', (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('Error fetching questions');
            return;
        }
        res.json(results);
    });
});

// leaflet_modify抓leaflet用的
app.get('/api/leaflet_info', (req, res) => {
    const { leaflet_title } = req.query;

    if (!leaflet_title) {
        res.status(400).send('Missing leaflet title');
        return;
    }

    const query = 'SELECT * FROM leaflet WHERE leaflet_title = ?';

    connection.query(query, [leaflet_title], (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('Database query error');
            return;
        }

        // 檢查是否找到了記錄
        if (results.length === 0) {
            res.status(404).send('Leaflet not found');
            return;
        }

        // 回傳找到的第一條記錄
        res.json(results[0]);
    });
});

app.post('/api/update_leaflet', (req, res) => {
    const adminId = req.body.admin;
    const leaflet_title = req.body.leaflet_title;
    const leaflet_txt = req.body.leaflet_txt;
    const original_title  = req.body.original_title;

    const updateQuery = 'UPDATE leaflet SET admin_id = ?, leaflet_title = ?, leaflet_txt = ? WHERE leaflet_title = ?';

    connection.query(updateQuery, [adminId, leaflet_title, leaflet_txt, original_title], (error, results) => {
        if (error) {
            res.status(500).send('資料庫更新錯誤');
            return;
        }
        res.send('資料更新成功');
    });
});

app.delete('/api/delete_leaflet', (req, res) => {
    const { leaflet_title } = req.query;
  
    if (!leaflet_title) {
      res.status(400).send('缺少必要的參數：leaflet_title');
      return;
    }
  
    const deleteQuery = 'DELETE FROM leaflet WHERE leaflet_title = ?';
  
    connection.query(deleteQuery, [leaflet_title], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).send('資料庫刪除錯誤');
        return;
      }
      res.send('文章刪除成功');
    });
  });

  app.get('/api/user_feedback_detail', (req, res) => {
    const questionId = req.query.questionId;

    if (!questionId) {
        res.status(400).send('缺少必要的查詢參數：questionId');
        return;
    }

    const query = `SELECT 
                     user_question.user_qtext,
                     user_question.user_qtime,
                     admin_reply.admin_rtext,
                     admin_reply.admin_rtime
                   FROM 
                     user_question
                   LEFT JOIN 
                     admin_reply ON user_question.question_id = admin_reply.question_id
                   WHERE 
                     user_question.question_id = ?;`;

    connection.query(query, [questionId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('資料庫查詢錯誤');
            return;
        }
        res.json(results);
    });
});

app.get('/api/leaflet_showdetail', (req, res) => {
    // 從查詢參數中獲取標題
    const title = req.query.title;
    if (!title) {
        return res.status(400).send('Title is required.');
    }

    // 執行查詢來找到對應的衛教單
    const query = 'SELECT * FROM leaflet WHERE leaflet_title = ?';
    connection.query(query, [title], (error, results) => {
        if (error) {
            return res.status(500).send('Database query failed.');
        }
        if (results.length === 0) {
            return res.status(404).send('Leaflet not found.');
        }

        // 修改圖片路徑
        const leaflet = results[0];
        if (leaflet && leaflet.leaflet_img) {
            const filename = path.basename(leaflet.leaflet_img);
            leaflet.leaflet_img = '/uploads/' + filename;
        }

        res.json(leaflet);
    });
});

app.get('/check_form_status', (req, res) => {
    const userId = req.query.user_id;
    const sdmId = req.query.sdm_id;

    if (!userId) {
        return res.status(400).send('請登入再進行操作');
    }

    if(!sdmId){
        return res.status(400).send('查無此輔助工具');
    }

    const sql = `
        SELECT sdm_id FROM sdm_patientreplych2 WHERE user_id = ? AND sdm_id = ?
        UNION
        SELECT sdm_id FROM sdm_patientreplych3 WHERE user_id = ? AND sdm_id = ?
        UNION
        SELECT sdm_id FROM sdm_patientreplych4 WHERE user_id = ? AND sdm_id = ?
    `;
    connection.query(sql, [userId, sdmId, userId, sdmId, userId, sdmId], (err, results) => {
        if (err) {
            console.error('Error querying database:', err.stack);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            res.send('filled');
        } else {
            res.send('not filled');
        }
    });
});



app.post('/save-answers-1', (req, res) => {
    const answers = req.body;
    const userId = req.body.user;
    const sdmTitle=req.body.sdm_title;
    const sdmId=req.body.sdm_id;


    // 将答案插入到数据库中
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).json({ success: false, message: 'Error connecting to database' });
            return;
        }



        // 执行数据库查询
        connection.query(
            'INSERT INTO sdm_patientreplych2 ( user_id, sdm_tittle, sdm_id, Ch2_1_A, Ch2_2_A, Ch2_3_A, Ch2_4_A, Ch2_5_A) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, sdmTitle, sdmId, answers.Ch2_1_A, answers.Ch2_2_A, answers.Ch2_3_A, answers.Ch2_4_A, answers.Ch2_5_A],
            (error, results) => {
                connection.release(); // 释放连接

                if (error) {
                    console.error('Error saving answers:', error);
                    res.status(500).json({ success: false, message: 'Error saving answers' });
                    return;
                }

                console.log('Answers saved successfully');
                res.json({ success: true, message: 'Answers saved successfully' });
            }
        );
    });
});

app.post('/save-answers-2', (req, res) => {
    const answers = req.body;
    const userId = req.body.user;
    const sdmTitle=req.body.sdm_title;
    const sdmId=req.body.sdm_id;

    // 将答案插入到数据库中
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).json({ success: false, message: 'Error connecting to database' });
            return;
        }



        // 执行数据库查询
        connection.query(
            'INSERT INTO sdm_patientreplych3 ( user_id, sdm_tittle, sdm_id, Ch3_1_A, Ch3_2_A, Ch3_3_A, Ch3_4_A, Ch3_5_A) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)',
            [userId, sdmTitle, sdmId, answers.Ch3_1_A, answers.Ch3_2_A, answers.Ch3_3_A, answers.Ch3_4_A, answers.Ch3_5_A],
            (error, results) => {
                connection.release(); // 释放连接

                if (error) {
                    console.error('Error saving answers:', error);
                    res.status(500).json({ success: false, message: 'Error saving answers' });
                    return;
                }

                console.log('Answers saved successfully');
                res.json({ success: true, message: 'Answers saved successfully' });
            }
        );
    });
});
app.post('/save-answers-3', (req, res) => {
    const answers = req.body;
    const userId = req.body.user;
    const sdmTitle=req.body.sdm_title;
    const sdmId=req.body.sdm_id;

    // 将答案插入到数据库中
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).json({ success: false, message: 'Error connecting to database' });
            return;
        }



        // 执行数据库查询
        connection.query(
            'INSERT INTO sdm_patientreplych4 ( user_id, sdm_tittle, sdm_id, Ch4_1_A, Ch4_2_A) VALUES ( ?, ?, ?, ?, ?)',
            [userId, sdmTitle, sdmId, answers.Ch4_1_A, answers.Ch4_2_A],
            (error, results) => {
                connection.release(); // 释放连接

                if (error) {
                    console.error('Error saving answers:', error);
                    res.status(500).json({ success: false, message: 'Error saving answers' });
                    return;
                }

                console.log('Answers saved successfully');
                res.json({ success: true, message: 'Answers saved successfully' });
            }
        );
    });
});


app.post('/get-sdm-data', (req, res) => {
    const sdmId = req.body.sdm_id;
    const userId = req.body.user_id;

    // 检查是否提供了所需的用户 ID 和 SDM ID
    if (!userId || !sdmId) {
        return res.status(400).json({ error: 'Missing user_id or sdm_id' });
    }

    // 查询数据库获取 SDM 数据
    const sql1 = `SELECT SDM_tittle, Ch2_1_A, Ch2_2_A, Ch2_3_A, Ch2_4_A, Ch2_5_A FROM sdm_patientreplych2 WHERE user_id = ? AND sdm_id = ?`;
    const sql2 = `SELECT SDM_tittle, Ch3_1_A, Ch3_2_A, Ch3_3_A, Ch3_4_A, Ch3_5_A FROM sdm_patientreplych3 WHERE user_id = ? AND sdm_id = ?`;
    const sql3 = `SELECT SDM_tittle, Ch4_1_A, Ch4_2_A FROM sdm_patientreplych4 WHERE user_id = ? AND sdm_id = ?`;

    // 使用连接池执行查询
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ error: 'Database connection error' });
        }

        // 执行查询并发送结果给客户端
        connection.query(sql1, [userId, sdmId], (err, results1) => {
            if (err) {
                connection.release(); // 释放连接
                console.error('Error querying database:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            connection.query(sql2, [userId, sdmId], (err, results2) => {
                if (err) {
                    connection.release(); // 释放连接
                    console.error('Error querying database:', err);
                    return res.status(500).json({ error: 'Database query error' });
                }

                connection.query(sql3, [userId, sdmId], (err, results3) => {

                    if (err) {
                        connection.release(); // 释放连接
                        console.error('Error querying database:', err);
                        return res.status(500).json({ error: 'Database query error' });
                    }

                    // 发送结果给客户端
                    res.json({ table1: results1, table2: results2, table3: results3 });
                });
            });
        });
    });
});

app.post('/update-form-status', (req, res) => {
    const { SDM_id, status } = req.body;

    // 更新数据库中的表单状态
    const sql = `UPDATE your_table_name SET form_status = ? WHERE SDM_id = ?`;
    pool.query(sql, [status, SDM_id], (err, results) => {
        if (err) {
            console.error('Error updating form status:', err);
            return res.status(500).json({ error: 'Error updating form status' });
        }

        res.json({ success: true });
    });
});

app.post('/get-sdm-manager', (req, res) => {
    const sdmId = req.body.SDM_id; // 获取前端发送的 SDM_ID

    // 检查是否提供了所需的 SDM ID
    if (!sdmId) {
        return res.status(400).json({ error: 'Missing sdm_id' });
    }

    // 构建 SQL 查询语句
    const sql1 = `SELECT user_id, SDM_tittle, SDM_id, Ch2_1_A, Ch2_2_A, Ch2_3_A, Ch2_4_A, Ch2_5_A, form_status FROM sdm_patientreplych2 WHERE sdm_id = ?`;
    const sql2 = `SELECT user_id, SDM_tittle, SDM_id, Ch3_1_A, Ch3_2_A, Ch3_3_A, Ch3_4_A, Ch3_5_A, form_status FROM sdm_patientreplych3 WHERE sdm_id = ?`;
    const sql3 = `SELECT user_id, SDM_tittle, SDM_id, Ch4_1_A, Ch4_2_A, form_status FROM sdm_patientreplych4 WHERE sdm_id = ?`;

    // 使用连接池执行查询
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return res.status(500).json({ error: 'Database connection error' });
        }

        // 执行查询并发送结果给客户端
        connection.query(sql1, [sdmId], (err, results1) => {
            if (err) {
                connection.release(); // 释放连接
                console.error('Error querying database:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            connection.query(sql2, [sdmId], (err, results2) => {
                if (err) {
                    connection.release(); // 释放连接
                    console.error('Error querying database:', err);
                    return res.status(500).json({ error: 'Database query error' });
                }

                connection.query(sql3, [sdmId], (err, results3) => {
                    connection.release(); // 释放连接

                    if (err) {
                        console.error('Error querying database:', err);
                        return res.status(500).json({ error: 'Database query error' });
                    }

                    // 发送结果给客户端
                    res.json({ table1: results1, table2: results2, table3: results3 });
                });
            });
        });
    });
});

// 啟動伺服器
const port = 3000;
app.listen(port, () => {
    console.log(`伺服器正在監聽 http://localhost:${port}`);
});


