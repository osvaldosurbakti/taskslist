const express = require('express');
const multer = require('multer');
const { getTasks, createTask, editTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// Konfigurasi penyimpanan untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder tempat file akan disimpan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Format nama file
  },
});
const upload = multer({ storage });

// Rute untuk mengambil semua tugas
router.get('/', getTasks);

// Rute untuk mendapatkan tugas berdasarkan ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task', error: error.message });
  }
});

// Rute untuk membuat tugas baru dengan upload gambar
router.post('/', upload.single('image'), createTask);

// Rute untuk mengupdate tugas berdasarkan ID
router.put('/:id', upload.single('image'), editTask);

// Rute untuk menghapus tugas berdasarkan ID
router.delete('/:id', deleteTask);

module.exports = router;
