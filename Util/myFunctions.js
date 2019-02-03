const { cities } = require('./../sequelize');
const express = require('express');
const bodyParser = require('body-parser');

function fillDataBase() {
    var city = [  { id:0 , name:"آذربایجان شرقی" },
                    { id:1 , name:"آذربایجان شرقی" },
                    { id:2 , name:"اردبیل" },
                    { id:3 , name:"اصفهان" },
                    { id:4 , name:"البرز" },
                    { id:5 , name:"ایلام" },
                    { id:6 , name:"بوشهر" },
                    { id:7 , name:"تهران" },
                    { id:8 , name:"چهارمحال و بختیاری" },
                    { id:9 , name:"خراسان جنوبی" },
                    { id:10 , name:"خراسان رضوی" },
                    { id:11 , name:"خراسان شمالی" },
                    { id:12 , name:"خوزستان" },
                    { id:13 , name:"زنجان" },
                    { id:14 , name:"سمنان" },
                    { id:15 , name:"سیستان و بلوچستان" },
                    { id:16 , name:"فارس" },
                    { id:17 , name:"قزوین" },
                    { id:18 , name:"قم" },
                    { id:19 , name:"کردستان" },
                    { id:20 , name:"کرمان" },
                    { id:21 , name:"کرمانشاه" },
                    { id:22 , name:"کهگیلویه و بویراحمد" },
                    { id:23 , name:"گلستان" },
                    { id:24 , name:"گیلان" },
                    { id:25 , name:"لرستان" },
                    { id:26 , name:"مازندران" },
                    { id:27 , name:"مرکزی" },
                    { id:28 , name:"هرمزگان" },
                    { id:29 , name:"همدان" },
                    { id:30 , name:"یزد" }


    ];
    city.forEach(insert);

    function insert(value, index, array) {
        cities.create(
            {

                id: index,
                name:value.name
            }
        ).catch(err=>{console.log(err)});
    }


}


exports.fillDataBase =fillDataBase();