<?php
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
$user = 'root';
$pass = '';

try {
    $dbh = new PDO('mysql:host=localhost;dbname=school', $user, $pass);
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


$arr = [
    [
        'voornaam' => 'Jan Jaap',
        'achternaam' => 'Siewers'
    ],  
    [
        'voornaam' => 'Piet',
        'achternaam' => 'Wagenmans'
    ],    
];

$data = [];

if(isset($_GET['docenten'])) {
    $stmt = $dbh->prepare('SELECT * from docent');
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

if(isset($_GET['login'])) {
    $data = $_POST;
} else {
    $data = $arr;
}





$arr = [
    [
        'voornaam' => 'Jan Jaap',
        'achternaam' => 'Siewers'
    ],  
    [
        'voornaam' => 'Piet',
        'achternaam' => 'Wagenmans'
    ],    
];


function json_response($data, $http_status) {
    http_response_code($http_status);
    return json_encode($data);
}

echo json_response($data, 200);



