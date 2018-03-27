/*
Navicat MySQL Data Transfer

Source Server         : 本地测试
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : simplepic

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-03-27 10:57:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for discuss
-- ----------------------------
DROP TABLE IF EXISTS `discuss`;
CREATE TABLE `discuss` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `picture_upload_logs_id` bigint(20) DEFAULT NULL COMMENT '该评论属于哪个发现的内容',
  `from_open_id` varchar(255) DEFAULT NULL COMMENT '评论人的openid',
  `discuss_content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `discuss_time` datetime DEFAULT NULL COMMENT '评论时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of discuss
-- ----------------------------

-- ----------------------------
-- Table structure for picture_upload_logs
-- ----------------------------
DROP TABLE IF EXISTS `picture_upload_logs`;
CREATE TABLE `picture_upload_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) DEFAULT NULL COMMENT '用户唯一标识',
  `upload_picture_url` varchar(255) DEFAULT NULL COMMENT '上传原图在服务器的地址',
  `simplify_picture_url` varchar(255) DEFAULT NULL COMMENT '简化后的图片在服务器的地址',
  `thumbnail_picture_url` varchar(255) DEFAULT NULL COMMENT '简化图的缩略图在服务器的地址',
  `upload_time` datetime DEFAULT NULL COMMENT '上传时间',
  `like_number` int(11) DEFAULT NULL COMMENT '点赞数',
  `share_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of picture_upload_logs
-- ----------------------------
INSERT INTO `picture_upload_logs` VALUES ('1', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '542.0241672307675wx0842e27bf63e20e8.o6zAJs160CbKOOqQR-uszvfA9BiM.nWXM4Bju8U5Qc588d3d7abe04934c048923f951bc8f8.jpg', 'simplify664.3052112737724.jpg', '2926578a-132a-4569-a492-e254e439f9e4.jpg', '2018-03-23 16:52:05', '0', '0');
INSERT INTO `picture_upload_logs` VALUES ('2', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '380.22151472390755wx0842e27bf63e20e8.o6zAJs160CbKOOqQR-uszvfA9BiM.oqbuRAj2Mz8Of9674a0f7c7e4970aa7c45b210d45b01.jpg', 'simplify261.35223336456136.jpg', '2a26a25e-b806-47ad-a99f-b38129f13f87.jpg', '2018-03-23 16:52:37', '0', '0');
INSERT INTO `picture_upload_logs` VALUES ('3', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '882.8098356438232wx0842e27bf63e20e8.o6zAJs160CbKOOqQR-uszvfA9BiM.gFuQuuqXS9ZU64487f45fb19956f495e80d050c08ae8.jpg', 'simplify678.248401301507.jpg', '286e16e5-8dc0-4e85-ae45-03074f8f980c.jpg', '2018-03-23 16:52:57', '0', '0');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL COMMENT '用户昵称',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `gender` varchar(255) DEFAULT NULL COMMENT '性别',
  `city` varchar(255) DEFAULT NULL COMMENT '城市',
  `province` varchar(255) DEFAULT NULL COMMENT '省份',
  `country` varchar(255) DEFAULT NULL COMMENT '国家',
  `language` varchar(255) DEFAULT NULL COMMENT '语言',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', 'Jarvan丶Sky', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJnLF8FfsibT3gQaSseBdxTDvYNEibHaiaEnSW12sQicb7pvgapS9qbEuQUzGJtoK1nNTFsVeXObKyY6g/0', '1', 'Zhoushan', 'Zhejiang', 'China', 'zh_CN');

-- ----------------------------
-- Table structure for user_like_picture_logs
-- ----------------------------
DROP TABLE IF EXISTS `user_like_picture_logs`;
CREATE TABLE `user_like_picture_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) DEFAULT NULL COMMENT '当前用户',
  `picture_upload_logs_id` bigint(20) DEFAULT NULL COMMENT '上传记录id',
  `like_time` datetime DEFAULT NULL COMMENT '点赞时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_like_picture_logs
-- ----------------------------

-- ----------------------------
-- Table structure for user_login_logs
-- ----------------------------
DROP TABLE IF EXISTS `user_login_logs`;
CREATE TABLE `user_login_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) DEFAULT NULL COMMENT '对应用户的openid',
  `login_time` datetime DEFAULT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_login_logs
-- ----------------------------
INSERT INTO `user_login_logs` VALUES ('1', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '2018-03-07 16:43:25');
INSERT INTO `user_login_logs` VALUES ('2', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '2018-03-12 10:00:58');
INSERT INTO `user_login_logs` VALUES ('3', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '2018-03-12 16:04:15');
INSERT INTO `user_login_logs` VALUES ('4', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '2018-03-14 16:28:50');
INSERT INTO `user_login_logs` VALUES ('5', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '2018-03-19 17:18:18');
INSERT INTO `user_login_logs` VALUES ('6', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '2018-03-23 10:10:00');
INSERT INTO `user_login_logs` VALUES ('7', 'oD-mk5Fh_xT44SKmHFHM1H81pN3w', '2018-03-26 15:45:23');
