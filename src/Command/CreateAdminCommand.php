<?php

namespace App\Command;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-admin',
    description: 'Crée un compte administrateur pour BOA TECH.',
)]
final class CreateAdminCommand extends Command
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $passwordHasher,
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        if (!$input->isInteractive()) {
            $io->error('Cette commande doit être exécutée en mode interactif pour protéger le mot de passe.');

            return Command::INVALID;
        }

        $firstName = $io->ask('Prénom', null, static function (?string $value): string {
            $value = trim((string) $value);
            if ('' === $value || mb_strlen($value) > 255) {
                throw new \RuntimeException('Le prénom est obligatoire et ne doit pas dépasser 255 caractères.');
            }

            return $value;
        });

        $lastName = $io->ask('Nom', null, static function (?string $value): string {
            $value = trim((string) $value);
            if ('' === $value || mb_strlen($value) > 255) {
                throw new \RuntimeException('Le nom est obligatoire et ne doit pas dépasser 255 caractères.');
            }

            return $value;
        });

        $email = $io->ask('Adresse e-mail', null, function (?string $value): string {
            $email = mb_strtolower(trim((string) $value));
            if (
                '' === $email
                || mb_strlen($email) > 180
                || false === filter_var($email, FILTER_VALIDATE_EMAIL)
            ) {
                throw new \RuntimeException('Saisissez une adresse e-mail valide de 180 caractères maximum.');
            }

            if (null !== $this->userRepository->findOneBy(['email' => $email])) {
                throw new \RuntimeException('Un compte utilise déjà cette adresse e-mail.');
            }

            return $email;
        });

        $phone = $io->ask('Téléphone', null, static function (?string $value): string {
            $value = trim((string) $value);
            if ('' === $value || mb_strlen($value) > 30) {
                throw new \RuntimeException('Le téléphone est obligatoire et ne doit pas dépasser 30 caractères.');
            }

            return $value;
        });

        $password = $io->askHidden('Mot de passe (12 caractères minimum)', static function (?string $value): string {
            if (null === $value || mb_strlen($value) < 12) {
                throw new \RuntimeException('Le mot de passe doit contenir au moins 12 caractères.');
            }

            return $value;
        });

        $confirmedPassword = $io->askHidden('Confirmer le mot de passe');
        if ($password !== $confirmedPassword) {
            $io->error('Les mots de passe ne correspondent pas. Aucun compte n’a été créé.');

            return Command::INVALID;
        }

        $user = (new User())
            ->setFirstName($firstName)
            ->setLastName($lastName)
            ->setEmail($email)
            ->setPhone($phone)
            ->setRoles(['ROLE_ADMIN'])
            ->setIsVerified(true);

        $user->setPassword($this->passwordHasher->hashPassword($user, $password));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success(sprintf('Le compte administrateur %s a été créé.', $user->getUserIdentifier()));

        return Command::SUCCESS;
    }
}
