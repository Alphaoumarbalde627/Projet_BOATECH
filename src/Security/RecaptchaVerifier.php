<?php

namespace App\Security;

use Psr\Log\LoggerInterface;
use Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class RecaptchaVerifier
{
    public function __construct(
        private HttpClientInterface $httpClient,
        private LoggerInterface $logger,
        private string $recaptchaSecretKey,
    ) {
    }

    public function isValid(string $token, string $expectedAction, string $expectedHostname): bool
    {
        if ('' === $token || '' === $this->recaptchaSecretKey) {
            return false;
        }

        try {
            $response = $this->httpClient->request(
                'POST',
                'https://www.google.com/recaptcha/api/siteverify',
                [
                    'body' => [
                        'secret' => $this->recaptchaSecretKey,
                        'response' => $token,
                    ],
                    'timeout' => 5,
                ],
            );

            if (200 !== $response->getStatusCode()) {
                $this->logger->warning('Google reCAPTCHA verification returned a non-success status.', [
                    'status_code' => $response->getStatusCode(),
                ]);

                return false;
            }

            $verification = $response->toArray(false);
        } catch (TransportExceptionInterface|DecodingExceptionInterface $exception) {
            $this->logger->warning('Google reCAPTCHA verification could not be completed.', [
                'exception' => $exception,
            ]);

            return false;
        }

        $action = $verification['action'] ?? null;
        $hostname = $verification['hostname'] ?? null;
        $score = $verification['score'] ?? null;
        $isValid = true === ($verification['success'] ?? false)
            && is_string($action)
            && hash_equals($expectedAction, $action)
            && is_string($hostname)
            && hash_equals(strtolower($expectedHostname), strtolower($hostname))
            && is_numeric($score)
            && (float) $score >= 0.5;

        if (!$isValid) {
            $this->logger->warning('Google reCAPTCHA rejected the login verification.', [
                'error_codes' => $verification['error-codes'] ?? [],
                'action_matches' => is_string($action) && hash_equals($expectedAction, $action),
                'hostname_matches' => is_string($hostname)
                    && hash_equals(strtolower($expectedHostname), strtolower($hostname)),
                'score_acceptable' => is_numeric($score) && (float) $score >= 0.5,
            ]);
        }

        return $isValid;
    }
}
