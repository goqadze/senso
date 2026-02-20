<?php
/**
 * Created by PhpStorm.
 * User: Oto
 * Date: 31/03/16
 * Time: 20:53
 */

session_start();
require_once("../Config/global.php");
require_once("../Config/db.php");
require_once('../helpers/AppRequestHelper.php');

$appAT = '460874684112962|b2a4c99e26ca6062c56941143e0ebb9a';
$appID = '460874684112962';
$request_ids = $_REQUEST['request_ids'];
$fb_user_id = $_REQUEST['fb_user_id'];

$ar = new AppRequestHelper();

$requestIdsArr = explode(',',$request_ids);
foreach($requestIdsArr as $rid) {
    echo "checking request id ".$rid;
    $ar->manageRequestId($rid, $fb_user_id, $appID, $appAT);
}

unset($_SESSION['_sens_request_ids']);