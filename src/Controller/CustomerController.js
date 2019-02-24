const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
/*********************************************/
const {loggererror ,loggerinfo,upload, colors} = require('../Util/myVars');
const {response,filterRequest,isThisArrayEmpty , checkToken} = require('../Util/myFunctions');

const { Seller ,products , sequelize, takhfifProduct , sellerProducts , Order,cities,addresses,customer} = require('../../sequelize');


router.post('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    var AddresFilter = filterRequest(req,res,"customerAddress");
    try {
            if (searchQuery && AddresFilter){
                customer.findAll(searchQuery).then(
                    customer=>{
                        if (!isThisArrayEmpty(customer)){
                            cities.findAll({where:{ID:req.body.CityID}}).then(
                                city=>{
                                    if (!isThisArrayEmpty(city)) {
                                        addresses.create({
                                            CustomerID:customer[0].ID,
                                            CityID:req.body.CityID,
                                            GoogleMapAddressLink:req.body.GoogleMapAddressLink,
                                            CompleteAddressDescription:req.body.CompleteAddressDescription,
                                            CustomName:req.body.CustomName
                                        });
                                        response(res,undefined).then(
                                            loggerinfo.info(req.connection.remoteAddress+"user with id : "+customer[0].ID+" add a addres")
                                        );

                                    }else {
                                        return res.status(404).json();
                                    }
                                }
                            );



                        }else {
                            return res.status(404).json({"code": 700});
                        }
                    }
                );


            }


    } catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code": 500});


    }

});

router.put('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    var AddresFilter = filterRequest(req,res,"editCustomerAddress");
    try {
        if (searchQuery && AddresFilter){
            customer.findAll(searchQuery).then(
                customer=>{
                    if (!isThisArrayEmpty(customer)){
                        if (req.body.CityID != null){
                            cities.findAll({where:{ID:req.body.CityID}}).then(
                                city=>{
                                    if (isThisArrayEmpty(city)) {
                                        return res.status(404).json();
                                    }
                                }
                            );
                        }
                        addresses.findAll({
                            where:{ID:req.body.CustomerAddressID}
                        }).then(address=>{
                            if (!isThisArrayEmpty(address)) {
                                var CustomerID =address[0].CustomerID;
                                var CityID =address[0].CityID;
                                var GoogleMapAddressLink =address[0].GoogleMapAddressLink;
                                var CompleteAddressDescription =address[0].CompleteAddressDescription;
                                var CustomName =address[0].CustomName;
                                console.log(CityID)

                                if (req.body.CityID != null) CityID=req.body.CityID;
                                if (req.body.GoogleMapAddressLink != null) GoogleMapAddressLink=req.body.GoogleMapAddressLink;
                                if (req.body.CompleteAddressDescription != null) CompleteAddressDescription=req.body.CompleteAddressDescription;
                                if (req.body.CustomName != null) CustomName=req.body.CustomName;
                                if (req.body.CustomerID != null) CustomerID=req.body.CustomerID;

                                if (req.body.CustomerID != null){}
                                addresses.update({
                                    CustomerID:CustomerID,
                                    CityID:CityID,
                                    GoogleMapAddressLink:GoogleMapAddressLink,
                                    CompleteAddressDescription:CompleteAddressDescription,
                                    CustomName:CustomName
                                },{where:{
                                        ID:req.body.CustomerAddressID
                                    }});
                                response(res,undefined).then(
                                    loggerinfo.info(req.connection.remoteAddress+"user with id : "+customer[0].ID+" edit a addres with ID: "+req.body.CustomerAddressID)
                                );

                            }else {
                                res.status(404).json({"code": 703});
                            }
                        });





                    }else {
                        return res.status(404).json({"code": 700});
                    }
                }
            );


        }


    } catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code": 500});


    }

});

router.get('/address', (req, res) => {
    var searchQuery = checkToken(req, res);
    try {
        if (searchQuery ){
            customer.findAll(searchQuery).then(
                customer=>{
                    if (!isThisArrayEmpty(customer)){
                        addresses.findAll({where: {CustomerID: customer[0].ID}}).then(
                            addresses=>{
                                response(res,addresses).then(
                                    loggerinfo.info("customer with id :"+customer[0].ID+ " get all his address")
                                )
                            }
                        )


                    }else {
                        return res.status(404).json({"code": 700});
                    }
                }
            );


        }


    } catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code": 500});


    }
});

router.post('/order', (req, res) => {
    var searchQuery = checkToken(req, res);
    var requestFilter =  filterRequest(req,res,"DoOrder");
    try {
        if (searchQuery && requestFilter){
            customer.findAll(searchQuery).then(
                customer=>{

                    if (!isThisArrayEmpty(customer)){
                        var productss = [];
                        productss =  req.body.products;
                        var KolMablagh = 0 ;
                        var status = true;
                        function getAllPrice(value, index, array){
                            sellerProducts.findAll({where:{ID:value.SellerProductID}}).then(
                                product=>{
                                    if (!isThisArrayEmpty(product)) {
                                        KolMablagh = KolMablagh + (value.Supply*product[0].Price)
                                    }
                                    else{
                                        res.status(404).json();
                                        status = false;
                                    }
                                }
                            );
                        }
                        productss.forEach(getAllPrice);

                        if (status)
                        {
                            var statusTwo = true;

                          function getAllTakhfif(value ,koleTakhfif = 0 ) {
                              return new Promise((resolve,reject)=>{
                                  sellerProducts.findAll({where: {ID: value.SellerProductID}}).then(
                                      sellerProductss => {
                                          var SellerID = sellerProductss[0].SellerID;
                                          var ProductID = sellerProductss[0].ProductID;
                                          takhfifProduct.findAll({
                                              where: {
                                                  ProductID: ProductID
                                                  , SellerID: SellerID
                                              }
                                          }).then(
                                              takhfifProduct => {
                                                  if (!isThisArrayEmpty(takhfifProduct)) {
                                                      sellerProducts.findAll({where: {ID: value.SellerProductID}}).then(
                                                          product => {
                                                              if (!isThisArrayEmpty(product)) {

                                                                  if (takhfifProduct[0].Start < new Date().getTime() < takhfifProduct[0].Finish && takhfifProduct[0].SupplyOFProduct > 0 && takhfifProduct[0].Enable && takhfifProduct[0].PachalChiStatus) {
                                                                      var ii = value.Supply;
                                                                      if (takhfifProduct[0].SupplyOFProduct > 0) {
                                                                          for (ii; ii > 0; ii = ii - 1) {
                                                                              koleTakhfif = koleTakhfif + (takhfifProduct[0].PriceBefore - takhfifProduct[0].PriceAfter);
                                                                          }
                                                                          resolve (koleTakhfif)

                                                                      }


                                                                  }


                                                              }
                                                              else {
                                                                  res.status(404).json();
                                                                  status = false;
                                                              }

                                                          }
                                                      );


                                                  }

                                              }
                                          );


                                      }
                                  );
                              })
                          }

                          productss.forEach((item)=>{
                              Promise.all([getAllTakhfif(item)
                                  .then((koleTakhfif)=>{
                                      if (status && statusTwo){

                                          sequelize.transaction().then(function(t) {
                                              Order.create({
                                                  CustomerID:customer[0].ID,
                                                  OrderDateTime:new Date().getTime(),
                                                  CustomerAddressID:req.body.CustomerAddressID,
                                                  DateTimeErsal:req.body.DateTimeErsal,
                                                  JameKol:KolMablagh,
                                                  JameKolAfterTakhfif:KolMablagh-koleTakhfif,
                                                  OrderStatus: false,
                                                  HashCode:"hashCode!"

                                              }, {
                                                  transaction: t
                                              }).then(savedOrder=> {
                                                  t.commit();
                                                  loggerinfo.info(req.connection.remoteAddress + " order saved  with id " + savedOrder.ID );
                                                  return res.status(200).json()

                                              }).catch(function (error) {
                                                  loggererror.info(req.connection.remoteAddress + "cause this erorr : " + error);
                                                  console.log(error);
                                                  t.rollback();
                                                  return res.status(400).json({"message": "Oops! Something went wrong!"})


                                              });
                                          });
                                      }
                                  })
                                  .catch((err)=>{
                                      console.log(err)
                                      res.status(500).json({"code":500});
                                      status = false

                                  })])
                          })






                        }







                    }else {
                        return res.status(404).json({"code": 700});
                    }
                }
            );


        }


    } catch (e) {
        loggererror.warn(req.connection.remoteAddress + "cause this erorr : " + error);
        res.status(500).json({"code": 500});


    }
});

router.get('/order', (req, res) => {

    var searchQuery = checkToken(req, res, "seller");
    if (searchQuery) {

        customer.findAll(searchQuery).then(customer => {

            if (isThisArrayEmpty(customer)) {

                return res.status(400).json({"code": 700});

            } else {

                Order.findAll({where:{CustomerID:customer[0].ID }}).then(
                    order=>{
                        return res.status(200).json(order);
                    }

                )

            }
        });


    }

});


module.exports = router;

