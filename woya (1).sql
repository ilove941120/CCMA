-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-04-21 08:57:48
-- 伺服器版本： 10.4.18-MariaDB
-- PHP 版本： 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `woya`
--

-- --------------------------------------------------------

--
-- 資料表結構 `banner_title`
--

CREATE TABLE `banner_title` (
  `ID` tinyint(20) NOT NULL,
  `mainTitle` text NOT NULL,
  `subTitle` text NOT NULL,
  `color` text NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `banner_title`
--

INSERT INTO `banner_title` (`ID`, `mainTitle`, `subTitle`, `color`, `img`) VALUES
(1, '第一個標題', '第一個副標題', 'bg_green', 'img/ph2.jpg'),
(2, '一碗湯麵', '或許故事有點長，請耐心看下去唷！！', 'bg_red', 'img/ph1.jpg'),
(3, '太多的來不及\r\n', '好友的母親出門倒垃圾，一輛急駛摩托車猛然撞擊', 'bg_blue', 'img/ph3.jpg');

-- --------------------------------------------------------

--
-- 資料表結構 `my_table`
--

CREATE TABLE `my_table` (
  `cID` tinyint(3) NOT NULL,
  `name` varchar(20) NOT NULL,
  `title` text NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `my_table`
--

INSERT INTO `my_table` (`cID`, `name`, `title`, `email`) VALUES
(1, 'LKB', '哈囉終於成功了', 'a123456@gmail.com');

-- --------------------------------------------------------

--
-- 資料表結構 `news`
--

CREATE TABLE `news` (
  `cID` tinyint(3) UNSIGNED NOT NULL,
  `cDay` date NOT NULL,
  `cTitle` text COLLATE utf8_unicode_ci NOT NULL,
  `cContent` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `news`
--

INSERT INTO `news` (`cID`, `cDay`, `cTitle`, `cContent`) VALUES
(8, '2021-04-19', '2太多的來不及', '好友的母親出門倒垃圾，一輛急駛摩托車猛然撞擊，就此倒地不起。這位伯母原本有心臟宿疾，家裡隨時準備著氧氣筒。然而萬萬沒有料到，她是用這種方式離開。\r\n\r\n子女完全不能接受，哭著說：「媽媽一句交代都沒就走了！」他們以為，媽媽即使心臟病發作，也總還有時間跟他們說說話，交代幾句，怎麼可以一聲不響就走呢？\r\n\r\n其實，他們忘了，媽媽每天都在交代。'),
(9, '2021-04-19', '一碗湯麵', '一篇感人的故事, 與有真性情的你們分享！\r\n或許故事有點長，請耐心看下去唷！！\r\n這是一個真實的故事，故事名稱我們叫它做一碗湯麵。'),
(10, '2021-04-19', '修改後7', 'ex2台中'),
(11, '2021-04-19', '修改後2', 'ex!!!!'),
(12, '2021-04-19', '修改後2', '!!!!'),
(14, '2021-04-19', '修改後2', ''),
(47, '2021-04-19', '修改後2', ''),
(48, '2021-04-19', '修改後2', ''),
(49, '2021-04-19', '修改後2', ''),
(50, '2021-04-20', '1見面', '在不是歷史的電視劇「宰相劉羅鍋」中，有一位令人討厭，卻為乾隆皇帝所歡喜的和珅大壞蛋，他自嘲說：「忠臣人人尊敬，我不是忠臣；奸臣人人討厭，我也不是奸臣；我只是一個弄臣而已！」\r\n\r\n一代名君賢主的乾隆皇帝，喜歡忠臣嗎？他需要忠臣，但他不歡喜忠臣的耿直；他喜歡奸臣嗎？當然他不喜歡奸臣！他喜歡什麼呢？他喜歡弄臣和珅！\r\n\r\n弄臣是什麼？');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `banner_title`
--
ALTER TABLE `banner_title`
  ADD PRIMARY KEY (`ID`);

--
-- 資料表索引 `my_table`
--
ALTER TABLE `my_table`
  ADD PRIMARY KEY (`cID`);

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`cID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `banner_title`
--
ALTER TABLE `banner_title`
  MODIFY `ID` tinyint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `my_table`
--
ALTER TABLE `my_table`
  MODIFY `cID` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news`
--
ALTER TABLE `news`
  MODIFY `cID` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
