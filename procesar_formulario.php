<?php
header('Content-Type: application/json');
require_once 'db_config.php';

$response = ['status' => 'error', 'message' => 'Ocurrió un error inesperado.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = trim($_POST['nombre'] ?? '');
    $apellidos = trim($_POST['apellidos'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $mensaje = trim($_POST['mensaje'] ?? '');

    if (empty($nombre) || empty($apellidos) || empty($email) || empty($mensaje) || empty($telefono)) {
        $response['message'] = 'Por favor, completa todos los campos obligatorios.';
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'El formato del correo electrónico no es válido.';
        echo json_encode($response);
        exit;
    }

    if (!preg_match('/^\d{10}$/', $telefono)) {
        $response['message'] = 'El número de teléfono debe contener exactamente 10 dígitos.';
        echo json_encode($response);
        exit;
    }

    $sql = "INSERT INTO contactos (nombre, apellidos, email, telefono, mensaje) VALUES (?, ?, ?, ?, ?)";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sssss", $nombre, $apellidos, $email, $telefono, $mensaje);
        
        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = '¡Mensaje enviado con éxito! Gracias por contactarnos.';
        } else {
            $response['message'] = 'Error al ejecutar la consulta: ' . $stmt->error;
        }
        $stmt->close();
    } else {
        $response['message'] = 'Error al preparar la consulta: ' . $conn->error;
    }
    
    $conn->close();
} else {
    $response['message'] = 'Método de solicitud no válido.';
}

echo json_encode($response);
?>