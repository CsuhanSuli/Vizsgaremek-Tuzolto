-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 23. 09:03
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `firedepartment`
--
CREATE DATABASE IF NOT EXISTS `firedepartment` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `firedepartment`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `typeId` bigint(20) UNSIGNED NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cartypes`
--

CREATE TABLE `cartypes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `typename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car_places`
--

CREATE TABLE `car_places` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `place` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exams`
--

CREATE TABLE `exams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `examType` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exam_types`
--

CREATE TABLE `exam_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `typName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `exam_users`
--

CREATE TABLE `exam_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `examDate` date NOT NULL,
  `examId` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
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
-- Tábla szerkezet ehhez a táblához `forums`
--

CREATE TABLE `forums` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `header` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `typeId` bigint(20) UNSIGNED NOT NULL,
  `place` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `forum_types`
--

CREATE TABLE `forum_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `typeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0000_00_00_000001_create_exam_types_table', 1),
(2, '0000_00_00_000003_create_exams_table', 1),
(3, '0001_01_01_0000010_create_jobs_table', 1),
(4, '0001_01_01_000008_create_users_table', 1),
(5, '0001_01_01_000009_create_cache_table', 1),
(6, '0001_01_01_000011_create_exam_users_table', 1),
(7, '0002_00_00_091650_create_car_places_table', 1),
(8, '0002_00_01_091814_create_cartypes_table', 1),
(9, '0002_00_02_091546_create_cars_table', 1),
(10, '0002_00_03_091705_create_tool_types_table', 1),
(11, '0002_00_04_091642_create_tools_table', 1),
(12, '0003_00_00_091933_create_forum_types_table', 1),
(13, '0003_00_01_091913_create_forums_table', 1),
(14, '0004_00_00_091854_create_review_types_table', 1),
(15, '0004_00_01_091848_create_reviews_table', 1),
(16, '0005_00_00_000000_create_schedule_types_table', 1),
(17, '0005_00_01_000000_create_schedules_table', 1),
(18, '2026_01_01_150852_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'api-token', '59a4712c3b98ab14d075c3f699d50a2c1b4cc0756e3e14ceae8d70616fb55bf3', '[\"*\"]', NULL, NULL, '2026-02-23 06:45:33', '2026-02-23 06:45:33'),
(2, 'App\\Models\\User', 2, 'api-token', '5f52a9d6b821e356a4a34b35a96305b2fd73232cc8625b1ce410ae042821ab36', '[\"*\"]', NULL, NULL, '2026-02-23 06:45:50', '2026-02-23 06:45:50'),
(3, 'App\\Models\\User', 3, 'api-token', '2c83143b5894e84c619dd2a113724dae3e4d01bf5fd243ad46ea8b20bea1e719', '[\"*\"]', NULL, NULL, '2026-02-23 06:45:53', '2026-02-23 06:45:53'),
(4, 'App\\Models\\User', 4, 'api-token', '810174d5dc20a42dfb8b74bac6dd121b23518e8b5025b5ab427a070bb763fa86', '[\"*\"]', NULL, NULL, '2026-02-23 06:45:57', '2026-02-23 06:45:57'),
(5, 'App\\Models\\User', 5, 'api-token', 'c355ec870ebf777892af1dea19079f9cbe67533ba5d7cfb77a7823763eaeb135', '[\"*\"]', NULL, NULL, '2026-02-23 07:03:10', '2026-02-23 07:03:10'),
(6, 'App\\Models\\User', 6, 'api-token', '7ae4037017d664af5a4d6493ef5f3428446230984caef6cb8f2a337363ce3f06', '[\"*\"]', NULL, NULL, '2026-02-23 07:03:15', '2026-02-23 07:03:15');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `reviewDate` date NOT NULL,
  `isHappend` tinyint(1) NOT NULL,
  `isSuccesfull` tinyint(1) NOT NULL,
  `reviewTypeId` bigint(20) UNSIGNED NOT NULL,
  `whatIsIt` varchar(255) NOT NULL,
  `objectId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `review_types`
--

CREATE TABLE `review_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `typeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `schedules`
--

CREATE TABLE `schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `scheduleTypeid` bigint(20) UNSIGNED NOT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `schedule_types`
--

CREATE TABLE `schedule_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tools`
--

CREATE TABLE `tools` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `toolTypeId` bigint(20) UNSIGNED NOT NULL,
  `placeId` bigint(20) UNSIGNED NOT NULL,
  `carId` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tool_types`
--

CREATE TABLE `tool_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `typeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `fortyHours` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `fortyHours`, `remember_token`, `created_at`, `updated_at`, `isAdmin`) VALUES
(1, 'testing1', 'testing1@gmail.com', NULL, '$2y$12$GKGJ5sAlR8weoZVp5rL7VOI70vwx3/og6OuX3jzIbRiNNDWQ1UbRW', 0, NULL, '2026-02-23 06:45:33', '2026-02-23 06:45:33', 1),
(2, 'testing2', 'testing2@gmail.com', NULL, '$2y$12$sDFp4xToeASPOsMsWpG8tefrtezNcTgWg0wuOZrysvEAvLHBJQLAa', 0, NULL, '2026-02-23 06:45:50', '2026-02-23 06:45:50', 0),
(3, 'testing3', 'testing3@gmail.com', NULL, '$2y$12$Ay5qfkHUziYppgcVQ3ywSOLBOtScurt0614oUjhDcLoJy0lK1EBhO', 0, NULL, '2026-02-23 06:45:53', '2026-02-23 06:45:53', 0),
(4, 'testing4', 'testing4@gmail.com', NULL, '$2y$12$Z0pf/B5z2uFRxUIqwBxGteiv35kPWBrBAHaoC6cxvy1jZi37DUZWa', 0, NULL, '2026-02-23 06:45:57', '2026-02-23 06:45:57', 0),
(5, 'testing5', 'testing5@gmail.com', NULL, '$2y$12$omWf3a1jTCiYVIrjWxSx5uEYesg7/Svm7Fx9Ad74wxZmLxwRaClkG', 0, NULL, '2026-02-23 07:03:10', '2026-02-23 07:03:10', 0),
(6, 'testing6', 'testing6@gmail.com', NULL, '$2y$12$1CWnrGBbfZl5CIvOVPnnmOgrplR83IniOe4MSsv71z2tX16Do6F8.', 0, NULL, '2026-02-23 07:03:15', '2026-02-23 07:03:15', 0);

INSERT INTO `schedule_types` (`id`, `created_at`, `updated_at`, `name`, `color`) VALUES
(1, '2026-02-23 09:05:00', '2026-02-23 09:05:00', '1/5', '#0000FF'),
(2, '2026-02-23 09:05:00', '2026-02-23 09:05:00', '2/5', '#0000FF'),
(3, '2026-02-23 09:05:00', '2026-02-23 09:05:00', '3/5', '#0000FF'),
(4, '2026-02-23 09:05:00', '2026-02-23 09:05:00', '4/5', '#0000FF'),
(5, '2026-02-23 09:05:00', '2026-02-23 09:05:00', '5/5', '#0000FF'),
(6, '2026-02-23 09:06:00', '2026-02-23 09:06:00', 'Sick leave', '#FF0000');

INSERT INTO `schedules` (`id`, `created_at`, `updated_at`, `scheduleTypeid`, `userId`, `date`) VALUES
(25, '2026-02-23 09:09:00', '2026-02-23 09:09:00', 1, 1, '2026-02-01'),
(26, '2026-02-23 09:09:05', '2026-02-23 09:09:05', 2, 2, '2026-02-01'),
(27, '2026-02-23 09:09:10', '2026-02-23 09:09:10', 3, 3, '2026-02-01'),
(28, '2026-02-23 09:09:15', '2026-02-23 09:09:15', 1, 2, '2026-02-02'),
(29, '2026-02-23 09:09:20', '2026-02-23 09:09:20', 2, 3, '2026-02-02'),
(30, '2026-02-23 09:09:25', '2026-02-23 09:09:25', 3, 4, '2026-02-02'),
(31, '2026-02-23 09:09:30', '2026-02-23 09:09:30', 1, 3, '2026-02-03'),
(32, '2026-02-23 09:09:35', '2026-02-23 09:09:35', 2, 4, '2026-02-03'),
(33, '2026-02-23 09:09:40', '2026-02-23 09:09:40', 3, 5, '2026-02-03'),
(34, '2026-02-23 09:09:45', '2026-02-23 09:09:45', 1, 4, '2026-02-04'),
(35, '2026-02-23 09:09:50', '2026-02-23 09:09:50', 2, 5, '2026-02-04'),
(36, '2026-02-23 09:09:55', '2026-02-23 09:09:55', 3, 6, '2026-02-04'),
(37, '2026-02-23 09:10:00', '2026-02-23 09:10:00', 1, 5, '2026-02-05'),
(38, '2026-02-23 09:10:05', '2026-02-23 09:10:05', 2, 6, '2026-02-05'),
(39, '2026-02-23 09:10:10', '2026-02-23 09:10:10', 3, 1, '2026-02-05'),
(40, '2026-02-23 09:10:15', '2026-02-23 09:10:15', 1, 6, '2026-02-06'),
(41, '2026-02-23 09:10:20', '2026-02-23 09:10:20', 2, 1, '2026-02-06'),
(42, '2026-02-23 09:10:25', '2026-02-23 09:10:25', 3, 2, '2026-02-06'),
(43, '2026-02-23 09:10:30', '2026-02-23 09:10:30', 1, 1, '2026-02-07'),
(44, '2026-02-23 09:10:35', '2026-02-23 09:10:35', 2, 2, '2026-02-07'),
(45, '2026-02-23 09:10:40', '2026-02-23 09:10:40', 3, 3, '2026-02-07'),
(46, '2026-02-23 09:10:45', '2026-02-23 09:10:45', 1, 2, '2026-02-08'),
(47, '2026-02-23 09:10:50', '2026-02-23 09:10:50', 2, 3, '2026-02-08'),
(48, '2026-02-23 09:10:55', '2026-02-23 09:10:55', 3, 4, '2026-02-08'),
(49, '2026-02-23 09:11:00', '2026-02-23 09:11:00', 1, 3, '2026-02-09'),
(50, '2026-02-23 09:11:05', '2026-02-23 09:11:05', 2, 4, '2026-02-09'),
(51, '2026-02-23 09:11:10', '2026-02-23 09:11:10', 3, 5, '2026-02-09'),
(52, '2026-02-23 09:11:15', '2026-02-23 09:11:15', 1, 4, '2026-02-10'),
(53, '2026-02-23 09:11:20', '2026-02-23 09:11:20', 2, 5, '2026-02-10'),
(54, '2026-02-23 09:11:25', '2026-02-23 09:11:25', 3, 6, '2026-02-10'),
(55, '2026-02-23 09:11:30', '2026-02-23 09:11:30', 1, 5, '2026-02-11'),
(56, '2026-02-23 09:11:35', '2026-02-23 09:11:35', 2, 6, '2026-02-11'),
(57, '2026-02-23 09:11:40', '2026-02-23 09:11:40', 3, 1, '2026-02-11'),
(58, '2026-02-23 09:11:45', '2026-02-23 09:11:45', 1, 6, '2026-02-12'),
(59, '2026-02-23 09:11:50', '2026-02-23 09:11:50', 2, 1, '2026-02-12'),
(60, '2026-02-23 09:11:55', '2026-02-23 09:11:55', 3, 2, '2026-02-12'),
(61, '2026-02-23 09:12:00', '2026-02-23 09:12:00', 1, 1, '2026-02-13'),
(62, '2026-02-23 09:12:05', '2026-02-23 09:12:05', 2, 2, '2026-02-13'),
(63, '2026-02-23 09:12:10', '2026-02-23 09:12:10', 3, 3, '2026-02-13'),
(64, '2026-02-23 09:12:15', '2026-02-23 09:12:15', 1, 2, '2026-02-14'),
(65, '2026-02-23 09:12:20', '2026-02-23 09:12:20', 2, 3, '2026-02-14'),
(66, '2026-02-23 09:12:25', '2026-02-23 09:12:25', 3, 4, '2026-02-14'),
(67, '2026-02-23 09:12:30', '2026-02-23 09:12:30', 1, 3, '2026-02-15'),
(68, '2026-02-23 09:12:35', '2026-02-23 09:12:35', 2, 4, '2026-02-15'),
(69, '2026-02-23 09:12:40', '2026-02-23 09:12:40', 3, 5, '2026-02-15'),
(70, '2026-02-23 09:12:45', '2026-02-23 09:12:45', 1, 4, '2026-02-16'),
(71, '2026-02-23 09:12:50', '2026-02-23 09:12:50', 2, 5, '2026-02-16'),
(72, '2026-02-23 09:12:55', '2026-02-23 09:12:55', 3, 6, '2026-02-16'),
(73, '2026-02-23 09:13:00', '2026-02-23 09:13:00', 1, 5, '2026-02-17'),
(74, '2026-02-23 09:13:05', '2026-02-23 09:13:05', 2, 6, '2026-02-17'),
(75, '2026-02-23 09:13:10', '2026-02-23 09:13:10', 3, 1, '2026-02-17'),
(76, '2026-02-23 09:13:15', '2026-02-23 09:13:15', 1, 6, '2026-02-18'),
(77, '2026-02-23 09:13:20', '2026-02-23 09:13:20', 2, 1, '2026-02-18'),
(78, '2026-02-23 09:13:25', '2026-02-23 09:13:25', 3, 2, '2026-02-18'),
(79, '2026-02-23 09:13:30', '2026-02-23 09:13:30', 1, 1, '2026-02-19'),
(80, '2026-02-23 09:13:35', '2026-02-23 09:13:35', 2, 2, '2026-02-19'),
(81, '2026-02-23 09:13:40', '2026-02-23 09:13:40', 3, 3, '2026-02-19'),
(82, '2026-02-23 09:13:45', '2026-02-23 09:13:45', 1, 2, '2026-02-20'),
(83, '2026-02-23 09:13:50', '2026-02-23 09:13:50', 2, 3, '2026-02-20'),
(84, '2026-02-23 09:13:55', '2026-02-23 09:13:55', 3, 4, '2026-02-20'),
(85, '2026-02-23 09:14:00', '2026-02-23 09:14:00', 1, 3, '2026-02-21'),
(86, '2026-02-23 09:14:05', '2026-02-23 09:14:05', 2, 4, '2026-02-21'),
(87, '2026-02-23 09:14:10', '2026-02-23 09:14:10', 3, 5, '2026-02-21'),
(88, '2026-02-23 09:14:15', '2026-02-23 09:14:15', 1, 4, '2026-02-22'),
(89, '2026-02-23 09:14:20', '2026-02-23 09:14:20', 2, 5, '2026-02-22'),
(90, '2026-02-23 09:14:25', '2026-02-23 09:14:25', 3, 6, '2026-02-22'),
(91, '2026-02-23 09:14:30', '2026-02-23 09:14:30', 1, 5, '2026-02-23'),
(92, '2026-02-23 09:14:35', '2026-02-23 09:14:35', 2, 6, '2026-02-23'),
(93, '2026-02-23 09:14:40', '2026-02-23 09:14:40', 3, 1, '2026-02-23'),
(94, '2026-02-23 09:14:45', '2026-02-23 09:14:45', 1, 6, '2026-02-24'),
(95, '2026-02-23 09:14:50', '2026-02-23 09:14:50', 2, 1, '2026-02-24'),
(96, '2026-02-23 09:14:55', '2026-02-23 09:14:55', 3, 2, '2026-02-24'),
(97, '2026-02-23 09:15:00', '2026-02-23 09:15:00', 1, 1, '2026-02-25'),
(98, '2026-02-23 09:15:05', '2026-02-23 09:15:05', 2, 2, '2026-02-25'),
(99, '2026-02-23 09:15:10', '2026-02-23 09:15:10', 3, 3, '2026-02-25'),
(100,'2026-02-23 09:15:15', '2026-02-23 09:15:15', 1, 2, '2026-02-26'),
(101,'2026-02-23 09:15:20', '2026-02-23 09:15:20', 2, 3, '2026-02-26'),
(102,'2026-02-23 09:15:25', '2026-02-23 09:15:25', 3, 4, '2026-02-26'),
(103,'2026-02-23 09:15:30', '2026-02-23 09:15:30', 1, 3, '2026-02-27'),
(104,'2026-02-23 09:15:35', '2026-02-23 09:15:35', 2, 4, '2026-02-27'),
(105,'2026-02-23 09:15:40', '2026-02-23 09:15:40', 3, 5, '2026-02-27'),
(106,'2026-02-23 09:15:45', '2026-02-23 09:15:45', 1, 4, '2026-02-28'),
(107,'2026-02-23 09:15:50', '2026-02-23 09:15:50', 2, 5, '2026-02-28'),
(108,'2026-02-23 09:15:55', '2026-02-23 09:15:55', 3, 6, '2026-02-28');


--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cars_typeid_foreign` (`typeId`);

--
-- A tábla indexei `cartypes`
--
ALTER TABLE `cartypes`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `car_places`
--
ALTER TABLE `car_places`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exams_examtype_foreign` (`examType`);

--
-- A tábla indexei `exam_types`
--
ALTER TABLE `exam_types`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `exam_users`
--
ALTER TABLE `exam_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_users_examid_foreign` (`examId`),
  ADD KEY `exam_users_userid_foreign` (`userId`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `forums`
--
ALTER TABLE `forums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `forums_typeid_foreign` (`typeId`);

--
-- A tábla indexei `forum_types`
--
ALTER TABLE `forum_types`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- A tábla indexei `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- A tábla indexei `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_reviewtypeid_foreign` (`reviewTypeId`),
  ADD KEY `reviews_objectid_foreign` (`objectId`);

--
-- A tábla indexei `review_types`
--
ALTER TABLE `review_types`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_scheduletypeid_foreign` (`scheduleTypeid`),
  ADD KEY `schedules_userid_foreign` (`userId`);

--
-- A tábla indexei `schedule_types`
--
ALTER TABLE `schedule_types`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tools_tooltypeid_foreign` (`toolTypeId`),
  ADD KEY `tools_placeid_foreign` (`placeId`),
  ADD KEY `tools_carid_foreign` (`carId`);

--
-- A tábla indexei `tool_types`
--
ALTER TABLE `tool_types`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `cartypes`
--
ALTER TABLE `cartypes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `car_places`
--
ALTER TABLE `car_places`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `exams`
--
ALTER TABLE `exams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `exam_types`
--
ALTER TABLE `exam_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `exam_users`
--
ALTER TABLE `exam_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `forums`
--
ALTER TABLE `forums`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `forum_types`
--
ALTER TABLE `forum_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `review_types`
--
ALTER TABLE `review_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `schedule_types`
--
ALTER TABLE `schedule_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tools`
--
ALTER TABLE `tools`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tool_types`
--
ALTER TABLE `tool_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_typeid_foreign` FOREIGN KEY (`typeId`) REFERENCES `cartypes` (`id`);

--
-- Megkötések a táblához `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_examtype_foreign` FOREIGN KEY (`examType`) REFERENCES `exam_types` (`id`);

--
-- Megkötések a táblához `exam_users`
--
ALTER TABLE `exam_users`
  ADD CONSTRAINT `exam_users_examid_foreign` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  ADD CONSTRAINT `exam_users_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `forums`
--
ALTER TABLE `forums`
  ADD CONSTRAINT `forums_typeid_foreign` FOREIGN KEY (`typeId`) REFERENCES `forum_types` (`id`);

--
-- Megkötések a táblához `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_objectid_foreign` FOREIGN KEY (`objectId`) REFERENCES `cars` (`id`),
  ADD CONSTRAINT `reviews_reviewtypeid_foreign` FOREIGN KEY (`reviewTypeId`) REFERENCES `review_types` (`id`);

--
-- Megkötések a táblához `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_scheduletypeid_foreign` FOREIGN KEY (`scheduleTypeid`) REFERENCES `schedule_types` (`id`),
  ADD CONSTRAINT `schedules_userid_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `tools`
--
ALTER TABLE `tools`
  ADD CONSTRAINT `tools_carid_foreign` FOREIGN KEY (`carId`) REFERENCES `cars` (`id`),
  ADD CONSTRAINT `tools_placeid_foreign` FOREIGN KEY (`placeId`) REFERENCES `car_places` (`id`),
  ADD CONSTRAINT `tools_tooltypeid_foreign` FOREIGN KEY (`toolTypeId`) REFERENCES `tool_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
