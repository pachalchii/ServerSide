-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 04, 2019 at 10:29 PM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pachalChi`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `complete_address_description` varchar(300) DEFAULT NULL,
  `custom_name` varchar(50) DEFAULT NULL,
  `google_map_address_link` varchar(300) DEFAULT NULL,
  `customerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `car_model`
--

CREATE TABLE `car_model` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parentid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `date_time_send` varchar(50) DEFAULT NULL,
  `message` varchar(300) NOT NULL,
  `seen_status` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `birth_date` varchar(50) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `family_name` varchar(50) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `point` int(11) DEFAULT NULL,
  `registration_date_time` varchar(50) NOT NULL,
  `status` bit(1) DEFAULT NULL,
  `theme` varchar(10) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `cityid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_nazar_sanji`
--

CREATE TABLE `order_nazar_sanji` (
  `id` int(11) NOT NULL,
  `pachal_chi` bit(1) DEFAULT NULL,
  `seller` bit(1) DEFAULT NULL,
  `seller_operator` bit(1) DEFAULT NULL,
  `support` bit(1) DEFAULT NULL,
  `transportar` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_pardakht`
--

CREATE TABLE `order_pardakht` (
  `id` int(11) NOT NULL,
  `code_peygiri` varchar(200) DEFAULT NULL,
  `date_time` varchar(50) NOT NULL,
  `mablagh` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `id` int(11) NOT NULL,
  `customer_status` bit(1) DEFAULT NULL,
  `seller_operator_status` bit(1) DEFAULT NULL,
  `supply` varchar(50) NOT NULL,
  `takhfif` bit(1) NOT NULL,
  `transportar_status` bit(1) DEFAULT NULL,
  `trasnportar_current_location` varchar(300) DEFAULT NULL,
  `ware_house_status` bit(1) DEFAULT NULL,
  `orderid` int(11) DEFAULT NULL,
  `seller_operatorid` int(11) DEFAULT NULL,
  `ware_houseid` int(11) DEFAULT NULL,
  `productid` int(11) NOT NULL,
  `transportarid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pachal_chi_roles`
--

CREATE TABLE `pachal_chi_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `groupid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_groups`
--

CREATE TABLE `product_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parentid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `id` int(11) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `complete_address_description` varchar(300) NOT NULL,
  `enabled` int(11) DEFAULT NULL,
  `established_date` varchar(50) DEFAULT NULL,
  `google_map_address_link` varchar(300) DEFAULT NULL,
  `logo_image` varchar(200) NOT NULL,
  `owner_family_name` varchar(50) NOT NULL,
  `owner_name` varchar(50) NOT NULL,
  `owner_phone_number` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `point` int(11) DEFAULT NULL,
  `registration_date_time` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `company_address_cityid` int(11) DEFAULT NULL,
  `seller_parentid` int(11) DEFAULT NULL,
  `phone_numberid` int(11) DEFAULT NULL,
  `typeid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller_operator`
--

CREATE TABLE `seller_operator` (
  `id` int(11) NOT NULL,
  `birthdate` varchar(50) DEFAULT NULL,
  `family_name` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `point` int(11) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `sellerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller_phone_number`
--

CREATE TABLE `seller_phone_number` (
  `id` int(11) NOT NULL,
  `phone_number1` varchar(50) NOT NULL,
  `phone_number2` varchar(50) DEFAULT NULL,
  `phone_number3` varchar(50) DEFAULT NULL,
  `phone_number4` varchar(50) DEFAULT NULL,
  `phone_number5` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller_products`
--

CREATE TABLE `seller_products` (
  `id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `price` varchar(50) NOT NULL,
  `price_date_time` varchar(50) NOT NULL,
  `supply_of_product` varchar(50) DEFAULT NULL,
  `unit_of_product` varchar(50) NOT NULL,
  `productid` int(11) NOT NULL,
  `sellerid` int(11) NOT NULL,
  `unitid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller_type`
--

CREATE TABLE `seller_type` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `seller_ware_house`
--

CREATE TABLE `seller_ware_house` (
  `id` int(11) NOT NULL,
  `agent_family_name` varchar(50) NOT NULL,
  `agent_name` varchar(50) NOT NULL,
  `birthdate` varchar(50) NOT NULL,
  `cell_phone_number` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `point` int(11) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `ware_house_complete_address_description` varchar(300) DEFAULT NULL,
  `ware_house_google_map_address_link` varchar(300) NOT NULL,
  `ware_house_address_cityid` int(11) NOT NULL,
  `sellerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `id` int(11) NOT NULL,
  `family_name` varchar(50) NOT NULL,
  `image` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` bit(1) DEFAULT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `takhfif_product`
--

CREATE TABLE `takhfif_product` (
  `id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `enable` bit(1) DEFAULT NULL,
  `finish` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `pachal_chi_status` bit(1) DEFAULT NULL,
  `percentage` int(11) NOT NULL,
  `price_after` varchar(50) NOT NULL,
  `price_before` varchar(50) NOT NULL,
  `start` varchar(50) NOT NULL,
  `supplyofproduct` varchar(50) DEFAULT NULL,
  `unitofproduct` varchar(50) NOT NULL,
  `productid` int(11) NOT NULL,
  `sellerid` int(11) NOT NULL,
  `unitid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `transportation`
--

CREATE TABLE `transportation` (
  `id` int(11) NOT NULL,
  `air_conditionar` bit(1) DEFAULT NULL,
  `birthdate` varchar(50) DEFAULT NULL,
  `color` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `family_name` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `pelak_number` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `point` int(11) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `modelid` int(11) NOT NULL,
  `ware_houseid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `id` int(11) NOT NULL,
  `unit_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9dief65fg5h7flob5f42xxyir` (`customerid`);

--
-- Indexes for table `car_model`
--
ALTER TABLE `car_model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbaxljox4ssxqe2itmjvksko74` (`parentid`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKl4ve9n23365ev3dg020wh1lm5` (`cityid`);

--
-- Indexes for table `order_nazar_sanji`
--
ALTER TABLE `order_nazar_sanji`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_pardakht`
--
ALTER TABLE `order_pardakht`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfnqo97whxu3au5j74rujjkcg3` (`seller_operatorid`),
  ADD KEY `FKgem07ahg33al08727eca7srsi` (`ware_houseid`),
  ADD KEY `FKrxjqyt0lr6fuffuki6udr2fj1` (`productid`),
  ADD KEY `FK98g2fq7cu90pqg14wim08j6lg` (`transportarid`);

--
-- Indexes for table `pachal_chi_roles`
--
ALTER TABLE `pachal_chi_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKi6n9yj7p2ge4iwtn1y4favixn` (`groupid`);

--
-- Indexes for table `product_groups`
--
ALTER TABLE `product_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnc6ytea50q24bq6q1m7vtnhcw` (`parentid`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1mw8nt7eck09j4iugtgyhedp3` (`company_address_cityid`),
  ADD KEY `FKgaiy0hqrawmb1eiq2p7re1mrk` (`seller_parentid`),
  ADD KEY `FK1hfun1q7sq3k0fmjyk0i5uftr` (`phone_numberid`),
  ADD KEY `FK2uxhl29jg9d24w9u078ksluo3` (`typeid`);

--
-- Indexes for table `seller_operator`
--
ALTER TABLE `seller_operator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8kcikjgyoxkpdwwol2dufpfwq` (`sellerid`);

--
-- Indexes for table `seller_phone_number`
--
ALTER TABLE `seller_phone_number`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller_products`
--
ALTER TABLE `seller_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKiok0ou6e2heihjna56sbaix22` (`productid`),
  ADD KEY `FKqcd850pcdjlju3kk0jb3h1jju` (`sellerid`),
  ADD KEY `FK10ixcmxx1bofwxfgb9mq63j0i` (`unitid`);

--
-- Indexes for table `seller_type`
--
ALTER TABLE `seller_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller_ware_house`
--
ALTER TABLE `seller_ware_house`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKhtm0ui810hyu1xmb1bbq0nv7o` (`ware_house_address_cityid`),
  ADD KEY `FK6u07h19i3bqx6uc4nprpewkx8` (`sellerid`);

--
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `takhfif_product`
--
ALTER TABLE `takhfif_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqem13fmkw46u8bilgujcsyipy` (`productid`),
  ADD KEY `FK5w90y8ngr9ptuginimv0v5kft` (`sellerid`),
  ADD KEY `FKlmmg2aqefseuogr8bougxrntc` (`unitid`);

--
-- Indexes for table `transportation`
--
ALTER TABLE `transportation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmm5813g5r499vashw0rxtpc5f` (`modelid`),
  ADD KEY `FKdh7m0nvtqjxhnbtw0yi28eff6` (`ware_houseid`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `car_model`
--
ALTER TABLE `car_model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_nazar_sanji`
--
ALTER TABLE `order_nazar_sanji`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_pardakht`
--
ALTER TABLE `order_pardakht`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pachal_chi_roles`
--
ALTER TABLE `pachal_chi_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `seller`
--
ALTER TABLE `seller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `seller_operator`
--
ALTER TABLE `seller_operator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `seller_phone_number`
--
ALTER TABLE `seller_phone_number`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `seller_products`
--
ALTER TABLE `seller_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `seller_ware_house`
--
ALTER TABLE `seller_ware_house`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `takhfif_product`
--
ALTER TABLE `takhfif_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `transportation`
--
ALTER TABLE `transportation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `FK9dief65fg5h7flob5f42xxyir` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`);

--
-- Constraints for table `car_model`
--
ALTER TABLE `car_model`
  ADD CONSTRAINT `FKbaxljox4ssxqe2itmjvksko74` FOREIGN KEY (`parentid`) REFERENCES `car_model` (`id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `FKl4ve9n23365ev3dg020wh1lm5` FOREIGN KEY (`cityid`) REFERENCES `cities` (`id`);

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `FK98g2fq7cu90pqg14wim08j6lg` FOREIGN KEY (`transportarid`) REFERENCES `transportation` (`id`),
  ADD CONSTRAINT `FKfnqo97whxu3au5j74rujjkcg3` FOREIGN KEY (`seller_operatorid`) REFERENCES `seller_operator` (`id`),
  ADD CONSTRAINT `FKgem07ahg33al08727eca7srsi` FOREIGN KEY (`ware_houseid`) REFERENCES `seller_ware_house` (`id`),
  ADD CONSTRAINT `FKrxjqyt0lr6fuffuki6udr2fj1` FOREIGN KEY (`productid`) REFERENCES `takhfif_product` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKi6n9yj7p2ge4iwtn1y4favixn` FOREIGN KEY (`groupid`) REFERENCES `product_groups` (`id`);

--
-- Constraints for table `product_groups`
--
ALTER TABLE `product_groups`
  ADD CONSTRAINT `FKnc6ytea50q24bq6q1m7vtnhcw` FOREIGN KEY (`parentid`) REFERENCES `product_groups` (`id`);

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `FK1hfun1q7sq3k0fmjyk0i5uftr` FOREIGN KEY (`phone_numberid`) REFERENCES `seller_phone_number` (`id`),
  ADD CONSTRAINT `FK1mw8nt7eck09j4iugtgyhedp3` FOREIGN KEY (`company_address_cityid`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `FK2uxhl29jg9d24w9u078ksluo3` FOREIGN KEY (`typeid`) REFERENCES `seller_type` (`id`),
  ADD CONSTRAINT `FKgaiy0hqrawmb1eiq2p7re1mrk` FOREIGN KEY (`seller_parentid`) REFERENCES `seller` (`id`);

--
-- Constraints for table `seller_operator`
--
ALTER TABLE `seller_operator`
  ADD CONSTRAINT `FK8kcikjgyoxkpdwwol2dufpfwq` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`);

--
-- Constraints for table `seller_products`
--
ALTER TABLE `seller_products`
  ADD CONSTRAINT `FK10ixcmxx1bofwxfgb9mq63j0i` FOREIGN KEY (`unitid`) REFERENCES `unit` (`id`),
  ADD CONSTRAINT `FKiok0ou6e2heihjna56sbaix22` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKqcd850pcdjlju3kk0jb3h1jju` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`);

--
-- Constraints for table `seller_ware_house`
--
ALTER TABLE `seller_ware_house`
  ADD CONSTRAINT `FK6u07h19i3bqx6uc4nprpewkx8` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`),
  ADD CONSTRAINT `FKhtm0ui810hyu1xmb1bbq0nv7o` FOREIGN KEY (`ware_house_address_cityid`) REFERENCES `cities` (`id`);

--
-- Constraints for table `takhfif_product`
--
ALTER TABLE `takhfif_product`
  ADD CONSTRAINT `FK5w90y8ngr9ptuginimv0v5kft` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`),
  ADD CONSTRAINT `FKlmmg2aqefseuogr8bougxrntc` FOREIGN KEY (`unitid`) REFERENCES `unit` (`id`),
  ADD CONSTRAINT `FKqem13fmkw46u8bilgujcsyipy` FOREIGN KEY (`productid`) REFERENCES `products` (`id`);

--
-- Constraints for table `transportation`
--
ALTER TABLE `transportation`
  ADD CONSTRAINT `FKdh7m0nvtqjxhnbtw0yi28eff6` FOREIGN KEY (`ware_houseid`) REFERENCES `seller_ware_house` (`id`),
  ADD CONSTRAINT `FKmm5813g5r499vashw0rxtpc5f` FOREIGN KEY (`modelid`) REFERENCES `car_model` (`id`);
