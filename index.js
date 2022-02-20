const express = require('express');
const path = require('path');
const port = 9000;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [ 
    {
        name : 'Abhishek',
        phone : '8307919102'
    },
    {
        name : 'Ramesh',
        phone : '9307978199'
    },
    {
        name : 'Mohit vashistha',
        phone : '9997648788'
    },
]
 
app.get('/',function(req,res)
{
    return res.render('home',{
        title: 'My Contacts List',
        contact_list: contactList,
    });
})

app.post('/create-contact',function(req,res)
{
    contactList.push({
        name : req.body.name,
        phone : req.body.phone,
    })

    return res.redirect('back');
})

app.get('/delete-contact',function(req,res)
{
    console.log(req.query);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone==phone)

    if(contactIndex!=-1)
    {
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
})

app.listen(port,function(err,data)
{
    if(err)
    {
        console.log('Error!',err);
    }
    console.log('Yup,server is running with port:',port);
})