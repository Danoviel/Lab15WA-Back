/**
 * Seeder: categorías, productos (con categoría e imagen) y usuarios de prueba.
 * Uso:  npm run seed
 */
const bcrypt = require('bcryptjs');
const sequelize = require('./src/config/database');
const { Product, Category, User } = require('./src/models');
require('dotenv').config();

const CATEGORIES = [
  'Componentes',
  'Periféricos',
  'Almacenamiento',
  'Monitores y TV',
  'Laptops',
];

const PRODUCTS = [
  ['Laptop Lenovo IdeaPad 3',                 2499.00, 'Laptop 15.6" Ryzen 5, 16GB RAM, 512GB SSD, ideal para trabajo y estudio.',       'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80&auto=format&fit=crop', 'Laptops'],
  ['Procesador AMD Ryzen 7 5700G',             749.00, 'Procesador 8 núcleos / 16 hilos con gráficos Radeon integrados, socket AM4.',     '/productos/procesador.webp',     'Componentes'],
  ['Tarjeta Gráfica ASUS TUF RTX 5060 OC 8GB', 1899.00, 'GeForce RTX 5060 OC Edition 8GB GDDR7, DLSS 4, Ray Tracing y triple ventilador.', '/productos/tarjeta-grafica.webp', 'Componentes'],
  ['Placa Madre Gigabyte B650M Gaming X',      899.00, 'Motherboard AM5 micro-ATX, DDR5, PCIe 4.0, WiFi y disipadores M.2.',              '/productos/placa-madre.jpg',     'Componentes'],
  ['Fuente de Poder MSI MAG A750GF 750W',      459.00, 'Fuente 750W 80 Plus Gold, full modular, ventilador silencioso.',                 '/productos/fuente-poder.jpg',    'Componentes'],
  ['SSD 512GB NVMe M.2 PCIe 4.0',              199.00, 'Unidad de estado sólido 512GB M.2 NVMe PCIe 4.0, lecturas ultrarrápidas.',       '/productos/ssd.jpg',             'Almacenamiento'],
  ['Teclado Mecánico Redragon Kumara RGB',     149.90, 'Teclado mecánico TKL switch red, retroiluminación RGB rainbow, cableado.',       '/productos/teclado-kumara.webp', 'Periféricos'],
  ['Teclado Mecánico RGB 60%',                 119.90, 'Teclado gamer compacto 60% con iluminación RGB por tecla, cableado USB.',        '/productos/teclado-rgb.webp',    'Periféricos'],
  ['Mouse Ergonómico Vertical Inalámbrico',     79.90, 'Mouse vertical ergonómico inalámbrico, reduce la fatiga de la muñeca.',          '/productos/mouse.jpg',           'Periféricos'],
  ['Audífonos Gamer Krios RGB',                229.00, 'Audífonos over-ear con micrófono, iluminación RGB y sonido envolvente.',         '/productos/audifonos.webp',      'Periféricos'],
  ['Smart TV 50" Google TV 4K',               1399.00, 'Televisor 50 pulgadas 4K UHD con Google TV, apps integradas y control por voz.', '/productos/smart-tv.webp',       'Monitores y TV'],
];

const USERS = [
  { nombre: 'Admin TechStore',    email: 'admin@techstore.pe',    password: 'admin123',    rol: 'ADMIN' },
  { nombre: 'Cliente de Prueba',  email: 'cliente@techstore.pe',  password: 'cliente123',  rol: 'CUSTOMER' },
];

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  // Limpieza (respeta el orden por la FK) + reinicio de IDs
  await Product.destroy({ where: {} });
  await Category.destroy({ where: {} });
  await User.destroy({ where: {} });
  await sequelize.query('ALTER TABLE products AUTO_INCREMENT = 1');
  await sequelize.query('ALTER TABLE categories AUTO_INCREMENT = 1');
  await sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');

  // Categorías
  const cats = {};
  for (const nombre of CATEGORIES) {
    const c = await Category.create({ nombre });
    cats[nombre] = c.id;
  }
  console.log(`✓ ${CATEGORIES.length} categorías`);

  // Productos
  for (const [nombre, precio, descripcion, imagen, cat] of PRODUCTS) {
    await Product.create({ nombre, precio, descripcion, imagen, categoryId: cats[cat] });
  }
  console.log(`✓ ${PRODUCTS.length} productos`);

  // Usuarios
  for (const u of USERS) {
    const password = await bcrypt.hash(u.password, 10);
    await User.create({ ...u, password });
  }
  console.log(`✓ ${USERS.length} usuarios`);
  console.log('\nCredenciales:');
  USERS.forEach((u) => console.log(`  ${u.rol.padEnd(8)} ${u.email}  /  (ver seed.js)`));

  await sequelize.close();
  console.log('\n✓ Seed completado');
}

seed().catch((err) => {
  console.error('Error en seed:', err);
  process.exit(1);
});
