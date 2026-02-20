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
$appAT = '100443393687291|cspYtx9EIpCqJNEt1bzkllueQEQ';
$url = 'https://graph.facebook.com/debug_token?access_token='.$appAT.'&input_token='.$_REQUEST['fb_user_access_token'];
$tokenDebug = json_decode(file_get_contents($url), true);

if (isset($tokenDebug['data']) && $tokenDebug['data']['is_valid'] == 1 && $tokenDebug['data']['user_id'] == $_REQUEST['fb_user_id']) {

    $checkArgs = array(
        ':fb_user_id' => $_REQUEST['fb_user_id']
    );

    if ($db->checkCompetitor($checkArgs) > 0) {

        echo json_encode($db->duplicateCompetitor($checkArgs, 'share'));

    } else {
        echo 'Not found in database';
    }

}else {
    echo 'invalid token';
}