<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'home', methods: ['GET'])]
    public function index(): Response
    {
        return $this->render('home/index.html.twig');
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
}
