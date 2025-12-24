<?php
// api.php
header('Content-Type: application/json');  // tell browser the response is JSON

require_once 'db.php'; // include database connection

$response = [
    "success" => false,
    "data"    => null,
    "error"   => null
];

// GET parameter 'action' (for menu)
$action = isset($_GET['action']) ? $_GET['action'] : null;

// Handle GET requests (e.g., ?action=menu)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if ($action === 'menu') {
        // Fetch all active menu items
        $sql = "SELECT id, name, description, price, category, image_url 
                FROM menu_items 
                WHERE is_active = 1
                ORDER BY category, name";

        $result = $conn->query($sql);

        if ($result) {
            $items = [];
            while ($row = $result->fetch_assoc()) {
                $items[] = $row;
            }

            $response['success'] = true;
            $response['data']    = $items;
        } else {
            $response['error'] = "Error fetching menu: " . $conn->error;
        }
    } else {
        $response['error'] = "Invalid GET action";
    }
}

// Handle POST requests (create_order)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Read raw JSON body
    $rawBody = file_get_contents("php://input");
    $data    = json_decode($rawBody, true);

    if (!$data) {
        $response['error'] = "Invalid JSON";
        echo json_encode($response);
        exit;
    }

    $action = isset($data['action']) ? $data['action'] : null;

    if ($action === 'create_order') {
        // Extract order data from JSON
        $customerName        = $conn->real_escape_string($data['customerName']);
        $tableNumber         = $conn->real_escape_string($data['tableNumber']);
        $orderType           = $conn->real_escape_string($data['orderType']);
        $specialInstructions = isset($data['specialInstructions'])
            ? $conn->real_escape_string($data['specialInstructions'])
            : "";
        $items               = isset($data['items']) ? $data['items'] : [];

        if (empty($items)) {
            $response['error'] = "No items in order";
            echo json_encode($response);
            exit;
        }

        // Calculate totals on server
        $subtotal = 0;
        foreach ($items as $item) {
            $price    = (float)$item['price'];
            $quantity = (int)$item['quantity'];
            $subtotal += $price * $quantity;
        }

        $taxRate = 0.015; // 1.5%
        $tax     = $subtotal * $taxRate;
        $total   = $subtotal + $tax;

        // Insert into orders table
        $sqlOrder = "INSERT INTO orders 
            (customer_name, table_number, order_type, special_instructions, subtotal, tax, total)
            VALUES
            ('$customerName', '$tableNumber', '$orderType', '$specialInstructions', $subtotal, $tax, $total)";

        if ($conn->query($sqlOrder)) {
            $orderId = $conn->insert_id;

            // Insert order items
            foreach ($items as $item) {
                $menuItemId = (int)$item['id'];
                $price      = (float)$item['price'];
                $quantity   = (int)$item['quantity'];
                $lineTotal  = $price * $quantity;

                $sqlItem = "INSERT INTO order_items 
                    (order_id, menu_item_id, quantity, price, line_total)
                    VALUES
                    ($orderId, $menuItemId, $quantity, $price, $lineTotal)";

                $conn->query($sqlItem);
            }

            $response['success']  = true;
            $response['data']     = ["order_id" => $orderId];
        } else {
            $response['error'] = "Error creating order: " . $conn->error;
        }
    } else {
        $response['error'] = "Invalid POST action";
    }
}

// Output JSON response
echo json_encode($response);
$conn->close();
?>
