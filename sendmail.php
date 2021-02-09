<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en','he','ru' 'phpmailer/language/');
$mail->IsHTML(true);

//from how the letter
$mail->setFrom('bmw725@walla.co.il','Hey There Man');
//how you want to send
$mail->addAdress('Evgeny2510@gmail.com');
//subject text letter
$->subject= 'Hello! What is going on!! '

$hand="girl";
if($_POST['hand'] == "boy"){
    $hand= "girl"
}

//body letter
$body = ' <h1> get a super letter!!! i love you boy</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong> שם:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
    $body.='<p><strong> E-mail:</strong> '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['hand']))){
    $body.='<p><strong> מין:</strong> '.$hand.'</p>';
}
if(trim(!empty($_POST['age']))){
    $body.='<p><strong> גיל:</strong> '.$_POST['age'].'</p>';
}
if(trim(!empty($_POST['message']))){
    $body.='<p><strong> הודעה:</strong> '.$_POST['message'].'</p>';
}

//add file
if(!empty($_FILES['image']['tmp_name'])){
    //דרך הלעת קובץ
    $filePath=__DIR__."/files/". $_FILES['image']['name'];
    // מעלים קובץ
    if(copy($_FILES['image']['tmp_name'], $filePath)){
    $fileAttach = $filePath;
    $body.='<p><strong>תוספת של תמונה</strong>';
    $mail->addAttachment($fileAttach);
   }
}

$mail->Body = $body;

//שולחים
if(!$mail->send()){
    $message = 'System ERROR';
}else{
    $message = 'Well Send!!!';
}

$response=['message' => $message];

header('Content-type: application/json');
echo json_encode($response);