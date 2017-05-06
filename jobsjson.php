<?php

try {
	//$json = file_get_contents('http://www.oregontechcompanies.org/jobs/');
	$json = file_get_contents(realpath('../jobs.json')); // cron job refreshes this every 10 minutes
	header('Content-Type: application/json');
	header('Expires: '.date('D, d M Y H:i:s', (time() + 300)).' GMT');
	echo $json;
	exit;

} catch (\Throwable $e) {
	
	header('Content-Type: text/plain');
	header("HTTP/1.0 404 Not Found");
	exit('Not found');
	
}
