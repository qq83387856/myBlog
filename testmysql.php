<?php 
$link = mysql_connect('115.29.137.34','xiaomo','123456'); 
if (!$link) { 
	die('Could not connect to MySQL: ' . mysql_error()); 
} 
echo '数据库连接成功'; mysql_close($link); 
?> 