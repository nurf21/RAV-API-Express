-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2021 at 08:25 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_history`
--

INSERT INTO `order_history` (`id`, `vehicle_id`, `user_id`, `period`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(3, 1, 9, 2, 200000, 2, '2021-04-08 03:47:45', '2021-04-08 06:16:32'),
(4, 4, 9, 2, 200000, 1, '2021-04-08 03:48:51', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `gender` int(1) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mobile_phone` varchar(20) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `image`, `gender`, `name`, `mobile_phone`, `address`) VALUES
(8, 'test1@test.com', '$2b$10$MWk2kHocWukQ8BODmRPubOabVhz3fjcH5sh8vrm5aSnZ9DihicUIS', NULL, 1, 'test1', '081234567891', 'Bogor'),
(9, 'test2@test.com', '$2b$10$IX6Z5wf/L/F1xJilQMTLF.RHfSY0fhwNsIzp43AVHpl.ktjItIyQy', NULL, 2, 'test2', '081234567892', 'Bogor');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `vehicle_name` varchar(50) NOT NULL,
  `vehicle_image` varchar(200) DEFAULT NULL,
  `vehicle_price` int(11) NOT NULL,
  `vehicle_description` varchar(100) NOT NULL,
  `location` varchar(50) NOT NULL,
  `category_id` int(3) NOT NULL,
  `stock` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`id`, `vehicle_name`, `vehicle_image`, `vehicle_price`, `vehicle_description`, `location`, `category_id`, `stock`, `user_id`, `created_at`, `updated_at`) VALUES
(1, '2019 Yamaha FreeGo S', NULL, 100000, '125 cc', 'Bogor', 2, 2, 8, '2021-04-08 02:14:38', '2021-04-08 03:47:46'),
(4, '2013 Kawasaki Ninja 250FI', NULL, 100000, '250 cc', 'Bekasi', 2, 4, 8, '2021-04-08 02:20:35', '2021-04-08 03:48:51'),
(5, 'Nissan Magnite', NULL, 1000000, '999 cc', 'Bogor', 1, 1, 8, '2021-04-08 02:23:23', '2021-04-08 06:20:33'),
(6, '2018 Yamaha FreeGo S', NULL, 100000, '125 cc', 'Bogor', 2, 3, 8, '2021-04-08 02:23:50', '2021-04-08 03:47:05');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_category`
--

CREATE TABLE `vehicle_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicle_category`
--

INSERT INTO `vehicle_category` (`id`, `category_name`) VALUES
(1, 'Car'),
(2, 'Bike');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_category`
--
ALTER TABLE `vehicle_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vehicle_category`
--
ALTER TABLE `vehicle_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
