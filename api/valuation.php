<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate required fields
$requiredFields = ['name', 'email', 'propertyAddress', 'city', 'province', 'propertyType', 'timeframeToSell'];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required field: ' . $field]);
        exit();
    }
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Log the valuation request
$logEntry = [
    'timestamp' => date('Y-m-d H:i:s'),
    'name' => $data['name'],
    'email' => $data['email'],
    'phone' => isset($data['phone']) ? $data['phone'] : 'Not provided',
    'propertyAddress' => $data['propertyAddress'],
    'city' => $data['city'],
    'province' => $data['province'],
    'propertyType' => $data['propertyType'],
    'timeframeToSell' => $data['timeframeToSell'],
];

// Save to log file
$logFile = __DIR__ . '/valuations.log';
file_put_contents($logFile, json_encode($logEntry) . "\n", FILE_APPEND);

// Optional: Send email notification
// Uncomment and configure for your email
/*
$to = 'your-email@example.com';
$subject = 'New Valuation Request from ' . $data['name'];
$message = "New valuation request received:\n\n";
$message .= "Name: " . $data['name'] . "\n";
$message .= "Email: " . $data['email'] . "\n";
$message .= "Phone: " . (isset($data['phone']) ? $data['phone'] : 'Not provided') . "\n";
$message .= "Property Address: " . $data['propertyAddress'] . "\n";
$message .= "City: " . $data['city'] . "\n";
$message .= "Province: " . $data['province'] . "\n";
$message .= "Property Type: " . $data['propertyType'] . "\n";
$message .= "Timeframe: " . $data['timeframeToSell'] . "\n";
$headers = 'From: noreply@yourdomain.com' . "\r\n" .
           'Reply-To: ' . $data['email'] . "\r\n";
mail($to, $subject, $message, $headers);
*/

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Valuation request received successfully',
    'requestId' => 'VAL-' . time(),
    'estimatedResponseTime' => '24 hours'
]);
?>

