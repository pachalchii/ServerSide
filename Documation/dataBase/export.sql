-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 28, 2019 at 10:13 AM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pachalChi`
--

-- --------------------------------------------------------

--
-- Table structure for table `OrderNazarSanji`
--

CREATE TABLE `OrderNazarSanji` (
  `ID` int(11) NOT NULL,
  `PachalChi` tinyint(1) DEFAULT NULL,
  `Seller` tinyint(1) DEFAULT NULL,
  `SellerOperator` tinyint(1) DEFAULT NULL,
  `Transportar` tinyint(1) DEFAULT NULL,
  `Support` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `OrderNazarSanji`
--
ALTER TABLE `OrderNazarSanji`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `OrderNazarSanji`
--
ALTER TABLE `OrderNazarSanji`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;