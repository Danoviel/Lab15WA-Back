-- Datos de prueba para la tabla `products`
-- Ejecutar DESPUÉS de levantar el backend una vez (sequelize.sync crea/actualiza la tabla).
-- Las imágenes locales (/productos/*) se sirven desde frontend-marketplace/public/.

DELETE FROM products;
ALTER TABLE products AUTO_INCREMENT = 1;

INSERT INTO products (nombre, precio, descripcion, imagen, createdAt, updatedAt) VALUES
('Laptop Lenovo IdeaPad 3',                 2499.00, 'Laptop 15.6" Ryzen 5, 16GB RAM, 512GB SSD, ideal para trabajo y estudio.',       'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80&auto=format&fit=crop', NOW(), NOW()),
('Procesador AMD Ryzen 7 5700G',             749.00, 'Procesador 8 núcleos / 16 hilos con gráficos Radeon integrados, socket AM4.',     '/productos/procesador.webp',     NOW(), NOW()),
('Tarjeta Gráfica ASUS TUF RTX 5060 OC 8GB', 1899.00, 'GeForce RTX 5060 OC Edition 8GB GDDR7, DLSS 4, Ray Tracing y triple ventilador.', '/productos/tarjeta-grafica.webp', NOW(), NOW()),
('Placa Madre Gigabyte B650M Gaming X',      899.00, 'Motherboard AM5 micro-ATX, DDR5, PCIe 4.0, WiFi y disipadores M.2.',              '/productos/placa-madre.jpg',     NOW(), NOW()),
('Fuente de Poder MSI MAG A750GF 750W',      459.00, 'Fuente 750W 80 Plus Gold, full modular, ventilador silencioso.',                 '/productos/fuente-poder.jpg',    NOW(), NOW()),
('SSD 512GB NVMe M.2 PCIe 4.0',              199.00, 'Unidad de estado sólido 512GB M.2 NVMe PCIe 4.0, lecturas ultrarrápidas.',       '/productos/ssd.jpg',             NOW(), NOW()),
('Teclado Mecánico Redragon Kumara RGB',     149.90, 'Teclado mecánico TKL switch red, retroiluminación RGB rainbow, cableado.',       '/productos/teclado-kumara.webp', NOW(), NOW()),
('Teclado Mecánico RGB 60%',                 119.90, 'Teclado gamer compacto 60% con iluminación RGB por tecla, cableado USB.',        '/productos/teclado-rgb.webp',    NOW(), NOW()),
('Mouse Ergonómico Vertical Inalámbrico',     79.90, 'Mouse vertical ergonómico inalámbrico, reduce la fatiga de la muñeca.',          '/productos/mouse.jpg',           NOW(), NOW()),
('Audífonos Gamer Krios RGB',                229.00, 'Audífonos over-ear con micrófono, iluminación RGB y sonido envolvente.',         '/productos/audifonos.webp',      NOW(), NOW()),
('Smart TV 50" Google TV 4K',               1399.00, 'Televisor 50 pulgadas 4K UHD con Google TV, apps integradas y control por voz.', '/productos/smart-tv.webp',       NOW(), NOW());
