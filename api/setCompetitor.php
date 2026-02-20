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
$appAT = '460874684112962|b2a4c99e26ca6062c56941143e0ebb9a';
$url = 'https://graph.facebook.com/debug_token?access_token='.$appAT.'&input_token='.$_REQUEST['fb_user_access_token'];
$tokenDebug = json_decode(file_get_contents($url), true);

if (isset($tokenDebug['data']) && $tokenDebug['data']['is_valid'] == 1 && $tokenDebug['data']['user_id'] == $_REQUEST['fb_user_id']) {

    $checkArgs = array(
        ':fb_user_id' => $_REQUEST['fb_user_id']
    );

    if ($db->checkCompetitor($checkArgs) == 0) {

        $args = array(
            ':fb_user_id' => $_REQUEST['fb_user_id'],
            ':fb_user_first_name' => $_REQUEST['fb_user_first_name'],
            ':fb_user_last_name' => $_REQUEST['fb_user_last_name'],
            ':fb_user_email' => $_REQUEST['fb_user_email'],
            ':fb_user_access_token' => $_REQUEST['fb_user_access_token'],
            ':user_first_name' => $_REQUEST['user_first_name'],
            ':user_last_name' => $_REQUEST['user_last_name'],
            ':user_phone' => $_REQUEST['user_phone'],
            ':user_email' => $_REQUEST['user_email'],
            ':user_newsletter' => (int) $_REQUEST['user_newsletter'],
            ':playdate' => date('Y-m-d H:i:s'),
            ':source' => 'form'
        );

        echo json_encode($db->insertCompetitor($args));

    } else {

        echo 'already registred';
    }

}else {
    echo 'invalid token';
}