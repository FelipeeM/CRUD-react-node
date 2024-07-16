const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = [
        { name: 'Notebook Dell Inspiron', description: 'Notebook Dell Inspiron com 8GB de RAM e 256GB SSD', price: 3500.00 },
        { name: 'Smartphone Samsung Galaxy', description: 'Smartphone Samsung Galaxy S21 com 128GB de armazenamento', price: 4500.00 },
        { name: 'Monitor LG Ultrawide', description: 'Monitor LG Ultrawide de 29 polegadas', price: 1500.00 },
        { name: 'Mouse Logitech MX Master 3', description: 'Mouse sem fio Logitech MX Master 3', price: 400.00 },
        { name: 'Teclado Mecânico Corsair', description: 'Teclado mecânico Corsair K95 RGB', price: 800.00 },
        { name: 'Fone de Ouvido Sony WH-1000XM4', description: 'Fone de ouvido com cancelamento de ruído Sony WH-1000XM4', price: 1500.00 },
        { name: 'Smartwatch Apple Watch Series 6', description: 'Smartwatch Apple Watch Series 6 com GPS', price: 3200.00 },
        { name: 'Tablet Apple iPad', description: 'Tablet Apple iPad de 10.2 polegadas', price: 2800.00 },
        { name: 'Câmera Canon EOS Rebel', description: 'Câmera DSLR Canon EOS Rebel T7', price: 2500.00 },
        { name: 'Impressora HP LaserJet', description: 'Impressora HP LaserJet Pro M404dn', price: 1200.00 },
        { name: 'Roteador TP-Link Archer', description: 'Roteador TP-Link Archer C6', price: 250.00 },
        { name: 'SSD Kingston A400', description: 'SSD Kingston A400 de 240GB', price: 300.00 },
        { name: 'Memória RAM Corsair Vengeance', description: 'Memória RAM Corsair Vengeance LPX 8GB', price: 350.00 },
        { name: 'HD Externo Seagate', description: 'HD Externo Seagate Expansion 1TB', price: 400.00 },
        { name: 'Caixa de Som JBL', description: 'Caixa de som portátil JBL Flip 5', price: 500.00 },
        { name: 'Controle Xbox One', description: 'Controle sem fio Xbox One', price: 300.00 },
        { name: 'Cadeira Gamer DXRacer', description: 'Cadeira Gamer DXRacer Formula Series', price: 1500.00 },
        { name: 'Webcam Logitech C920', description: 'Webcam HD Logitech C920', price: 350.00 },
        { name: 'Microfone Blue Yeti', description: 'Microfone USB Blue Yeti', price: 800.00 },
        { name: 'Placa de Vídeo Nvidia RTX 3060', description: 'Placa de vídeo Nvidia GeForce RTX 3060', price: 4000.00 },
        { name: 'Processador AMD Ryzen 5', description: 'Processador AMD Ryzen 5 3600', price: 1200.00 },
        { name: 'Placa-Mãe ASUS Prime', description: 'Placa-mãe ASUS Prime B450M', price: 600.00 },
        { name: 'Fonte Corsair 650W', description: 'Fonte de alimentação Corsair 650W', price: 500.00 },
        { name: 'Gabinete NZXT H510', description: 'Gabinete Mid Tower NZXT H510', price: 450.00 },
        { name: 'Ventoinha Cooler Master', description: 'Ventoinha Cooler Master Hyper 212', price: 200.00 },
        { name: 'Pasta Térmica Arctic MX-4', description: 'Pasta térmica Arctic MX-4', price: 50.00 },
        { name: 'Monitor AOC 24G2', description: 'Monitor Gamer AOC 24G2 de 24 polegadas', price: 1200.00 },
        { name: 'Headset HyperX Cloud II', description: 'Headset Gamer HyperX Cloud II', price: 600.00 },
        { name: 'Switch Nintendo', description: 'Console Nintendo Switch', price: 3000.00 },
        { name: 'Gamepad PS5 DualSense', description: 'Controle sem fio PlayStation 5 DualSense', price: 400.00 },
    ];
    await prisma.product.createMany({
        data: products
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
