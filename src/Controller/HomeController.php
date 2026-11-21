<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'home', methods: ['GET'])]
    public function index(CsrfTokenManagerInterface $csrfTokenManager): Response
    {
        $response = $this->render('home/index.html.twig', [
            'login_csrf_token' => $csrfTokenManager->getToken('authenticate')->getValue(),
        ]);
        $response->setPrivate();
        $response->headers->addCacheControlDirective('no-store');

        return $response;
    }

    #[Route('/api/homepage', name: 'api_homepage', methods: ['GET'])]
    public function homepage(): JsonResponse
    {
        return $this->json([
            'categories' => [
                ['name' => 'Technologie', 'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'],
                ['name' => 'Informatique', 'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80'],
                ['name' => 'Meubles & maison', 'image' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80'],
                ['name' => 'Mobilier bureau', 'image' => 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=500&q=80'],
                ['name' => 'Électroménager', 'image' => 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80'],
                ['name' => 'Mode', 'image' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80'],
                ['name' => 'Chaussures', 'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'],
                ['name' => 'Montres', 'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80'],
            ],
            'products' => [
                ['name' => 'MacBook Pro 14″ M3 Pro', 'category' => 'Informatique', 'price' => 12500000, 'oldPrice' => 14200000, 'badge' => '-12%', 'image' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=85', 'rating' => 5],
                ['name' => 'iPhone 15 Pro Max 256Go', 'category' => 'Téléphonie', 'price' => 9200000, 'badge' => 'Nouveau', 'image' => 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=85', 'rating' => 5],
                ['name' => 'Chaise de bureau ergonomique', 'category' => 'Mobilier de bureau', 'price' => 1850000, 'oldPrice' => 2100000, 'badge' => '-12%', 'image' => 'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=800&q=85', 'rating' => 4],
                ['name' => 'Samsung Galaxy S24 Ultra', 'category' => 'Téléphonie', 'price' => 8400000, 'image' => 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=85', 'rating' => 4],
                ['name' => 'Écran tout-en-un 27 pouces', 'category' => 'Informatique', 'price' => 3200000, 'oldPrice' => 3700000, 'badge' => '-14%', 'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=85', 'rating' => 5],
                ['name' => 'Canapé contemporain', 'category' => 'Meubles & maison', 'price' => 4500000, 'image' => 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=800&q=85', 'rating' => 4],
                ['name' => 'Montre connectée élégante', 'category' => 'Montres', 'price' => 2800000, 'oldPrice' => 3100000, 'badge' => '-10%', 'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85', 'rating' => 5],
                ['name' => 'Écouteurs sans fil', 'category' => 'Accessoires', 'price' => 1980000, 'badge' => 'Populaire', 'image' => 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85', 'rating' => 5],
            ],
            'services' => [
                ['title' => 'Formation digitale', 'description' => 'Programmes certifiants en bureautique, développement web, design et marketing digital.', 'icon' => '📚'],
                ['title' => 'Développement de solutions', 'description' => 'Sites web, applications mobiles et logiciels sur mesure pour vos besoins.', 'icon' => '💻'],
                ['title' => 'Conseil en digitalisation', 'description' => 'Audit, stratégie et accompagnement pour transformer votre entreprise.', 'icon' => '🔎'],
                ['title' => 'Communication digitale', 'description' => 'Gestion des réseaux sociaux, SEO, publicité en ligne et création de contenu.', 'icon' => '📱'],
            ],
            'trainings' => [
                ['title' => 'Développement Web Full Stack', 'level' => 'Intermédiaire', 'duration' => '3 mois', 'price' => 1500000, 'badge' => 'Populaire', 'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=85'],
                ['title' => 'Marketing Digital & Réseaux Sociaux', 'level' => 'Débutant', 'duration' => '6 semaines', 'price' => 750000, 'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85'],
                ['title' => 'Cybersécurité & Protection des données', 'level' => 'Avancé', 'duration' => '2 mois', 'price' => 1200000, 'badge' => 'Nouveau', 'image' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85'],
                ['title' => 'Bureautique & Outils Office 365', 'level' => 'Débutant', 'duration' => '4 semaines', 'price' => 450000, 'image' => 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85'],
            ],
            'commitments' => [
                ['title' => 'Produits de qualité', 'description' => 'Sélection rigoureuse de produits certifiés de marques reconnues.', 'icon' => '🏆'],
                ['title' => 'Solutions sur mesure', 'description' => 'Développement adapté aux réalités du marché guinéen.', 'icon' => '💡'],
                ['title' => 'Accompagnement pro', 'description' => 'Suivi personnalisé à chaque étape de votre projet.', 'icon' => '🤝'],
                ['title' => 'Formation pratique', 'description' => 'Formations 80 % pratiques dispensées par des experts locaux.', 'icon' => '🎓'],
                ['title' => 'Service client', 'description' => 'Équipe réactive disponible pour vous accompagner.', 'icon' => '☎️'],
            ],
            'testimonials' => [
                ['quote' => 'BOA TECH nous a accompagnés dans la digitalisation complète de notre comptabilité. Leur équipe est compétente, disponible et vraiment à l’écoute. Je recommande vivement.', 'author' => 'Aminata C.', 'role' => 'Dirigeante de PME'],
                ['quote' => 'J’ai suivi la formation marketing digital chez BOA TECH. En deux mois, mes ventes en ligne ont considérablement augmenté. Des formateurs passionnés et très professionnels.', 'author' => 'Mamadou B.', 'role' => 'Ancien apprenant'],
                ['quote' => 'Nous avons commandé plusieurs laptops pour équiper nos bureaux. Livraison rapide, produits conformes et excellent service après-vente. Très satisfaits.', 'author' => 'Ibrahima S.', 'role' => 'Responsable informatique'],
            ],
        ]);
    }

    #[Route('/api/admin/dashboard', name: 'api_admin_dashboard', methods: ['GET'])]
    public function adminDashboard(): JsonResponse
    {
        return $this->json([
            'summaryCards' => [
                ['title' => "Chiffre d'affaires", 'value' => '48 750 000 GNF', 'change' => '+12,8%', 'icon' => '↗', 'tone' => 'orange', 'points' => '0,22 14,17 27,19 40,13 54,14 68,6'],
                ['title' => 'Commandes', 'value' => '128', 'change' => '+8,2%', 'icon' => '🛒', 'tone' => 'blue', 'points' => '0,24 14,21 27,14 41,17 55,8 68,5'],
                ['title' => 'Clients', 'value' => '358', 'change' => '+6,4%', 'icon' => '♟', 'tone' => 'orange', 'points' => '0,23 14,19 27,21 41,12 55,15 68,7'],
                ['title' => 'Produits', 'value' => '247', 'icon' => '⬡', 'tone' => 'blue', 'points' => '0,23 14,20 28,16 42,20 55,10 68,6'],
                ['title' => 'Stock faible', 'value' => '8', 'icon' => '!', 'tone' => 'red', 'points' => '0,22 14,19 27,21 41,14 55,17 68,5'],
            ],
            'orders' => [
                ['id' => 'BT-2026-00128', 'customer' => 'Mamadou Camara', 'date' => '30/10/2026 10:45', 'amount' => '750 000 GNF', 'status' => 'Confirmée', 'tone' => 'confirmed'],
                ['id' => 'BT-2026-00127', 'customer' => 'Aissatou Diallo', 'date' => '29/10/2026 16:20', 'amount' => '1 200 000 GNF', 'status' => 'En préparation', 'tone' => 'preparing'],
                ['id' => 'BT-2026-00126', 'customer' => 'Abdoulaye Bah', 'date' => '29/10/2026 12:10', 'amount' => '890 000 GNF', 'status' => 'En livraison', 'tone' => 'shipping'],
                ['id' => 'BT-2026-00125', 'customer' => 'Kadiatou Barry', 'date' => '28/10/2026 11:30', 'amount' => '620 000 GNF', 'status' => 'Livrée', 'tone' => 'delivered'],
            ],
            'bestSellers' => [
                ['icon' => '💻', 'name' => 'Ordinateur Portable HP', 'sales' => '245 ventes', 'tone' => 'laptop'],
                ['icon' => '🎧', 'name' => 'Écouteurs Bluetooth', 'sales' => '198 ventes', 'tone' => 'headphones'],
                ['icon' => '📱', 'name' => 'Smartphone Samsung', 'sales' => '176 ventes', 'tone' => 'phone'],
            ],
            'stockAlerts' => [
                ['icon' => '👟', 'name' => 'Chaussures Nike', 'detail' => 'Stock faible : 5 unités'],
                ['icon' => '⌚', 'name' => 'Montre Connectée', 'detail' => 'Stock faible : 3 unités'],
            ],
            'orderBreakdown' => [
                ['label' => 'En attente', 'count' => 18, 'percentage' => '14,1%', 'tone' => 'waiting'],
                ['label' => 'Confirmées', 'count' => 52, 'percentage' => '40,6%', 'tone' => 'confirmed'],
                ['label' => 'En livraison', 'count' => 34, 'percentage' => '26,6%', 'tone' => 'shipping'],
                ['label' => 'Livrées', 'count' => 24, 'percentage' => '18,8%', 'tone' => 'delivered'],
            ],
        ]);
    }
}
