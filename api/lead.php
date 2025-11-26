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
if (!isset($data['source']) || !isset($data['name']) || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: source, name, or email']);
    exit();
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Log the lead (you can modify this to save to database)
$logEntry = [
    'timestamp' => date('Y-m-d H:i:s'),
    'source' => $data['source'],
    'name' => $data['name'],
    'email' => $data['email'],
    'phone' => isset($data['phone']) ? $data['phone'] : 'Not provided',
    'propertyId' => isset($data['propertyId']) ? $data['propertyId'] : 'N/A',
    'message' => isset($data['message']) ? $data['message'] : 'N/A',
    'preferredTime' => isset($data['preferredTime']) ? $data['preferredTime'] : 'N/A',
];

// Save to log file
$logFile = __DIR__ . '/leads.log';
file_put_contents($logFile, json_encode($logEntry) . "\n", FILE_APPEND);

// Optional: Send email notification
// Uncomment and configure for your email
/*
$to = 'your-email@example.com';
$subject = 'New Lead: ' . $data['source'];
$message = "New lead received:\n\n";
$message .= "Name: " . $data['name'] . "\n";
$message .= "Email: " . $data['email'] . "\n";
$message .= "Phone: " . (isset($data['phone']) ? $data['phone'] : 'Not provided') . "\n";
$message .= "Source: " . $data['source'] . "\n";
$message .= "Property ID: " . (isset($data['propertyId']) ? $data['propertyId'] : 'N/A') . "\n";
$message .= "Message: " . (isset($data['message']) ? $data['message'] : 'N/A') . "\n";
$headers = 'From: noreply@yourdomain.com' . "\r\n" .
           'Reply-To: ' . $data['email'] . "\r\n";
mail($to, $subject, $message, $headers);
*/

// Return success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Lead received successfully',
    'leadId' => 'LEAD-' . time()
]);
?>

