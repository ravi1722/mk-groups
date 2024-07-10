-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2024 at 08:25 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mk_groups`
--

-- --------------------------------------------------------

--
-- Table structure for table `amountmaster`
--

CREATE TABLE `amountmaster` (
  `id` int(11) NOT NULL,
  `amount` int(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amountmaster`
--

INSERT INTO `amountmaster` (`id`, `amount`) VALUES
(1, 100000),
(2, 200000),
(3, 300000),
(4, 400000),
(5, 500000),
(6, 600000),
(7, 700000),
(8, 800000),
(12, 850000),
(13, 900000);

-- --------------------------------------------------------

--
-- Table structure for table `amounttrans`
--

CREATE TABLE `amounttrans` (
  `transid` int(11) NOT NULL,
  `amountid` int(25) NOT NULL DEFAULT 0,
  `userid` int(25) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `amounttrans`
--

INSERT INTO `amounttrans` (`transid`, `amountid`, `userid`) VALUES
(1, 1, 1),
(3, 1, 3),
(4, 2, 4),
(5, 3, 5),
(6, 3, 4),
(7, 1, 7),
(8, 2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `entrytrans`
--

CREATE TABLE `entrytrans` (
  `transid` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `amounttransid` int(25) NOT NULL DEFAULT 0,
  `amount` int(250) NOT NULL,
  `mopid` int(25) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entrytrans`
--

INSERT INTO `entrytrans` (`transid`, `date`, `amounttransid`, `amount`, `mopid`) VALUES
(1, '2024-07-01 00:00:00', 1, 12000, 2),
(2, '2024-08-01 00:00:00', 1, 8000, 2),
(3, '2024-07-01 00:00:00', 7, 7000, 2),
(4, '2024-07-01 00:00:00', 3, 1200, 0),
(5, '2024-07-01 00:00:00', 8, 1500, 0),
(6, '2024-07-01 00:00:00', 4, 23000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mop_master`
--

CREATE TABLE `mop_master` (
  `id` int(11) NOT NULL,
  `modeofpayment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mop_master`
--

INSERT INTO `mop_master` (`id`, `modeofpayment`) VALUES
(1, 'Cash'),
(2, 'Debit Card'),
(3, 'Credit Card');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(25) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `startmonth` datetime DEFAULT NULL,
  `isadmin` int(25) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `email`, `email_verified_at`, `password`, `startmonth`, `isadmin`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'ravi', '789989899', 'ravi@gmail.com', NULL, '$2y$12$kPNM2E01ejh1dE6EiHtU8ewPA24G.SStsi/ZEyxlLGDeQ4Q8q8ax2', '2024-07-08 22:06:18', 1, NULL, '2024-07-08 10:41:44', '2024-07-08 10:41:44'),
(3, 'test0', '7845545123', 'test0@gmail.com', NULL, '$2y$12$ju.JG4TQ8qHJxHM3zDD9Muw0G4l6IxKvBqHixMGsLrZbVANZT/s5q', '2024-07-08 22:06:18', 0, NULL, '2024-07-08 10:52:09', NULL),
(4, 'test2', 'test2@gmail.com', '1212121212', NULL, '$2y$12$ju.JG4TQ8qHJxHM3zDD9Muw0G4l6IxKvBqHixMGsLrZbVANZT/s5q', '2024-07-08 22:06:18', 0, NULL, '2024-07-08 10:53:34', NULL),
(5, 'nouser0', 'nouser0@gmail.com', '2020202020', NULL, '$2y$12$ju.JG4TQ8qHJxHM3zDD9Muw0G4l6IxKvBqHixMGsLrZbVANZT/s5q', '2024-07-08 22:06:18', 0, NULL, '2024-07-08 10:56:01', NULL),
(6, 'test3', 'test3@gmail.com', '7896541235', NULL, '$2y$12$ju.JG4TQ8qHJxHM3zDD9Muw0G4l6IxKvBqHixMGsLrZbVANZT/s5q', '2024-06-08 00:00:00', 0, NULL, '2024-07-08 11:09:48', NULL),
(7, 'kuttymani', '878465465', 'kuttymani@nf.i', NULL, '$2y$12$ju.JG4TQ8qHJxHM3zDD9Muw0G4l6IxKvBqHixMGsLrZbVANZT/s5q', '2024-07-10 00:00:00', 0, NULL, '2024-07-10 11:47:28', NULL),
(8, 'kja', '3933933939', 'kja@msk.co', NULL, '$2y$12$ju.JG4TQ8qHJxHM3zDD9Muw0G4l6IxKvBqHixMGsLrZbVANZT/s5q', '2024-07-10 00:00:00', 0, NULL, '2024-07-10 12:04:51', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amountmaster`
--
ALTER TABLE `amountmaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `amounttrans`
--
ALTER TABLE `amounttrans`
  ADD PRIMARY KEY (`transid`);

--
-- Indexes for table `entrytrans`
--
ALTER TABLE `entrytrans`
  ADD PRIMARY KEY (`transid`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mop_master`
--
ALTER TABLE `mop_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amountmaster`
--
ALTER TABLE `amountmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `amounttrans`
--
ALTER TABLE `amounttrans`
  MODIFY `transid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `entrytrans`
--
ALTER TABLE `entrytrans`
  MODIFY `transid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mop_master`
--
ALTER TABLE `mop_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
