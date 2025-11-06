<?php
require_once 'config.php';

class Auth {
    private $db;

    public function __construct() {
        $this->db = getDBConnection();
        initSession();
        setSecurityHeaders();
    }

    public function login($email, $password) {
        try {
            $stmt = $this->db->prepare("
                SELECT u.*, r.name as role_name, r.permissions 
                FROM users u 
                JOIN roles r ON u.role_id = r.id 
                WHERE u.email = ? AND u.status = 'active'
            ");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                // Update last login
                $updateStmt = $this->db->prepare("
                    UPDATE users SET last_login = CURRENT_TIMESTAMP 
                    WHERE id = ?
                ");
                $updateStmt->execute([$user['id']]);

                // Set session data
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role_id' => $user['role_id'],
                    'role_name' => $user['role_name'],
                    'permissions' => json_decode($user['permissions'], true)
                ];
                
                return true;
            }
            return false;
        } catch (PDOException $e) {
            error_log("Login error: " . $e->getMessage());
            return false;
        }
    }

    public function logout() {
        $_SESSION = [];
        if (isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time() - 3600, '/');
        }
        session_destroy();
    }

    public function isLoggedIn() {
        return isset($_SESSION['user']);
    }

    public function getCurrentUser() {
        return $this->isLoggedIn() ? $_SESSION['user'] : null;
    }

    public function hasPermission($permission) {
        if (!$this->isLoggedIn()) {
            return false;
        }
        return in_array($permission, $_SESSION['user']['permissions']);
    }

    public function requirePermission($permission) {
        if (!$this->hasPermission($permission)) {
            http_response_code(403);
            die("Access denied");
        }
    }

    public function changePassword($userId, $currentPassword, $newPassword) {
        try {
            // Verify current password
            $stmt = $this->db->prepare("SELECT password_hash FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($currentPassword, $user['password_hash'])) {
                return false;
            }

            // Validate new password
            if (strlen($newPassword) < PASSWORD_MIN_LENGTH) {
                return false;
            }

            // Update password
            $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
            $stmt = $this->db->prepare("
                UPDATE users 
                SET password_hash = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            ");
            return $stmt->execute([$newHash, $userId]);

        } catch (PDOException $e) {
            error_log("Password change error: " . $e->getMessage());
            return false;
        }
    }

    public function requestPasswordReset($email) {
        try {
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if ($user) {
                $token = bin2hex(random_bytes(32));
                $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));

                $stmt = $this->db->prepare("
                    UPDATE users 
                    SET reset_token = ?, reset_token_expiry = ? 
                    WHERE id = ?
                ");
                $stmt->execute([$token, $expiry, $user['id']]);

                // TODO: Send reset email
                // For now, just return the token for testing
                return $token;
            }
            return false;
        } catch (PDOException $e) {
            error_log("Password reset request error: " . $e->getMessage());
            return false;
        }
    }

    public function resetPassword($token, $newPassword) {
        try {
            $stmt = $this->db->prepare("
                SELECT id 
                FROM users 
                WHERE reset_token = ? 
                AND reset_token_expiry > CURRENT_TIMESTAMP 
                AND status = 'active'
            ");
            $stmt->execute([$token]);
            $user = $stmt->fetch();

            if ($user) {
                $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
                $stmt = $this->db->prepare("
                    UPDATE users 
                    SET password_hash = ?, 
                        reset_token = NULL, 
                        reset_token_expiry = NULL, 
                        updated_at = CURRENT_TIMESTAMP 
                    WHERE id = ?
                ");
                return $stmt->execute([$newHash, $user['id']]);
            }
            return false;
        } catch (PDOException $e) {
            error_log("Password reset error: " . $e->getMessage());
            return false;
        }
    }
}