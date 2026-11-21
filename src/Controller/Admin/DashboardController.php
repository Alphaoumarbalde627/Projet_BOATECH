<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

final class DashboardController extends AbstractController
{
    #[Route('/admin/dashboard', name: 'admin_dashboard', methods: ['GET'])]
    public function index(CsrfTokenManagerInterface $csrfTokenManager): Response
    {
        $response = $this->render('home/index.html.twig', [
            'user_identifier' => $this->getUser()?->getUserIdentifier() ?? '',
            'logout_csrf_token' => $csrfTokenManager->getToken('logout')->getValue(),
        ]);
        $response->setPrivate();
        $response->headers->addCacheControlDirective('no-store');

        return $response;
    }
}