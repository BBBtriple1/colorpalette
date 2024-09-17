body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 300px;
    width: 100%;
}

h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

input[type="color"] {
    border: none;
    padding: 5px;
    margin-bottom: 20px;
    cursor: pointer;
}

button {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #2980b9;
}

.palette {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.color-box {
    width: 50px;
    height: 50px;
    border-radius: 4px;
}
