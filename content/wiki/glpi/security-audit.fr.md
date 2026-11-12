# GLPI - Audit de sécurité

## Présentation

GLPI (Gestionnaire Libre de Parc Informatique) est une solution open source de gestion de parc informatique et de tickets, qui peut être vulnérable à diverses attaques. Composant central de nombreuses infrastructures informatiques, c'est une cible fréquente pour les attaquants, avec de nombreuses CVE publiées régulièrement.

> Ce guide s'appuie sur [l'article d'IT-Connect consacré à l'audit de sécurité de GLPI](https://www.it-connect.fr/audit-securite-glpi-recherche-vulnerabilites/) de Mickael Dorigny.

## Importance en matière de sécurité

GLPI représente un risque de sécurité important pour plusieurs raisons :

- **Stockage de données sensibles** : les tickets des utilisateurs contiennent souvent des informations techniques, des identifiants de connexion et parfois des mots de passe en clair
- **Cartographie de l'infrastructure informatique** : offre aux attaquants un inventaire complet des réseaux, serveurs, postes de travail et logiciels installés
- **Informations d'authentification** : contient des paramètres de configuration sensibles, notamment les identifiants Active Directory et l'authentification des services de messagerie
- **Large surface d'attaque** : utilisé par la plupart des utilisateurs informatiques, ce qui en fait un vecteur idéal pour des attaques à grande échelle

## GLPwnMe : l'outil d'audit GLPI

GLPwnMe est un outil de sécurité écrit en Python, développé et maintenu par les équipes d'Orange Cyberdefense. Il propose diverses options pour auditer et exploiter les vulnérabilités des instances GLPI.

### Installation

Sur un système Linux avec Python et pipx :

```bash
# Installer glpwnme via pipx
pipx install git+https://github.com/Orange-Cyberdefense/glpwnme
```

### Audit de sécurité de base

#### Rechercher les CVE (sans authentification)

```bash
# Lancer une analyse complète sans risque
glpwnme -t http://glpi-address --check-all
```

Cette commande effectue :

- L'identification de la version et du système d'exploitation
- La détection du répertoire d'installation
- La vérification des CVE connues en fonction de la version
- Les contrôles réalisables sans identifiants

#### Vérification des identifiants par défaut

```bash
# Vérifier les identifiants GLPI par défaut
glpwnme -t http://glpi-address --run --exploit DEFAULT_PASSWORD_CHECK
```

Cette commande vérifie si les comptes par défaut (`glpi`, `tech`, `normal`, `post-only`) sont toujours actifs avec leurs mots de passe d'origine.

#### Audit authentifié

```bash
# Réaliser un audit authentifié
glpwnme -t http://glpi-address --check-all -u username -p password
```

Cette approche détecte les vulnérabilités dont l'exploitation nécessite d'être authentifié.

#### Audit complet (potentiellement intrusif)

```bash
# Sans authentification
glpwnme -t http://glpi-address --check-all --no-opsec

# Avec un compte administrateur
glpwnme -t http://glpi-address --check-all -u username -p password --no-opsec
```

L'option `--no-opsec` active des vérifications plus approfondies, mais peut entraîner des modifications de l'instance GLPI (envoi de fichiers, création d'utilisateurs, etc.).

#### Documentation d'un exploit

```bash
# Afficher la documentation d'un exploit
glpwnme -t http://glpi-address -e <EXPLOIT_NAME> --infos
```

### Exemple d'exploitation d'une vulnérabilité

```bash
# Exploiter une vulnérabilité
glpwnme -t http://glpi-address --run -e CVE_XXXX_XXXXX -u username -p password
```

Par exemple, la CVE-2024-27937 permet à n'importe quel utilisateur authentifié de lire n'importe quel champ de la base de données GLPI, y compris les mots de passe et les paramètres sensibles.

## Bonnes pratiques de sécurité

Pour sécuriser efficacement votre instance GLPI :

1. **Mises à jour régulières** : appliquez rapidement les correctifs de sécurité de GLPI, de ses plugins et du système d'exploitation hôte
2. **HTTPS** : utilisez le chiffrement TLS pour toutes les communications
3. **Changer les identifiants par défaut** : modifiez tous les comptes par défaut après le déploiement ou les mises à jour
4. **Pare-feu applicatif web (WAF)** : déployez une protection WAF pour repérer et bloquer les requêtes malveillantes basiques
5. **Journalisation** : configurez l'envoi des journaux vers un SIEM/XDR pour une détection précoce
6. **Audits réguliers** : utilisez GLPwnMe périodiquement pour vérifier l'absence de vulnérabilités
7. **Restrictions d'accès** : limitez les droits d'administration et revoyez régulièrement les permissions
8. **Nettoyage des données** : purgez régulièrement les anciens tickets et leurs pièces jointes
9. **Sensibilisation des utilisateurs** : formez les utilisateurs aux bonnes pratiques de sécurité, notamment la robustesse des mots de passe et la non-divulgation d'informations sensibles dans les tickets

## Ressources

- [Dépôt GitHub de GLPwnMe](https://github.com/Orange-Cyberdefense/glpwnme)
- [Blog de recherche sur les vulnérabilités de GLPI](https://borelenzo.github.io/stuff/2024/02/29/glpi-pwned.html)
- [IT-Connect : guide d'audit de sécurité de GLPI](https://www.it-connect.fr/audit-securite-glpi-recherche-vulnerabilites/)
- [Recommandations de l'ANSSI sur la sécurité des applications web](https://cyber.gouv.fr/publications/securiser-un-site-web)
