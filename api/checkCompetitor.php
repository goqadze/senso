<?php
/**
 * Created by PhpStorm.
 * User: Oto
 * Date: 06/11/15
 * Time: 12:21
 */

require_once("../Config/global.php");
require_once("../Config/db.php");

require_once('../helpers/DBHelper.php');
$db = new DBHelper();

$checkArgs = array(
    ':fb_user_id' => $_REQUEST['fb_user_id']
);

echo $db->checkCompetitor($checkArgs);
