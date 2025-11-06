<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'emanate_admin');
define('DB_USER', 'root');     // Change in production
define('DB_PASS', '');         // Change in production

// Site configuration
define('SITE_URL', 'http://localhost/emanate/admin');
define('UPLOAD_PATH', '../uploads/');
define('ALLOWED_FILE_TYPES', ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx']);
define('MAX_FILE_SIZE', 10 * 1024 * 1024);  // 10MB

// Security configuration
define('SESSION_NAME', 'emanate_admin');
define('SESSION_LIFETIME', 7200);  // 2 hours
define('CSRF_TOKEN_NAME', 'csrf_token');
define('PASSWORD_MIN_LENGTH', 8);

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Timezone
date_default_timezone_set('Africa/Kigali');

// Database connection function
function getDBConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}

// Session configuration
function initSession() {
    ini_set('session.use_only_cookies', 1);
    ini_set('session.cookie_httponly', 1);
    ini_set('session.cookie_secure', 1);  // Enable in production (HTTPS)
    ini_set('session.cookie_samesite', 'Strict');
    session_name(SESSION_NAME);
    session_start();
}

// CSRF protection
function generateCSRFToken() {
    if (empty($_SESSION[CSRF_TOKEN_NAME])) {
        $_SESSION[CSRF_TOKEN_NAME] = bin2hex(random_bytes(32));
    }
    return $_SESSION[CSRF_TOKEN_NAME];
}

function validateCSRFToken($token) {
    if (!isset($_SESSION[CSRF_TOKEN_NAME]) || 
        !isset($token) || 
        $token !== $_SESSION[CSRF_TOKEN_NAME]) {
        http_response_code(403);
        die("Invalid CSRF token");
    }
    return true;
}

// Security headers
function setSecurityHeaders() {
    header("X-Frame-Options: DENY");
    header("X-XSS-Protection: 1; mode=block");
    header("X-Content-Type-Options: nosniff");
    header("Referrer-Policy: strict-origin-when-cross-origin");
    header("Content-Security-Policy: default-src 'self'");  // Customize as needed
}