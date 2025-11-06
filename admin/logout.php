<?php
require_once 'auth.php';

$auth = new Auth();

// Verify CSRF token
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    validateCSRFToken($_POST['csrf_token'] ?? '');
}

$auth->logout();
header('Location: login.php');
exit;