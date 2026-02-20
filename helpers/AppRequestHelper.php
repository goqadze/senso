<?php

require_once('DBHelper.php');

/**
 * Created by PhpStorm.
 * User: Oto
 * Date: 31/03/16
 * Time: 20:44
 */
class AppRequestHelper
{
    private $db;
    private $request_ids;
    private $fb_user_id;
    private $appID;
    private $appAccessToken;
    private $fromID;

    function __construct()
    {
        $this->db = new DBHelper();
    }

    public function manageRequestId($rid, $fbid, $appid, $at){
        $this->request_ids = $rid;
        $this->fb_user_id = $fbid;
        $this->appAccessToken = $at;
        $this->appID = $appid;

        if ($this->checkRequestId()){
            $this->duplicateParticipation();
            $this->deleteRequest();
        }
    }

    private function checkRequestId(){
        $url = 'https://graph.facebook.com/'.$this->request_ids.'_'.$this->fb_user_id.'?access_token='.$this->appAccessToken;
        $tokenDebug = json_decode(file_get_contents($url), true);
        if (isset($tokenDebug['application'])){
            if (isset($tokenDebug['application']['id']) && $tokenDebug['application']['id'] ==  $this->appID){
                $this->fromID = $tokenDebug['from']['id'];
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }

    }

    private function deleteRequest(){
        $url = 'https://graph.facebook.com/'.$this->request_ids.'_'.$this->fb_user_id.'?access_token='.$this->appAccessToken.'&method=delete';
        $result = json_decode(file_get_contents($url), true);
    }

    private function duplicateParticipation(){
        $checkArgs = array(
            ':fb_user_id' => $this->fromID
        );

        if ($this->db->checkCompetitor($checkArgs) > 0) {

            $args = array(
                ':fb_user_id'   =>  $this->fromID,
                ':source'       => $this->fb_user_id
            );
            if ($this->db->checkInviteExistance($args) == 0) {
                echo json_encode($this->db->duplicateCompetitor($checkArgs, $this->fb_user_id));
            }else{
                echo "already accepted";
            }

        } else {

            echo 'Not found in database';

        }
    }
}