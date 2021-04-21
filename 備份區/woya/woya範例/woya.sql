-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-04-14 15:37:13
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
(1, '2021-04-10', '1台中限水恐變供四停三　女大生PO文「徵人互住」度水荒：互惠', '中南部水情吃緊，本來的供五停二可能改為四停三。對此，台中一名女大生表示，租屋121212'),
(2, '2021-04-13', '2如何突破修行的障礙', '美國在台協會（AIT）2018年砸11.6億台幣，買下台北市天母使館特區的「新美齊天母」\r\n整棟預售豪宅，將作為員工宿舍，最新實價登錄與地籍資料揭露，該案今年3月25日完成\r\n買賣登記，而買方為「美利堅合眾國」，證實美國官方首次在台購置不動產。\r\n'),
(3, '2021-04-12', '1核廢入海「57天」太平洋GG！擴散路徑曝　10年內全球水域都遭殃', '日本政府13日拍板決定把福島核電廠的輻射汙水排放入海，引起當地漁民和周遭國家的強\r\n烈抗議。外媒最近引述德國基爾亥姆霍茲海洋研究中心（GEOMAR）過去的研究指出，一旦\r\n日本排放福島第一核電廠的儲存核廢水，放射性物質將在57天內擴散至太平洋大部份區域\r\n，並對漁業與人體造成不良後果。'),
(6, '2021-04-11', '2ex', '67866'),
(8, '2021-04-06', '1世上最厲害的算命', '12e1'),
(9, '2021-04-09', '2ex', 'ex11'),
(10, '2021-04-07', '2ex', 'ex2台中'),
(11, '2021-04-08', '1ex', 'ex!!!!'),
(12, '2021-04-14', '1人心不足蛇吞象', '!!!!');

-- --------------------------------------------------------

--
-- 資料表結構 `students`
--

CREATE TABLE `students` (
  `cID` tinyint(2) UNSIGNED NOT NULL,
  `cName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `cSex` enum('F','M') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'F',
  `cBirthday` date NOT NULL,
  `cEmail` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cPhone` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cAddr` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `students`
--

INSERT INTO `students` (`cID`, `cName`, `cSex`, `cBirthday`, `cEmail`, `cPhone`, `cAddr`) VALUES
(1, '張惠玲', 'F', '1987-04-04', 'elven@superstar.com', '0922988876', '台北市濟洲北路12號'),
(2, '彭建志', 'M', '1987-07-01', 'jinglun@superstar.com', '0918181111', '台北市敦化南路93號5樓'),
(3, '謝耿鴻', 'M', '1987-08-11', 'sugie@superstar.com', '0914530768', '台北市中央路201號7樓'),
(4, '蔣志明', 'M', '1984-06-20', 'shane@superstar.com', '0946820035', '台北市建國路177號6樓'),
(5, '王佩珊', 'F', '1988-02-15', 'ivy@superstar.com', '0920981230', '台北市忠孝東路520號6樓'),
(6, '林志宇', 'M', '1987-05-05', 'zhong@superstar.com', '0951983366', '台北市三民路1巷10號'),
(7, '李曉薇', 'F', '1985-08-30', 'lala@superstar.com', '0918123456', '台北市仁愛路100號'),
(8, '賴秀英', 'F', '1986-12-10', 'crystal@superstar.com', '0907408965', '台北市民族路204號'),
(9, '張雅琪', 'F', '1988-12-01', 'peggy@superstar.com', '0916456723', '台北市建國北路10號'),
(10, '許朝元', 'M', '1993-08-10', 'albert@superstar.com', '0918976588', '台北市北環路2巷80號');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`cID`);

--
-- 資料表索引 `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`cID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news`
--
ALTER TABLE `news`
  MODIFY `cID` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `students`
--
ALTER TABLE `students`
  MODIFY `cID` tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
