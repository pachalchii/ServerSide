-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 03, 2019 at 10:42 PM
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
  `seen_status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(0, 'آذربایجان شرقی'),
(1, 'آذربایجان شرقی'),
(2, 'اردبیل'),
(3, 'اصفهان'),
(4, 'البرز'),
(5, 'ایلام'),
(6, 'بوشهر'),
(7, 'تهران'),
(8, 'چهارمحال و بختیاری'),
(9, 'خراسان جنوبی'),
(10, 'خراسان رضوی'),
(11, 'خراسان شمالی'),
(12, 'خوزستان'),
(13, 'زنجان'),
(14, 'سمنان'),
(15, 'سیستان و بلوچستان'),
(16, 'فارس'),
(17, 'قزوین'),
(18, 'قم'),
(19, 'کردستان'),
(20, 'کرمان'),
(21, 'کرمانشاه'),
(22, 'کهگیلویه و بویراحمد'),
(23, 'گلستان'),
(24, 'گیلان'),
(25, 'لرستان'),
(26, 'مازندران'),
(27, 'مرکزی'),
(28, 'هرمزگان'),
(29, 'همدان'),
(30, 'یزد');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `birth_date` varchar(50) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT NULL,
  `family_name` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `point` int(11) DEFAULT NULL,
  `registration_date_time` varchar(50) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
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
  `pachal_chi` tinyint(1) DEFAULT NULL,
  `seller` tinyint(1) DEFAULT NULL,
  `seller_operator` tinyint(1) DEFAULT NULL,
  `support` tinyint(1) DEFAULT NULL,
  `transportar` tinyint(1) DEFAULT NULL
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
  `customer_status` tinyint(1) DEFAULT NULL,
  `seller_operator_status` tinyint(1) DEFAULT NULL,
  `supply` varchar(50) NOT NULL,
  `takhfif` tinyint(1) NOT NULL,
  `transportar_status` tinyint(1) DEFAULT NULL,
  `trasnportar_current_location` varchar(300) DEFAULT NULL,
  `ware_house_status` tinyint(1) DEFAULT NULL,
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
  `logo_image` varchar(50) NOT NULL,
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
  `status` tinyint(1) DEFAULT NULL,
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
  `status` tinyint(1) DEFAULT NULL,
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
  `status` tinyint(1) DEFAULT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `takhfif_product`
--

CREATE TABLE `takhfif_product` (
  `id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `enable` tinyint(1) DEFAULT NULL,
  `finish` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `pachal_chi_status` tinyint(1) DEFAULT NULL,
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
  `air_conditionar` tinyint(1) DEFAULT NULL,
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
  `status` tinyint(1) DEFAULT NULL,
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
  ADD KEY `customerid` (`customerid`);

--
-- Indexes for table `car_model`
--
ALTER TABLE `car_model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentid` (`parentid`);

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
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD KEY `cityid` (`cityid`);

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
  ADD KEY `seller_operatorid` (`seller_operatorid`),
  ADD KEY `ware_houseid` (`ware_houseid`),
  ADD KEY `productid` (`productid`),
  ADD KEY `transportarid` (`transportarid`);

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
  ADD KEY `groupid` (`groupid`);

--
-- Indexes for table `product_groups`
--
ALTER TABLE `product_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentid` (`parentid`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_address_cityid` (`company_address_cityid`),
  ADD KEY `seller_parentid` (`seller_parentid`),
  ADD KEY `phone_numberid` (`phone_numberid`),
  ADD KEY `typeid` (`typeid`);

--
-- Indexes for table `seller_operator`
--
ALTER TABLE `seller_operator`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sellerid` (`sellerid`);

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
  ADD KEY `productid` (`productid`),
  ADD KEY `sellerid` (`sellerid`),
  ADD KEY `unitid` (`unitid`);

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
  ADD KEY `ware_house_address_cityid` (`ware_house_address_cityid`),
  ADD KEY `sellerid` (`sellerid`);

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
  ADD KEY `productid` (`productid`),
  ADD KEY `sellerid` (`sellerid`),
  ADD KEY `unitid` (`unitid`);

--
-- Indexes for table `transportation`
--
ALTER TABLE `transportation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modelid` (`modelid`),
  ADD KEY `ware_houseid` (`ware_houseid`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`);

--
-- Constraints for table `car_model`
--
ALTER TABLE `car_model`
  ADD CONSTRAINT `car_model_ibfk_1` FOREIGN KEY (`parentid`) REFERENCES `car_model` (`id`);

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`cityid`) REFERENCES `cities` (`id`);

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`seller_operatorid`) REFERENCES `seller_operator` (`id`),
  ADD CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`ware_houseid`) REFERENCES `seller_ware_house` (`id`),
  ADD CONSTRAINT `order_product_ibfk_3` FOREIGN KEY (`productid`) REFERENCES `takhfif_product` (`id`),
  ADD CONSTRAINT `order_product_ibfk_4` FOREIGN KEY (`transportarid`) REFERENCES `transportation` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`groupid`) REFERENCES `product_groups` (`id`);

--
-- Constraints for table `product_groups`
--
ALTER TABLE `product_groups`
  ADD CONSTRAINT `product_groups_ibfk_1` FOREIGN KEY (`parentid`) REFERENCES `product_groups` (`id`);

--
-- Constraints for table `seller`
--
ALTER TABLE `seller`
  ADD CONSTRAINT `seller_ibfk_1` FOREIGN KEY (`company_address_cityid`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `seller_ibfk_2` FOREIGN KEY (`seller_parentid`) REFERENCES `seller` (`id`),
  ADD CONSTRAINT `seller_ibfk_3` FOREIGN KEY (`phone_numberid`) REFERENCES `seller_phone_number` (`id`),
  ADD CONSTRAINT `seller_ibfk_4` FOREIGN KEY (`typeid`) REFERENCES `seller_type` (`id`);

--
-- Constraints for table `seller_operator`
--
ALTER TABLE `seller_operator`
  ADD CONSTRAINT `seller_operator_ibfk_1` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`);

--
-- Constraints for table `seller_products`
--
ALTER TABLE `seller_products`
  ADD CONSTRAINT `seller_products_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `seller_products_ibfk_2` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`),
  ADD CONSTRAINT `seller_products_ibfk_3` FOREIGN KEY (`unitid`) REFERENCES `unit` (`id`);

--
-- Constraints for table `seller_ware_house`
--
ALTER TABLE `seller_ware_house`
  ADD CONSTRAINT `seller_ware_house_ibfk_1` FOREIGN KEY (`ware_house_address_cityid`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `seller_ware_house_ibfk_2` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`);

--
-- Constraints for table `takhfif_product`
--
ALTER TABLE `takhfif_product`
  ADD CONSTRAINT `takhfif_product_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `takhfif_product_ibfk_2` FOREIGN KEY (`sellerid`) REFERENCES `seller` (`id`),
  ADD CONSTRAINT `takhfif_product_ibfk_3` FOREIGN KEY (`unitid`) REFERENCES `unit` (`id`);

--
-- Constraints for table `transportation`
--
ALTER TABLE `transportation`
  ADD CONSTRAINT `transportation_ibfk_1` FOREIGN KEY (`modelid`) REFERENCES `car_model` (`id`),
  ADD CONSTRAINT `transportation_ibfk_2` FOREIGN KEY (`ware_houseid`) REFERENCES `seller_ware_house` (`id`);
