const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./CryptoVault3D-Backend/config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '120'),
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./CryptoVault3D-Backend/routes/auth'));
app.use('/api/portfolio', require('./CryptoVault3D-Backend/routes/portfolio'));
app.use('/api/prices', require('./CryptoVault3D-Backend/routes/prices'));
app.use('/api/reports', require('./CryptoVault3D-Backend/routes/reports'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'CryptoVault 3D Backend' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
