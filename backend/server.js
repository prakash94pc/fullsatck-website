const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Database configuration
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'clientdb',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Create table if not exists
async function initializeDatabase() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS clients (
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            company VARCHAR(255),
            service VARCHAR(100) NOT NULL,
            budget VARCHAR(50),
            message TEXT NOT NULL,
            source VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE INDEX IF NOT EXISTS idx_email ON clients(email);
        CREATE INDEX IF NOT EXISTS idx_created_at ON clients(created_at);
    `;
    
    try {
        await pool.query(createTableQuery);
        console.log('✅ Database initialized successfully');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
    }
}

// API Routes

// Create new client inquiry
app.post('/api/clients', async (req, res) => {
    try {
        const { fullname, email, phone, company, service, budget, message, source } = req.body;
        
        // Validation
        if (!fullname || !email || !phone || !service || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        const query = `
            INSERT INTO clients (fullname, email, phone, company, service, budget, message, source)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, created_at
        `;
        
        const values = [fullname, email, phone, company, service, budget, message, source];
        const result = await pool.query(query, values);
        
        // Log to console for monitoring
        console.log(`📝 New client registered: ${fullname} (${email})`);
        
        res.status(201).json({
            success: true,
            message: 'Client inquiry submitted successfully',
            id: result.rows[0].id,
            created_at: result.rows[0].created_at
        });
    } catch (error) {
        console.error('Error saving client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all clients (for admin panel)
app.get('/api/clients', async (req, res) => {
    try {
        const query = 'SELECT * FROM clients ORDER BY created_at DESC';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get client by ID
app.get('/api/clients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM clients WHERE id = $1';
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete client (admin only)
app.delete('/api/clients/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM clients WHERE id = $1 RETURNING id';
        const result = await pool.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        
        res.json({ success: true, message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Stats endpoint
app.get('/api/stats', async (req, res) => {
    try {
        const totalQuery = 'SELECT COUNT(*) as total FROM clients';
        const todayQuery = "SELECT COUNT(*) as today FROM clients WHERE DATE(created_at) = CURRENT_DATE";
        
        const totalResult = await pool.query(totalQuery);
        const todayResult = await pool.query(todayQuery);
        
        res.json({
            total_clients: parseInt(totalResult.rows[0].total),
            today_clients: parseInt(todayResult.rows[0].today)
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await initializeDatabase();
});