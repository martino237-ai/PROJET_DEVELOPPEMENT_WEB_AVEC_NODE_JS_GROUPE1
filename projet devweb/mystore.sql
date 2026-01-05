-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 05 jan. 2026 à 06:51
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mystore`
--

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `statut` enum('en_attente','confirmee','livree','annulee') DEFAULT 'en_attente',
  `date_commande` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `user_id`, `total`, `statut`, `date_commande`) VALUES
(1, 2, 1200.00, '', '2025-12-13 19:38:48'),
(2, 2, 500.00, '', '2025-12-13 19:38:48'),
(3, 2, 500.00, '', '2025-12-13 19:48:26'),
(4, 2, 1200.00, '', '2025-12-13 19:48:26'),
(5, 2, 1200.00, '', '2025-12-13 19:52:53'),
(6, 2, 500.00, '', '2025-12-13 19:52:53'),
(7, 2, 1200.00, '', '2025-12-13 20:08:34'),
(8, 2, 2000.00, '', '2025-12-14 21:10:09'),
(9, 4, 300.00, 'en_attente', '2025-12-22 20:31:36'),
(10, 4, 2000.00, 'en_attente', '2025-12-22 20:31:36'),
(11, 4, 500.00, 'en_attente', '2025-12-24 17:33:29'),
(12, 4, 1200.00, 'en_attente', '2025-12-24 17:33:29'),
(13, 2, 1200.00, 'en_attente', '2025-12-30 21:41:57');

-- --------------------------------------------------------

--
-- Structure de la table `commande_items`
--

CREATE TABLE `commande_items` (
  `id` int(11) NOT NULL,
  `commande_id` int(11) NOT NULL,
  `produit_id` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prix` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `commande_items`
--

INSERT INTO `commande_items` (`id`, `commande_id`, `produit_id`, `quantite`, `prix`) VALUES
(1, 1, 2, 1, 1200.00),
(2, 2, 1, 1, 500.00),
(3, 3, 1, 1, 500.00),
(4, 4, 2, 1, 1200.00),
(5, 5, 2, 1, 1200.00),
(6, 6, 1, 1, 500.00),
(7, 7, 2, 1, 1200.00),
(8, 8, 6, 1, 2000.00),
(9, 9, 5, 1, 300.00),
(10, 10, 6, 1, 2000.00),
(11, 11, 1, 1, 500.00),
(12, 12, 2, 1, 1200.00),
(13, 13, 2, 1, 1200.00);

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

CREATE TABLE `produits` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `prix` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `categorie` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_ajout` timestamp NOT NULL DEFAULT current_timestamp(),
  `commercant_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `description`, `prix`, `stock`, `categorie`, `image`, `date_ajout`, `commercant_id`) VALUES
(1, 'Stylo Bleu', 'Stylo à bille, encre bleue, confortable à utiliser', 500.00, 100, 'Papeterie', 'stylo-bleu.jpeg', '2025-12-13 19:02:04', 1),
(2, 'Cahier A4', 'Cahier 96 pages, couverture rigide, papier de qualité', 1200.00, 50, 'Papeterie', 'cahier-A4.jpeg', '2025-12-13 19:02:04', 1),
(3, 'Gomme Blanche', 'Gomme douce et efficace, ne laisse pas de traces', 250.00, 200, 'Papeterie', 'gomme-blanche.jpeg', '2025-12-13 19:02:04', 1),
(4, 'Règle 30cm', 'Règle en plastique transparent, graduations précises', 400.00, 150, 'Papeterie', 'regle-30cm.jpeg', '2025-12-13 19:02:04', 1),
(5, 'Crayon HB', 'Crayon à papier HB, bois naturel, mine résistante', 300.00, 300, 'Papeterie', 'crayons-HB.jpeg', '2025-12-13 19:02:04', 1),
(6, 'Feutres Couleur', 'Lot de 12 feutres de couleurs vives', 2000.00, 80, 'Papeterie', 'feutres-couleurs.jpeg', '2025-12-13 19:02:04', 1),
(7, 'Ciseaux', 'Ciseaux 17cm, acier inoxydable, confortable', 1500.00, 60, 'Papeterie', 'ciseau.jpeg', '2025-12-13 19:02:04', 1),
(8, 'Colle Stick', 'Colle en bâton, sèche rapidement, non toxique', 800.00, 120, 'Papeterie', 'colle-sbck.jpeg', '2025-12-13 19:02:04', 1),
(9, 'Calculatrice', 'Calculatrice scientifique, affichage LCD', 5000.00, 40, 'Electronique', 'calculatrice.jpeg', '2025-12-13 19:02:04', 1),
(10, 'Trousse', 'Trousse scolaire, tissu résistant, fermeture éclair', 2500.00, 70, 'Accessoires', 'trousse.jpeg', '2025-12-13 19:02:04', 1),
(14, 'Colle Stick', 'Colle en bâton, sèche rapidement, non toxique', 800.00, 120, 'Papeterie', 'colle-sbck.jpeg', '2025-12-13 19:02:04', 1),
(16, 'd', 'Travail • Sucess• Réussite ', 5455.00, 45, 'ALI', 'C:\\Users\\USER\\Pictures\\WhatsApp Image 2025-12-08 at 11.06.52 AM', '2026-01-03 20:15:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telephone` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adresse` text NOT NULL,
  `role` enum('client','commercant') NOT NULL,
  `nomEntreprise` varchar(150) DEFAULT NULL,
  `siret` varchar(100) DEFAULT NULL,
  `descriptionActivite` text DEFAULT NULL,
  `dateCreation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `telephone`, `password`, `adresse`, `role`, `nomEntreprise`, `siret`, `descriptionActivite`, `dateCreation`) VALUES
(1, 'Carlos', 'Medjo', 'carlos@example.com', '699123456', '$2b$10$fnmccRf0IeWjBzSNy5pYVutR1bQh1w.X3RET9Qojh5DVShyluVb1m', 'Douala', 'client', NULL, NULL, NULL, '2025-12-13 18:47:09'),
(2, 'Mvomo Ebolo Martin', NULL, 'martinmvomoebolo45@gmail.com', '79141598', '$2b$10$IueRZQGdNQnIWzveCdk/6eQ6No8/cefGlxk3lGeZEjaL6lyHKZQOm', 'nyom', 'client', NULL, NULL, NULL, '2025-12-13 18:54:56'),
(3, 'Mvomo Ebolo Martin', NULL, 'martinmvomoebolo@gmail.com', 'martinmvomoebolo45@gmail.com', '$2b$10$CEkFvrJ50cxYqqwxvoT3ReNgX/lHSnLcOEFcILDA9/tQlhD2ci0U2', 'nyom', 'commercant', 'Mvomo Ebolo Martin', '1223234344', 'VENTRE', '2025-12-13 20:33:46'),
(4, 'Martin', NULL, 'martin@gmail.com', '934838', '$2b$10$ONPL8RRQ9GwqddOcu5dQieI47SQxNvxmEyJaI51XG94iqRnvBWiWy', 'nyom', 'client', NULL, NULL, NULL, '2025-12-22 20:30:45'),
(5, 'martino', NULL, 'martino@gmail.com', '7493939', '$2b$10$RGipuWXuW5OfP4i39B51C.Ozj3uEuw.s3Bk067v41OAqa.6dtz.Ka', 'nyom', 'commercant', 'martino', '827464546', 'serieux', '2025-12-22 20:34:25'),
(6, 'Mvomo Ebolo Martin', 'MART', 'martinmvomoe@gmail.com', '65667578786', '$2b$10$wnhdqV5v2Uap0Tcvm/Cmm.X5EIkaiEdznPbb.QAMxqLDrA3w3SaW2', 'nyom', 'client', NULL, NULL, NULL, '2026-01-05 05:09:31'),
(7, 'Mvomo ', 'martino', 'martinmvomo@gmail.com', '65576', '$2b$10$bigJInRsJrTm1zq63RZmeOLYTmf9XcvjXP7v9756hR/vlJGynYHKG', 'nyom', 'client', NULL, NULL, NULL, '2026-01-05 05:10:54');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_commandes_user` (`user_id`);

--
-- Index pour la table `commande_items`
--
ALTER TABLE `commande_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_items_commande` (`commande_id`),
  ADD KEY `fk_items_produit` (`produit_id`);

--
-- Index pour la table `produits`
--
ALTER TABLE `produits`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `siret` (`siret`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `commande_items`
--
ALTER TABLE `commande_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `produits`
--
ALTER TABLE `produits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `fk_commandes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commande_items`
--
ALTER TABLE `commande_items`
  ADD CONSTRAINT `fk_items_commande` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_items_produit` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
