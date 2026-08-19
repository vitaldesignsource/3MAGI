<?php
header('Content-Type: application/json');
$ch = curl_init('https://api.stripe.com/v1/charges');
curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER=>true, CURLOPT_TIMEOUT=>8, CURLOPT_HEADER=>false]);
$body = curl_exec($ch);
$err = curl_error($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo json_encode(['http_code'=>$code, 'curl_error'=>$err, 'body_sample'=>substr((string)$body,0,120)]);
