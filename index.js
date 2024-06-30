const express = require('express');
const fs = require('fs');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('view engine','ejs');
app.use(express.static('public'));
const port = 3000;
const hostname = "localhost";
var sql = require('mysql');
var connection =  sql.createConnection({
    host:'library-website.cvyqasyoww5a.eu-north-1.rds.amazonaws.com',
    port:'3306',
    user:'admin',
    password: 'admin123',
    database: 'LIBRARY_MANAGEMENT'
});

connection.connect(err=>{
    if(err) throw err;
    console.log('Connected to db');
});

app.get('/available_books_file',(req,res)=>{
    fs.readFile(__dirname+"/JSON/available_books.json", "utf8", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        res.json(JSON.parse(data));
      });
});

app.get('/staffs_file',(req,res)=>{
    fs.readFile(__dirname+"/JSON/staffs_list.json", "utf8", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        res.json(JSON.parse(data));
      });
});

app.get('/fines_file',(req,res)=>{
    fs.readFile(__dirname+"/JSON/fines_list.json", "utf8", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        res.json(JSON.parse(data));
      });
});

app.get('/users_file',(req,res)=>{
    fs.readFile(__dirname+"/JSON/users_list.json", "utf8", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        res.json(JSON.parse(data));
      });

});

app.get('/issued_list_file',(req,res)=>{
    fs.readFile(__dirname+"/JSON/issued_list.json", "utf8", (error, data) => {
        if (error) {
          console.log(error);
          return;
        }
        res.json(JSON.parse(data));
      });

});

app.get('/registration',(req,res)=>{
    res.sendFile(__dirname+'/HTML/registration.html');
});

app.get('/index',(req,res)=>{
    res.sendFile(__dirname+'/HTML/index.html');
});

app.get('/dashboard',(req,res)=>{
    res.sendFile(__dirname+'/HTML/dashboard.html');
});

app.get('/staffs',(req,res)=>{
    res.sendFile(__dirname+'/HTML/staffs.html');
});

app.get('/books',(req,res)=>{
    res.sendFile(__dirname+'/HTML/books.html');
});

app.get('/users',(req,res)=>{
    res.sendFile(__dirname+'/HTML/users.html');
});

app.get('/clear_fine',(req,res)=>{
    res.sendFile(__dirname+'/HTML/clear_fine.html');
});

app.get('/available_books',function(req,res,next){
    var queR = "SELECT * FROM BOOKS WHERE !(BOOK_ID =100000)";
    connection.query(queR,function(err,result){
        if(!err){
            fs.writeFile(__dirname+"/JSON/available_books.json",JSON.stringify(result),err=>{
                if(err) console.log(err);
            });
            res.sendFile(__dirname+'/HTML/available_books.html');
        }
    });
});

app.get('/view_issues',function(req,res,next){
    var queR = "SELECT ISSUED.ISSUE_ID, ISSUED.BOOK_ID, BOOKS.TITLE, ISSUED.USER_ID, ISSUED.ISSUE_DATE, ISSUED.DUE_IN, ISSUED.RETURN_DATE, ISSUED.RETURN_STATUS FROM ISSUED INNER JOIN BOOKS ON ISSUED.BOOK_ID = BOOKS.BOOK_ID WHERE NOT BOOKS.BOOK_ID=100000;";
    connection.query(queR,function(err,result){
        if(!err){
            fs.writeFile(__dirname+"/JSON/issued_list.json",JSON.stringify(result),err=>{
                if(err) console.log(err);
            });
            res.sendFile(__dirname+'/HTML/issued_books.html');
        }
    });
});

app.get('/view_staff',function(req,res,next){
    var queR = "SELECT * FROM STAFF WHERE !(STAFF_ID =10000)";
    connection.query(queR,function(err,result){
        if(!err){
            fs.writeFile(__dirname+"/JSON/staffs_list.json",JSON.stringify(result),err=>{
                if(err) console.log(err);
            });
            res.sendFile(__dirname+'/HTML/view_staffs.html');
        }
    });
});

app.get('/display_fines',function(req,res,next){
    var queR = "SELECT * FROM FINES WHERE !(FINE_ID =10000)";
    connection.query(queR,function(err,result){
        if(!err){
            fs.writeFile(__dirname+"/JSON/fines_list.json",JSON.stringify(result),err=>{
                if(err) console.log(err);
            });
            res.sendFile(__dirname+'/HTML/view_fines.html');
        }
    });
});

app.get('/view_user',function(req,res,next){
    var queR = "SELECT * FROM USERS WHERE !(USER_ID =10000)";
    connection.query(queR,function(err,result){
        if(!err){
            fs.writeFile(__dirname+"/JSON/users_list.json",JSON.stringify(result),err=>{
                if(err) console.log(err);
            });
            res.sendFile(__dirname+'/HTML/view_users.html');
        }
    });
});

app.get('/add_book',(req,res)=>{
    res.sendFile(__dirname+'/HTML/add_book.html');
});

app.get('/issue_book',(req,res)=>{
    res.sendFile(__dirname+'/HTML/issue_books.html');
});

app.get('/delete_book',(req,res)=>{
    res.sendFile(__dirname+'/HTML/delete_book.html');
});

app.get('/add_user',(req,res)=>{
    res.sendFile(__dirname+'/HTML/add_user.html');
});

app.get('/delete_user',(req,res)=>{
    res.sendFile(__dirname+'/HTML/delete_user.html');
});

app.get('/add_staff',(req,res)=>{
    res.sendFile(__dirname+'/HTML/add_staff.html');
});

app.get('/delete_staff',(req,res)=>{
    res.sendFile(__dirname+'/HTML/delete_staff.html');
});

app.get('/update_staff',(req,res)=>{
    res.sendFile(__dirname+'/HTML/update_staff_info.html');
});

app.get('/update_user',(req,res)=>{
    res.sendFile(__dirname+'/HTML/update_user_info.html');
});

app.get('/update_book',(req,res)=>{
    res.sendFile(__dirname+'/HTML/update_book_info.html');
});

app.get('/return_book',(req,res)=>{
    res.sendFile(__dirname+'/HTML/return_book.html');
});

app.get('/user_available_books',(req,res)=>{
    res.render('user_available_books',{userData:'10029'});
});

app.get('/user_books',(req,res)=>{
    res.sendFile(__dirname+'/HTML/user_books.html');
});

app.get('/fines',(req,res)=>{
    res.sendFile(__dirname+'/HTML/fine.html');
});

app.get('/charge_fine',(req,res)=>{
    res.sendFile(__dirname+'/HTML/charge_fine.html');
});

app.post('/user_dashboard',(req,res)=>{
    var data = req.body;
    console.log(data);
    res.render('user_dashboard', {userData:data});
});

app.post('/register',function(req,res){
    var data = req.body;
    console.log(data);
    var name = data.name;
    var phone = parseInt(data.phone_number);
    var address = data.address;
    var usertype = 'admin';
    var email = data.email;
    var password = data.password;
    var queR = "INSERT INTO USERS (NAME,ADDRESS,PHONE,EMAIL) VALUES ('"+name+"','"+address+"',"+phone+",'"+email+"')";
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0){
                var mess = "User registered with User ID: "+result.insertId;
                var queRy = "";
                if(usertype == 'admin')
                    queRy = "INSERT INTO LOGINS VALUES('admin',"+result.insertId+",'"+password+"')";
                else
                    queRy = "INSERT INTO LOGINS VALUES('User',"+result.insertId+",'"+password+"')";
                connection.query(queRy, function(err1,result1){
                    if(!err1){
                        console.log(result1);
                        if(result1.affectedRows>0)
                            res.status(200).send({message:mess});
                    }
                });
            }
            else
                res.status(500).send('Error adding user');
        }else{
            console.log(err);
            res.status(500).send('Error adding user');
        }
    });
});

app.post('/fetch_fine_details', (req, res) => {
    const fineId = req.body.fine_id;
  
    // Fetch details from the database using SQL query
    const query = 'SELECT * FROM FINES WHERE FINE_ID = '+fineId;
    connection.query(query, function(error, results){
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Fine not found' });
      }
      const fineDetails = results[0];
      if(results[0].STATUS == 'PAID'){
        fineDetails.AMOUNT = 0
      }
      console.log(results);
      res.json({
        AMOUNT: fineDetails.AMOUNT
      });
    });
  });

  app.post('/fetch_issued_details',(req,res)=>{
    const fineId = req.body.issue_id;
    const query = 'SELECT USER_ID,BOOK_ID FROM ISSUED WHERE ISSUE_ID = '+fineId;
    connection.query(query, function(error, results){
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Issue details not found' });
      }
  
      const fineDetails = results[0];
      console.log(fineDetails);
      res.json({
        USER_ID: fineDetails.USER_ID,
        BOOK_ID: fineDetails.BOOK_ID
      });
    });
  });

  app.post('/fetch_book_details',(req,res)=>{
    const fineId = req.body.book_id;
    const query = 'SELECT * FROM BOOKS WHERE BOOK_ID = '+fineId;
    connection.query(query, function(error, results){
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      const fineDetails = results[0];
      console.log(fineDetails);
      res.json({
        BOOK_ID: fineDetails.BOOK_ID,
        ISBN: fineDetails.ISBN,
        TITLE: fineDetails.TITLE,
        AUTHOR: fineDetails.AUTHOR,
        DOMAIN: fineDetails.DOMAIN,
        PUB_YEAR: fineDetails.PUB_YEAR,
        AVAILABLE_QTY: fineDetails.AVAILABLE_QTY,
        STOCK_QTY: fineDetails.STOCK_QTY
      });
    });
  });

  app.post('/fetch_staff_details',(req,res)=>{
    const fineId = req.body.staff_id;
    const query = 'SELECT * FROM STAFF WHERE STAFF_ID = '+fineId;
    connection.query(query, function(error, results){
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      const fineDetails = results[0];
      console.log(fineDetails);
      res.json({
        STAFF_ID: fineDetails.STAFF_ID,
        NAME: fineDetails.NAME,
        DEPARTMENT: fineDetails.DEPARTMENT,
        PHONE: fineDetails.PHONE,
        EMAIL: fineDetails.EMAIL
      });
    });
  });

  app.post('/fetch_user_details',(req,res)=>{
    const fineId = req.body.user_id;
    const query = 'SELECT * FROM USERS WHERE USER_ID = '+fineId;
    connection.query(query, function(error, results){
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      const fineDetails = results[0];
      console.log(fineDetails);
      res.json({
        USER_ID: fineDetails.USER_ID,
        NAME: fineDetails.NAME,
        PHONE: fineDetails.PHONE,
        EMAIL: fineDetails.EMAIL
      });
    });
  });

app.post('/index',function(req,res){
    var data = req.body;
    console.log(req.body)
    var username =data.username;
    var password = data.password;
    var queR = "SELECT * FROM LOGINS WHERE USER_TYPE='admin' AND ID="+username;
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result[0].PASSWORD ==  password){
                console.log("Success");
                res.status(200).send("Success");
            }else{
                var response = 'User failed to login due to invalid ID or password.';
                console.error('User failed to login');
                res.status(500).send({message:response});
            }
        }else{
            console.log(err);
            res.status(500).send('Error fetching user data.');
        }
    });
});

app.post('/index_user',function(req,res){
    var data = req.body;
    console.log(req.body)
    var username =data.username;
    var password = data.password;
    var usertype = data.usertype;
    var queR = "SELECT * FROM LOGINS WHERE USER_TYPE='User' AND ID="+username;
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result[0].PASSWORD ==  password){
                console.log("Success user login");
                res.render('user_dashboard',{userData:req.body});
            }else{
                var response = 'User failed to login due to invalid ID or password.';
                console.error('User failed to login');
                res.status(500).send({message:response});
            }
        }else{
            console.log(err);
            res.status(500).send('Error fetching user data.');
        }
    });
});

app.post('/update_book',function(req,res){
    var data = req.body;
    console.log(data);
    var id = data.book_id;
    var title = data.book_title;
    var author = data.book_author;
    var isbn = data.isbn;
    var domain = data.department;
    var copies = data.available_copies;
    var pub = data.year_of_publication;
    var attrs = ""
    if(id!=''){
        if(title!='')
            attrs = "TITLE='"+title+"' ,";
        if(author!='')
            attrs += "AUTHOR='"+author+"' ,";
        if(domain!='')
            attrs += "DOMAIN='"+domain+"' ,";
        if(copies!=''){
            attrs+="STOCK_QTY="+copies+" ,";
            attrs+="AVAILABLE_QTY="+copies+" ,";
        }
        if(pub!='')
            attrs+="PUB_YEAR="+pub+" ,";
        if(isbn!='')
            attrs+="ISBN="+isbn;
        if(attrs.endsWith(','))
            attrs = attrs.substring(0,attrs.lastIndexOf(',')-1);
        var queR = "UPDATE BOOKS SET "+attrs+" WHERE BOOK_ID="+id;
        console.log(queR);
        connection.query(queR, function(err,result){
            if(!err){
                console.log(result);
                if(result.affectedRows>0)
                    res.status(200).send('Book updated successfully');
                else
                    res.status(500).send('Error updating book');
            }else{
                console.log(err);
                res.status(500).send('Error updating book');
            }
        });
    }
});

app.post('/update_user',function(req,res){
    var data = req.body;
    //console.log(data);
    var id = data.user_id;
    var name = data.user_name;
    var phone = data.phone_number;
    var email = data.email;
    var attrs = ""
    if(id!=''){
        if(name!='')
            attrs = "NAME='"+name+"' ,";
        if(phone!='')
            attrs+="PHONE="+phone+" ,";
        if(email!='')
            attrs+="EMAIL='"+email+"' ";
        if(attrs.endsWith(','))
            attrs = attrs.substring(0,attrs.lastIndexOf(',')-1);
        var queR = "UPDATE USERS SET "+attrs+" WHERE USER_ID="+id;
        connection.query(queR, function(err,result){
            if(!err){
                console.log(result);
                if(result.affectedRows>0)
                    res.status(200).send('User updated successfully');
                else
                    res.status(500).send('Error updating user');
            }else{
                console.log(err);
                res.status(500).send('Error updating user');
            }
        });
    }
});

app.post('/update_staff',function(req,res){
    var data = req.body;
    //console.log(data);
    var id = data.staff_id;
    var name = data.staff_name;
    var dept = data.department;
    var phone = data.phone_number;
    var email = data.email;
    var attrs = ""
    if(id!=''){
        if(name!='')
            attrs = "NAME='"+name+"' ,";
        if(dept!='')
            attrs += "DEPARTMENT='"+dept+"' ,";
        if(phone!='')
            attrs+="PHONE="+phone+" ,";
        if(email!='')
            attrs+="EMAIL='"+email+"' ";
        if(attrs.endsWith(','))
            attrs = attrs.substring(0,attrs.lastIndexOf(',')-1);
        var queR = "UPDATE STAFF SET "+attrs+" WHERE STAFF_ID="+id;
        connection.query(queR, function(err,result){
            if(!err){
                console.log(result);
                if(result.affectedRows>0)
                    res.status(200).send('Staff updated successfully');
                else
                    res.status(500).send('Error updating staff');
            }else{
                console.log(err);
                res.status(500).send('Error updating staff');
            }
        });
    }
    
});

app.post('/return_book',function(req,res){
    var data = req.body;
    console.log(data);
    var user_id = data.user_id;
    var issue_id = data.issue_id;
    var current_date = new Date();
    var return_date = format(current_date);
    var queR = "UPDATE ISSUED SET RETURN_DATE='"+return_date+"',RETURN_STATUS='RETURNED' WHERE ISSUE_ID="+issue_id+" AND USER_ID="+user_id; 
    connection.query(queR,function(err,result){
        console.log(result);
        if(result.affectedRows > 0){
            var queR1 = "SELECT BOOK_ID FROM ISSUED WHERE ISSUE_ID="+issue_id;
            connection.query(queR1,function(err1,result1){
                var queR2 = "UPDATE BOOKS SET AVAILABLE_QTY=AVAILABLE_QTY+1 WHERE BOOK_ID="+result1[0].BOOK_ID;
                connection.query(queR2,function(err2,result2){
                    res.status(200).send('Book returned successfully');
                });
            });
        }
        else
            res.status(500).send('Error updating records.');
    });
});

app.post('/issue_book', function(req,res){
    var data = req.body;
    var book_id = parseInt(data.book_id);
    var user_id = parseInt(data.user_id);
    var isbn = data.isbn;
    var current_date = new Date();
    var issue_date = format(current_date);
    current_date.setDate(current_date.getDate()+14);
    var return_date = format(current_date);
    var queR = "SELECT AVAILABLE_QTY FROM BOOKS WHERE BOOK_ID="+book_id;
    connection.query(queR,function(err,result){
        if(!err){
            if(result.length > 0){
                console.log(result[0].AVAILABLE_QTY);
                if(result[0].AVAILABLE_QTY){
                    var queR1 = "INSERT INTO ISSUED (BOOK_ID,USER_ID,ISSUE_DATE,DUE_IN) values ("+book_id+","+user_id+",'"+issue_date+"','"+return_date+"')";
                    connection.query(queR1,function(err1,result1){
                        if(!err1){
                            console.log(result1);
                            if(result1.affectedRows>0){
                                var queR2 = "UPDATE BOOKS SET AVAILABLE_QTY=AVAILABLE_QTY-1 WHERE BOOK_ID="+book_id;
                                connection.query(queR2,function(err2,result2){
                                    if(!err2){
                                        console.log(result2);
                                        if(result2.affectedRows>0)
                                            res.status(200).send('Book issued successfully');
                                        else
                                            res.status(500).send('Error issung book');
                                    }else{
                                        console.log(err);
                                        res.status(500).send('Error issung book');
                                    }
                                });
                            }
                            else
                                res.status(500).send('Error issung book');
                        }else{
                            console.log(err);
                            res.status(500).send('Error issung book');
                        }
                    });
                }
                else
                    res.status(500).send('Error issung book');
            }else{
                res.status(500).send('Error issung book');
            }
        }else{
            console.log(err);
            res.status(500).send('Error issung book');
        }
    });
    /*
    var queR = "INSERT INTO ISSUED (BOOK_ID,USER_ID,ISSUE_DATE,DUE_IN) values ("+book_id+","+user_id+",'"+issue_date+"','"+return_date+"')";
    connection.query(queR,function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0)
                res.status(200).send('Book issued successfully');
            else
                res.status(500).send('Error issung book');
        }else{
            console.log(err);
            res.status(500).send('Error issung book');
        }
    });*/
});

app.post('/delete_staff',function(req,res){
    var data = req.body;
    //console.log(data);
    var id = parseInt(data.staff_id);
    var name = data.staff_name;
    var dept = data.department;
    var queR = "DELETE FROM STAFF WHERE STAFF_ID="+id+" && NAME='"+name+"' && DEPARTMENT='"+dept+"'";
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0)
                res.status(200).send('Staff Deleted successfully');
            else
                res.status(500).send('Error deleting staff');
        }else{
            console.log(err);
            res.status(500).send('Error deleting staff');
        }
});
});

app.post('/delete_book',function(req,res){
    var data = req.body;
    var id = parseInt(data.book_id);
    var title = data.book_title;
    var isbn = parseInt(data.isbn);
    var queR = "DELETE FROM BOOKS WHERE BOOK_ID="+id+" && ISBN="+isbn;
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0)
                res.status(200).send('Book Deleted successfully');
            else
                res.status(500).send('Error deleting book');
        }else{
            console.log(err);
            res.status(500).send('Error deleting book');
        }
});
});

app.post('/submit_user',function(req,res){
    var data = req.body;
    //console.log(data);
    var name = data.name;
    var phone = parseInt(data.phone_number);
    var address = data.address;
    var email = data.email;
    var queR = "INSERT INTO USERS (NAME,ADDRESS,PHONE,EMAIL) VALUES ('"+name+"','"+address+"',"+phone+",'"+email+"')";
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0){
                var insertId = result.insertId;
                var queRy = "INSERT INTO LOGINS VALUES('User',"+insertId+",'"+insertId+"')";
                connection.query(queRy, function(err1,result1){
                    if(!err){
                        console.log(result1);
                        if(result1.affectedRows>0)
                            res.status(200).send('Book Deleted successfully');
                    }
                });
            }else
                res.status(500).send('Error adding user');
        }else{
            console.log(err);
            res.status(500).send('Error adding user');
        }
});
});

app.post('/delete_user',function(req,res){
    var data = req.body;
    //console.log(data);
    var id = parseInt(data.user_id);
    var name = data.user_name;
    var phone = parseInt(data.phone);
    var queR = "DELETE FROM USERS WHERE USER_ID="+id+" && NAME='"+name+"'";
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0)
                res.status(200).send('User Deleted successfully');
            else
                res.status(500).send('Error deleting user');
        }else{
            console.log(err);
            res.status(500).send('Error deleting user');
        }
});
});

app.post('/submit_staff',function(req,res){
    var data = req.body;
    //console.log(data);
    var name = data.staff_name;
    var dept = data.department;
    var phone = parseInt(data.phone_number);
    var address = data.staff_adress;
    var email = data.email;
    var queR = "INSERT INTO STAFF (NAME,DEPARTMENT,ADDRESS,PHONE,EMAIL) VALUES ('"+name+"','"+dept+"','"+address+"',"+phone+",'"+email+"')";
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0)
                res.status(200).send('Staff added successfully');
            else
                res.status(500).send('Error adding staff');
        }else{
            console.log(err);
            res.status(500).send('Error adding staff');
        }
});
});

app.post('/submit_book',function(req,res){
    var data = req.body;
    console.log(data);
    var title = data.book_title;
    var author = data.book_author;
    var isbn = parseInt(data.isbn);
    var dept = data.department;
    var copies = parseInt(data.number_of_copies);
    var pub = parseInt(data.year_of_publication);
    var queR = "INSERT INTO BOOKS (ISBN,TITLE,AUTHOR,DOMAIN,PUB_YEAR,AVAILABLE_QTY,STOCK_QTY) VALUES ("+isbn+",'"+title+"','"+author+"','"+dept+"',"+pub+","+copies+","+copies+")";
    connection.query(queR, function(err,result){
        if(!err){
            console.log(result);
            if(result.affectedRows>0)
                res.status(200).send('Book added successfully');
            else
                res.status(500).send('Error adding book');
        }else{
            console.log(err);
            res.status(500).send('Error adding book');
        }
});
});

app.post('/raise_fine',function(req,res){
    var data = req.body;
    console.log(data);
    var issue_id = data.issue_id;
    var amount = data.amount;
    var reason = data.reason;
    var queR = "SELECT USER_ID FROM ISSUED WHERE ISSUE_ID="+issue_id;
    var user_id = 0;
    connection.query(queR,function(err,result){
        if(result.length > 0){
            user_id = result[0].USER_ID;
            var queR2 = "INSERT INTO FINES (ISSUE_ID,USER_ID,AMOUNT,REASON) VALUES("+issue_id+","+user_id+","+amount+",'"+reason+"')";
            connection.query(queR2,function(err1,result1){
                console.log(result1);
                if(!err1){
                    if(result1.affectedRows > 0)
                        res.status(200).send('Fine rasied.');
                    else
                        res.status(500).send('Error raising fine.');
                }else{
                    res.status(500).send('Error raising fine.');
                }
            });
        }else{
            res.status(500).send('Error raising fine.');
        }
    });
});

app.post('/clear_fine',function(req,res){
    var data = req.body;
    console.log(data);
    var fine_id = data.fine_id;
    var amount = data.amount;
    var queR = "SELECT * FROM FINES WHERE FINE_ID="+fine_id;
    connection.query(queR,function(err,result){
        if(!err){
            if(result.length > 0){
                var queR1 = "UPDATE FINES SET STATUS='PAID' WHERE FINE_ID="+fine_id+" AND AMOUNT="+amount;
                connection.query(queR1,function(err1,result1){
                    if(!err){
                        if(result1.affectedRows > 0){
                            res.status(200).send('Fine status updated.');
                        }else{
                            res.status(500).send('Error updating.');
                        }
                    }else{
                        res.status(500).send('Error fetching.');
                    }
                });
            }else{
                res.status(500).send('Error fetching.');
            }
        }else{
            res.status(500).send('Error fetching.');
        }
    });
});

function format (date) {  
    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument. You must pass a date instance')
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
}

app.listen(port,hostname,()=>{
    console.log("Listening on 3000");
});