<?php
declare(strict_types=1);

$to = 'me@willemmartinot.nl';
$return = $_POST['return'] ?? '/contact/';

if (!preg_match('#^/(en/)?(contact|tarieven|rates)/?$#', $return)) {
    $return = '/contact/';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $return);
    exit;
}

if (!empty($_POST['bot-field'])) {
    header('Location: ' . $return . '?sent=1');
    exit;
}

$voornaam = trim(strip_tags((string) ($_POST['voornaam'] ?? '')));
$achternaam = trim(strip_tags((string) ($_POST['achternaam'] ?? '')));
$email = trim((string) ($_POST['email'] ?? ''));
$telefoon = trim(strip_tags((string) ($_POST['telefoon'] ?? '')));
$dienst = trim(strip_tags((string) ($_POST['dienst'] ?? '')));
$bericht = trim(strip_tags((string) ($_POST['bericht'] ?? '')));

if ($voornaam === '' || $achternaam === '' || $bericht === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . $return . '?error=1');
    exit;
}

$naam = $voornaam . ' ' . $achternaam;
$subject = 'Contactformulier willemmartinot.nl — ' . $dienst;
$body = "Naam: {$naam}\n"
    . "E-mail: {$email}\n"
    . "Telefoon: {$telefoon}\n"
    . "Dienst: {$dienst}\n\n"
    . "Bericht:\n{$bericht}\n";

$headers = implode("\r\n", [
    'From: Willem Martinot <me@willemmartinot.nl>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
]);

$sent = mail($to, $subject, $body, $headers);

header('Location: ' . $return . ($sent ? '?sent=1' : '?error=1'));
exit;
