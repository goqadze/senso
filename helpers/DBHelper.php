<?php
/**
 * Created by PhpStorm.
 * User: oto
 * Date: 7/2/15
 * Time: 12:12 AM
 */

class DBHelper {

    private $db;

    function __construct()
    {
        try {

            $this->db = new PDO('mysql:host=' . HOST . ';dbname=' . DB . '', '' . USER . '', '' . PASSWORD . '', array(PDO::ATTR_PERSISTENT => false));
            $this->db->exec("SET CHARACTER SET utf8");
            return $this->db;
        } catch (PDOException $e) {
            echo "The database connection could not be established";
            die();
        }
    }

    public function checkCompetitor($args){
        $selectUserSTH = $this->db->prepare("SELECT * FROM competitors WHERE fb_user_id = :fb_user_id");
        $selectUserSTH->execute($args);
        return count($selectUserSTH->fetchAll(PDO::FETCH_ASSOC));
    }

    public function insertCompetitor($args){
        $selectUserSTH = $this->db->prepare("INSERT INTO competitors (
                        fb_user_id,
                        fb_user_first_name,
                        fb_user_last_name,
                        fb_user_email,
                        fb_user_access_token,
                        user_first_name,
                        user_last_name,
                        user_phone,
                        user_email,
                        user_newsletter,
                        playdate,
                        source
                        ) VALUES (
                        :fb_user_id,
                        :fb_user_first_name,
                        :fb_user_last_name,
                        :fb_user_email,
                        :fb_user_access_token,
                        :user_first_name,
                        :user_last_name,
                        :user_phone,
                        :user_email,
                        :user_newsletter,
                        :playdate,
                        :source
                        )");

        if ($selectUserSTH->execute($args)) {
            return 1;
        }else{
            return $selectUserSTH->errorInfo();
        }
    }

    public function duplicateCompetitor($args, $source){

        $selectUserSTH = $this->db->prepare("SELECT * FROM competitors WHERE fb_user_id = :fb_user_id");
        if ($selectUserSTH->execute($args)) {

            $result = $selectUserSTH->fetchAll();

            $args = array(
                ':fb_user_id'           => $result[0]['fb_user_id'],
                ':fb_user_first_name'   => $result[0]['fb_user_first_name'],
                ':fb_user_last_name'    => $result[0]['fb_user_last_name'],
                ':fb_user_email'        => $result[0]['fb_user_email'],
                ':fb_user_access_token' => $result[0]['fb_user_access_token'],
                ':user_first_name'      => $result[0]['user_first_name'],
                ':user_last_name'       => $result[0]['user_last_name'],
                ':user_phone'           => $result[0]['user_phone'],
                ':user_email'           => $result[0]['user_email'],
                ':user_newsletter'      => $result[0]['user_newsletter'],
                ':playdate'             => date('Y-m-d H:i:s'),
                ':source'               => $source
            );

            return $this->insertCompetitor($args);

        }else{
            return $selectUserSTH->errorInfo();
        }
    }

    public function checkInviteExistance($args){

        $selectUserSTH = $this->db->prepare("SELECT * FROM competitors WHERE fb_user_id = :fb_user_id and source = :source");
        if ($selectUserSTH->execute($args)) {

            return count($selectUserSTH->fetchAll(PDO::FETCH_ASSOC));

        }else{
            return $selectUserSTH->errorInfo();
        }
    }
}