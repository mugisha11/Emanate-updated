<?php
require_once 'email_helper.php';

header('Content-Type: application/json');

// Enable CORS - replace with your actual frontend domain in production
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
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

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request data']);
    exit();
}

// Validate required fields
$required = ['name', 'email', 'subject', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: {$field}"]);
        exit();
    }
}

// Validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Set up email headers
$to = 'info@imanate.org';
$subject = '[Contact Form] ' . filter_var($data['subject'], FILTER_SANITIZE_STRING);
$headers = [
    'From' => $data['email'],
    'Reply-To' => $data['email'],
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/html; charset=UTF-8'
];

// Prepare email message
$message = "
<html>
<body>
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> " . htmlspecialchars($data['name']) . " (" . htmlspecialchars($data['email']) . ")</p>
    <p><strong>Subject:</strong> " . htmlspecialchars($data['subject']) . "</p>
    <p><strong>Message:</strong></p>
    <p>" . nl2br(htmlspecialchars($data['message'])) . "</p>
</body>
</html>
";

// No database logging needed

// Send email
$emailSent = mail($to, $subject, $message, $headers);

if ($emailSent) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message']);
}